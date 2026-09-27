<?php
require_once __DIR__ . '/../wordpress/plugins/inkora-core/community-policy.php';
function community_expect($condition, string $message): void { if (!$condition) { fwrite(STDERR, "FAIL: $message\n"); exit(1); } }

$published = array('schema_version' => 1, 'status' => 'published', 'visibility' => 'public', 'name' => 'A', 'bio' => 'B', 'styles' => array('linework'), 'tags' => array('fine'), 'moderation_reason' => 'private', 'email' => 'private@example.test');
community_expect(inkora_community_public($published), 'only published public record is public');
foreach (array('draft', 'pending', 'rejected') as $status) { $record = $published; $record['status'] = $status; community_expect(!inkora_community_public($record), "$status is not public"); }
$record = $published; $record['visibility'] = 'private'; community_expect(!inkora_community_public($record), 'private visibility is not public');
$projection = inkora_community_projection($published, 'artist-test');
community_expect(!isset($projection['moderation_reason'], $projection['email']), 'public projection excludes private notes and email');
community_expect(inkora_community_can_edit(11, 11, false), 'owner can edit');
community_expect(inkora_community_can_edit(22, 11, true), 'moderator can edit');
community_expect(!inkora_community_can_edit(22, 11, false), 'other user cannot edit');
community_expect(!inkora_community_can_review(11, 11, true), 'owner cannot self-review');
community_expect(inkora_community_can_review(22, 11, true), 'independent moderator can review');
community_expect(inkora_community_relation_decision('follow', 11, 22, true, true, 0) === 'duplicate', 'follow duplicates are blocked');
community_expect(inkora_community_relation_decision('like', 11, 22, true, false, 20) === 'rate_limited', 'relation rate limit is enforced');
community_expect(inkora_community_relation_decision('follow', 11, 11, true, false, 0) === 'denied', 'self follow is denied');
community_expect(inkora_community_relation_decision('like', 11, 22, true, false, 0) === 'requires_infrastructure', 'closed mutations do not pretend to operate');
community_expect(!inkora_community_validate(array('name' => '', 'bio' => '', 'visibility' => 'public', 'styles' => '', 'tags' => '')), 'blank public name is rejected');
community_expect(inkora_community_validate(array('name' => 'Artist', 'bio' => '', 'visibility' => 'private', 'styles' => '', 'tags' => '')), 'bounded valid request passes');
fwrite(STDOUT, "community policy: 13 assertions passed\n");
