<?php
defined('ABSPATH') || exit;
require_once __DIR__ . '/community-policy.php';
const INKORA_COMMUNITY_SCHEMA = 1;

function inkora_community_migrate(): void {
    // Additive migration: no existing users, roles, commerce records or content modified.
    foreach (array('inkora_artist' => 'Inkora artist (pending)', 'inkora_approved_artist' => 'Inkora approved artist', 'inkora_moderator' => 'Inkora moderator') as $role => $label) {
        add_role($role, $label, array('read' => true));
    }
    $moderator = get_role('inkora_moderator');
    if ($moderator) $moderator->add_cap('inkora_moderate');
    update_option('inkora_community_schema', INKORA_COMMUNITY_SCHEMA, false);
}
function inkora_community_ready(): bool {
    return (int) get_option('inkora_community_schema', 0) === INKORA_COMMUNITY_SCHEMA;
}
function inkora_community_moderator(): bool {
    return current_user_can('manage_options') || current_user_can('inkora_moderate');
}
add_action('init', function () {
    inkora_community_migrate();
    foreach (array('inkora_artist', 'inkora_portfolio', 'inkora_post') as $type) {
        register_post_type($type, array('public' => false, 'publicly_queryable' => false,
            'exclude_from_search' => true, 'show_ui' => false, 'show_in_rest' => false,
            'rewrite' => false, 'query_var' => false, 'supports' => array(),
            'can_export' => false, 'delete_with_user' => true));
    }
});
function inkora_community_record(int $id): array {
    $value = get_post_meta($id, '_inkora_community', true);
    return is_array($value) ? $value : array();
}
function inkora_community_profile(int $owner) {
    $posts = get_posts(array('post_type' => 'inkora_artist', 'post_status' => 'private',
        'author' => $owner, 'posts_per_page' => 1));
    return $posts[0] ?? null;
}
function inkora_community_is_public($post): bool {
    return $post && $post->post_status === 'private' && get_userdata((int) $post->post_author)
        && inkora_community_public(inkora_community_record($post->ID));
}
function inkora_community_response($request) {
    if (!inkora_community_ready()) return new WP_Error('community_unavailable', 'Community unavailable', array('status' => 503));
    $type = $request->get_param('kind') === 'portfolio' ? 'inkora_portfolio' : 'inkora_artist';
    $args = array('post_type' => $type, 'post_status' => 'private', 'posts_per_page' => 12,
        'paged' => max(1, (int) $request->get_param('page')), 'orderby' => 'ID', 'order' => 'DESC',
        'meta_query' => array(array('key' => '_inkora_community_public', 'value' => '1')));
    if ($request->get_param('slug')) $args['name'] = $request->get_param('slug');
    $items = array();
    foreach (get_posts($args) as $post) {
        if (!inkora_community_is_public($post)) continue;
        if ($type === 'inkora_portfolio' && !inkora_community_is_public(inkora_community_profile((int) $post->post_author))) continue;
        $items[] = inkora_community_projection(inkora_community_record($post->ID), $post->post_name);
    }
    $response = rest_ensure_response(array('schema_version' => 1, 'items' => $items, 'features' => inkora_community_features()));
    $response->header('Cache-Control', 'no-store');
    return $response;
}
add_action('rest_api_init', function () {
    register_rest_route('inkora/v1', '/community/(?P<kind>artists|portfolio)', array(
        'methods' => 'GET', 'permission_callback' => '__return_true', 'callback' => 'inkora_community_response',
        'args' => array('page' => array('default' => 1, 'validate_callback' => function ($v) { return filter_var($v, FILTER_VALIDATE_INT) !== false && $v >= 1 && $v <= 100; }),
            'slug' => array('validate_callback' => function ($v) { return is_string($v) && preg_match('/^[a-z0-9-]{1,100}$/D', $v); }))));
});
function inkora_community_origin(string $url): string {
    $parts = wp_parse_url($url);
    if (!$parts || empty($parts['scheme']) || empty($parts['host'])) return '';
    return strtolower($parts['scheme'] . '://' . $parts['host']) . ':' . ($parts['port'] ?? ($parts['scheme'] === 'https' ? 443 : 80));
}
function inkora_community_guard(): void {
    if (!inkora_community_ready() || wp_get_environment_type() !== 'local') wp_die('Local community is unavailable.', '', array('response' => 503));
    if (!is_user_logged_in() || !current_user_can('read')) wp_die('Authentication required.', '', array('response' => 403));
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') wp_die('POST required.', '', array('response' => 405));
    $origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
    if (inkora_community_origin($origin) !== inkora_community_origin(admin_url())) wp_die('Same-origin required.', '', array('response' => 403));
    check_admin_referer('inkora_community_save');
}
/** Short-lived per-owner DB lock also protects duplicate creation from concurrent requests. */
function inkora_community_lock(int $owner): bool {
    return add_option('inkora_community_lock_' . $owner, time(), '', false);
}
function inkora_community_save(): void {
    inkora_community_guard();
    $actor = get_current_user_id();
    $operation = isset($_POST['operation']) && is_string($_POST['operation']) ? sanitize_key($_POST['operation']) : '';
    $id = isset($_POST['record_id']) && is_scalar($_POST['record_id']) ? absint($_POST['record_id']) : 0;
    $post = $id ? get_post($id) : inkora_community_profile($actor);
    if ($id && (!$post || $post->post_type !== 'inkora_artist')) wp_die('Unknown record.', '', array('response' => 404));
    $owner = $post ? (int) $post->post_author : $actor;
    if (!inkora_community_can_edit($actor, $owner, inkora_community_moderator())) wp_die('Forbidden.', '', array('response' => 403));
    if (!inkora_community_lock($owner)) wp_die('Another request is in progress. Ask the local administrator if this persists.', '', array('response' => 409));
    try {
        if ($operation === 'delete') {
            if ($post) {
                // Recoverable in WordPress Trash; public meta is disabled before it can be restored.
                update_post_meta($post->ID, '_inkora_community_public', '0');
                wp_trash_post($post->ID);
                $user = get_user_by('id', $owner);
                if ($user) { $user->remove_role('inkora_artist'); $user->remove_role('inkora_approved_artist'); }
            }
        } elseif ($operation === 'review') {
            if (!$post || !inkora_community_can_review($actor, $owner, inkora_community_moderator())) throw new RuntimeException('Independent moderator required.');
            $record = inkora_community_record($post->ID);
            $status = $_POST['decision'] ?? '';
            $reason = $_POST['reason'] ?? '';
            $expected = $_POST['revision'] ?? '';
            if (!is_string($expected) || !hash_equals((string) ($record['revision'] ?? ''), $expected)) throw new RuntimeException('Record changed; reload before reviewing.');
            if (!in_array($status, array('published', 'rejected', 'pending'), true) || !is_string($reason) || strlen($reason) > 2400) throw new RuntimeException('Invalid review.');
            if ($status === 'rejected' && trim($reason) === '') throw new RuntimeException('Rejection reason required.');
            $record['status'] = $status;
            $record['moderation_reason'] = sanitize_textarea_field(wp_unslash($reason));
            $record['reviewed_by'] = $actor;
            $record['reviewed_at'] = gmdate(DATE_ATOM);
            inkora_community_store($post->ID, $record);
            $user = get_user_by('id', $owner);
            if ($user) {
                $user->add_role('inkora_artist');
                if ($status === 'published') $user->add_role('inkora_approved_artist');
                else $user->remove_role('inkora_approved_artist');
            }
        } elseif ($operation === 'apply') {
            if ($owner !== $actor || !inkora_community_validate($_POST)) throw new RuntimeException('Invalid application.');
            // A bounded local flow: one profile per existing account, no registration/email/role changes.
            $last = (int) get_user_meta($actor, '_inkora_community_last_submit', true);
            if (time() - $last < 60) throw new RuntimeException('Wait one minute before resubmitting.');
            $record = array('schema_version' => 1, 'name' => sanitize_text_field(wp_unslash($_POST['name'])),
                'bio' => sanitize_textarea_field(wp_unslash($_POST['bio'])), 'visibility' => $_POST['visibility'],
                'styles' => inkora_community_labels($_POST['styles']), 'tags' => inkora_community_labels($_POST['tags']),
                'status' => 'pending', 'created_at' => $post ? (inkora_community_record($post->ID)['created_at'] ?? gmdate(DATE_ATOM)) : gmdate(DATE_ATOM));
            if (!$record['name']) throw new RuntimeException('Public name required.');
            if (!$post) {
                $id = wp_insert_post(array('post_type' => 'inkora_artist', 'post_status' => 'private', 'post_author' => $actor,
                    'post_title' => 'Artist request', 'post_name' => 'artist-' . wp_generate_uuid4()), true);
                if (is_wp_error($id)) throw new RuntimeException('Unable to save.');
            } else $id = $post->ID;
            inkora_community_store($id, $record);
            $user = get_user_by('id', $actor);
            if ($user) { $user->add_role('inkora_artist'); $user->remove_role('inkora_approved_artist'); }
            update_user_meta($actor, '_inkora_community_last_submit', time());
        } else throw new RuntimeException('Unsupported operation.');
    } catch (RuntimeException $error) {
        delete_option('inkora_community_lock_' . $owner);
        wp_die(esc_html($error->getMessage()), '', array('response' => 400));
    } finally {
        delete_option('inkora_community_lock_' . $owner);
    }
    wp_safe_redirect(admin_url('admin-post.php?action=inkora_community_portal&saved=1'));
    exit;
}
function inkora_community_labels(string $text): array {
    return array_slice(array_values(array_unique(array_filter(array_map('sanitize_text_field', explode(',', wp_unslash($text)))))), 0, 8);
}
function inkora_community_store(int $id, array $record): void {
    $record['updated_at'] = gmdate(DATE_ATOM);
    $record['revision'] = wp_generate_uuid4();
    // Hide before replacing metadata. The read path independently rechecks full policy.
    update_post_meta($id, '_inkora_community_public', '0');
    update_post_meta($id, '_inkora_community', $record);
    update_post_meta($id, '_inkora_community_public', inkora_community_public($record) ? '1' : '0');
}
add_action('admin_post_inkora_community_save', 'inkora_community_save');
add_action('admin_post_nopriv_inkora_community_save', function () { wp_die('Authentication required.', '', array('response' => 403)); });

