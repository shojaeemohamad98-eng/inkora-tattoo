<?php
/**
 * Plugin Name: Inkora Core
 * Description: Inkora platform integration and local phase-one connection test.
 * Version: 0.1.0
 * Requires PHP: 8.2
 * Requires Plugins: woocommerce
 * Text Domain: inkora-core
 */

defined('ABSPATH') || exit;

add_action('rest_api_init', function () {
    register_rest_route('inkora/v1', '/health', array(
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            return rest_ensure_response(array('plugin' => 'inkora-core', 'version' => '0.1.0', 'woocommerce' => class_exists('WooCommerce')));
        },
    ));
});

/** Explicit local-only, repeatable seed; never runs on activation. */
function inkora_seed_test_product() {
    if ('local' !== wp_get_environment_type()) {
        return new WP_Error('not_local', 'Test data is only allowed in a local environment.');
    }
    if (!class_exists('WC_Product_Simple')) {
        return new WP_Error('no_woocommerce', 'Activate WooCommerce first.');
    }
    if ('IRR' !== get_woocommerce_currency()) {
        return new WP_Error('currency', 'Set WooCommerce currency to Iranian rial (IRR) before creating the test product.');
    }
    $existing = wc_get_product_id_by_sku('INKORA-PHASE-01');
    if ($existing) {
        return $existing;
    }
    $product = new WC_Product_Simple();
    $product->set_name('محصول آزمایشی اتصال اینکورا');
    $product->set_slug('inkora-phase-01-test');
    $product->set_sku('INKORA-PHASE-01');
    $product->set_status('publish');
    $product->set_catalog_visibility('visible');
    $product->set_description('فقط برای آزمون اتصال محلی فاز ۱؛ برای فروش واقعی نیست.');
    $product->set_regular_price('1250000');
    $product->set_stock_status('outofstock');
    return $product->save();
}

add_action('admin_menu', function () {
    if ('local' !== wp_get_environment_type()) return;
    add_management_page('Inkora test', 'Inkora test', 'manage_woocommerce', 'inkora-test', function () {
        if (!current_user_can('manage_woocommerce')) return;
        echo '<div class="wrap"><h1>Inkora — local connection test</h1>';
        if (isset($_POST['inkora_seed'])) {
            check_admin_referer('inkora_seed');
            $result = inkora_seed_test_product();
            echo '<p>' . esc_html(is_wp_error($result) ? $result->get_error_message() : 'Test product ID: ' . $result) . '</p>';
        }
        echo '<p>Use IRR currency. Price: 1,250,000 rial = 125,000 toman. Product is out of stock to prevent purchases.</p><form method="post">';
        wp_nonce_field('inkora_seed');
        submit_button('Create / find test product', 'primary', 'inkora_seed');
        echo '</form></div>';
    });
});
