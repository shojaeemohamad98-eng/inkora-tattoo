<?php
/** Pure, testable community policy; no WordPress or transport dependencies. */
function inkora_community_public(array $record): bool {
    return ($record['schema_version'] ?? null) === 1
        && ($record['status'] ?? '') === 'published'
        && ($record['visibility'] ?? '') === 'public';
}
function inkora_community_can_edit(int $actor, int $owner, bool $moderator): bool {
    return $actor > 0 && ($actor === $owner || $moderator);
}
function inkora_community_can_review(int $actor, int $owner, bool $moderator): bool {
    return $actor > 0 && $actor !== $owner && $moderator;
}
function inkora_community_validate(array $raw): bool {
    foreach (array('name', 'bio', 'visibility', 'styles', 'tags') as $key) {
        if (!isset($raw[$key]) || !is_string($raw[$key])) return false;
    }
    return trim($raw['name']) !== '' && strlen($raw['name']) <= 240
        && strlen($raw['bio']) <= 2400 && strlen($raw['styles']) <= 240
        && strlen($raw['tags']) <= 240
        && in_array($raw['visibility'], array('private', 'public'), true);
}
function inkora_community_projection(array $record, string $slug): array {
    // Explicit allowlist: never merge metadata/user records into public output.
    return array('slug' => $slug, 'name' => $record['name'], 'bio' => $record['bio'],
        'styles' => $record['styles'], 'tags' => $record['tags'], 'approved' => true);
}
function inkora_community_features(): array {
    return array_fill_keys(array('upload', 'follow', 'like', 'comment', 'messages', 'groups',
        'marketplace', 'courses', 'notifications', 'live_feed'), false);
}
/** Contract for a future atomic relation store. Transport remains unconditionally closed. */
function inkora_community_relation_decision(string $kind, int $actor, int $owner, bool $visible, bool $exists, int $recent): string {
    if (!in_array($kind, array('follow', 'like'), true) || $actor < 1 || $owner < 1 || !$visible) return 'denied';
    if ($kind === 'follow' && $actor === $owner) return 'denied';
    if ($exists) return 'duplicate';
    if ($recent >= 20) return 'rate_limited';
    return 'requires_infrastructure';
}