function inkora_community_form_start(): void {
    echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '"><input type="hidden" name="action" value="inkora_community_save">';
    wp_nonce_field('inkora_community_save');
}
function inkora_community_portal(): void {
    if (!is_user_logged_in()) { auth_redirect(); exit; }
    if (!current_user_can('read') || !inkora_community_ready() || wp_get_environment_type() !== 'local') wp_die('Local access only.', '', array('response' => 403));
    nocache_headers();
    header('X-Robots-Tag: noindex, nofollow');
    header('X-Frame-Options: SAMEORIGIN');
    header('Referrer-Policy: same-origin');
    echo '<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>درخواست هنرمند | اینکورا</title><style>body{font:16px/1.9 Tahoma,sans-serif;background:#0b0c0f;color:#f5f3f0;margin:0}main{max-width:760px;margin:auto;padding:24px;overflow-wrap:anywhere}form,article{border:1px solid #85838d;padding:16px;margin:20px 0;border-radius:12px}label{display:block;margin-top:12px}input:not([type=hidden]),textarea,select{box-sizing:border-box;width:100%;padding:12px;font:inherit}button,a{min-height:44px;font:inherit}button{margin-top:16px;padding:10px 20px}a{color:#ff7e8c}:focus-visible{outline:3px solid #f0c89b;outline-offset:3px}</style></head><body><main><h1>درخواست پروفایل هنرمند</h1><p>نسخهٔ محلی؛ فقط حساب موجود. ارسال درخواست به معنی تأیید هویت یا اعطای دسترسی نیست. هیچ فایل، شماره تماس یا نشانی وارد نکنید.</p>';
    if (isset($_GET['saved'])) echo '<p role="status">عملیات ذخیره شد. تغییر پروفایل دوباره نیازمند بازبینی است.</p>';
    $post = inkora_community_profile(get_current_user_id());
    $record = $post ? inkora_community_record($post->ID) : array();
    $labels = array('pending' => 'در انتظار بازبینی', 'published' => 'تأییدشده', 'rejected' => 'نیازمند اصلاح', 'draft' => 'پیش‌نویس');
    echo '<p>وضعیت خصوصی شما: ' . esc_html($labels[$record['status'] ?? ''] ?? 'هنوز درخواستی ثبت نشده') . '</p><p>نمایش: ' . (($record['visibility'] ?? '') === 'public' ? 'عمومی، فقط پس از تأیید' : 'خصوصی') . '</p>';
    // Moderator notes are deliberately not even rendered to the owner.
    inkora_community_form_start();
    echo '<input type="hidden" name="operation" value="apply">';
    foreach (array('name' => 'نام هنری عمومی', 'bio' => 'معرفی کوتاه عمومی', 'styles' => 'سبک‌ها (با ویرگول انگلیسی جدا کنید)', 'tags' => 'برچسب‌ها (با ویرگول انگلیسی جدا کنید)') as $key => $label) {
        $value = $record[$key] ?? ''; if (is_array($value)) $value = implode(', ', $value);
        echo '<label for="' . esc_attr($key) . '">' . esc_html($label) . '</label><textarea id="' . esc_attr($key) . '" name="' . esc_attr($key) . '" maxlength="' . ($key === 'bio' ? '600' : '60') . '" ' . ($key === 'name' ? 'required' : '') . '>' . esc_textarea($value) . '</textarea>';
    }
    echo '<label for="visibility">اجازهٔ نمایش پس از بازبینی</label><select id="visibility" name="visibility"><option value="private">خصوصی</option><option value="public" ' . selected($record['visibility'] ?? '', 'public', false) . '>عمومی پس از تأیید</option></select><button type="submit">ارسال برای بازبینی</button></form><h2>درخواست نمونه‌کار</h2><p>آپلود و ارسال اثر فعلاً بسته است؛ حذف EXIF، حق اثر و رضایت افراد باید ابتدا آزموده شود. هیچ تصویر جایگزینی به نام شما نمایش نمی‌دهیم.</p>';
    if ($post) {
        inkora_community_form_start();
        echo '<input type="hidden" name="operation" value="delete"><button type="submit">انتقال پروفایل و درخواست من به زباله‌دان</button></form>';
    }
    if (inkora_community_moderator()) {
        echo '<h2>صف بازبینی خصوصی</h2><p>پیش از تأیید، نام، معرفی، برچسب‌ها، حق استفاده و نبود اطلاعات حساس را بررسی کنید. بازبینی پروفایل خود مجاز نیست. یادداشت فقط برای بازبین‌هاست.</p>';
        $page = isset($_GET['review_page']) && is_scalar($_GET['review_page']) ? max(1, absint($_GET['review_page'])) : 1;
        $queue = get_posts(array('post_type' => 'inkora_artist', 'post_status' => 'private', 'posts_per_page' => 20, 'paged' => $page, 'orderby' => 'ID', 'order' => 'DESC'));
        if (!$queue) echo '<p>درخواستی برای نمایش وجود ندارد.</p>';
        foreach ($queue as $item) {
            $data = inkora_community_record($item->ID);
            echo '<article><h3>' . esc_html($data['name'] ?? '') . '</h3><p>' . esc_html($data['bio'] ?? '') . '</p><p>' . esc_html(implode(', ', array_merge($data['styles'] ?? array(), $data['tags'] ?? array()))) . '</p><p>' . esc_html(($data['status'] ?? '') . ' / ' . ($data['visibility'] ?? '')) . '</p>';
            inkora_community_form_start();
            echo '<input type="hidden" name="operation" value="review"><input type="hidden" name="record_id" value="' . (int) $item->ID . '"><input type="hidden" name="revision" value="' . esc_attr($data['revision'] ?? '') . '"><label>تصمیم<select name="decision"><option value="pending">در انتظار</option><option value="published">تأیید محتوای بازبینی‌شده</option><option value="rejected">رد</option></select></label><label>یادداشت خصوصی<textarea name="reason" maxlength="600">' . esc_textarea($data['moderation_reason'] ?? '') . '</textarea></label><button type="submit">ثبت تصمیم</button></form>';
            inkora_community_form_start();
            echo '<input type="hidden" name="operation" value="delete"><input type="hidden" name="record_id" value="' . (int) $item->ID . '"><button type="submit">انتقال این درخواست به زباله‌دان</button></form></article>';
        }
        if ($page > 1) echo '<a href="' . esc_url(add_query_arg(array('action' => 'inkora_community_portal', 'review_page' => $page - 1), admin_url('admin-post.php'))) . '">صفحهٔ قبل</a> ';
        if (count($queue) === 20) echo '<a href="' . esc_url(add_query_arg(array('action' => 'inkora_community_portal', 'review_page' => $page + 1), admin_url('admin-post.php'))) . '">صفحهٔ بعد</a>';
    }
    echo '</main></body></html>'; exit;
}
add_action('admin_post_inkora_community_portal', 'inkora_community_portal');
add_action('admin_post_nopriv_inkora_community_portal', 'inkora_community_portal');
