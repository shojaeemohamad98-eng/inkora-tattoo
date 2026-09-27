# Vercel Preview

## Scope

Only the storefront is intended for Vercel. WordPress remains local. No production deployment, custom domain, DNS change, payment, or WordPress migration is authorized in this handoff.

## Build settings

- Repository: https://github.com/shojaeemohamad98-eng/inkora-tattoo
- Preview branch: `codex/vercel-preview`; production branch must remain `main`.
- Root Directory: `apps/storefront`.
- Include source files outside the Root Directory: enabled (workspace lockfile).
- Framework: SvelteKit; Node.js: `24.x` in dashboard and both package manifests.
- Install: `npm exec --yes --package=pnpm@11.19.0 -- pnpm install --frozen-lockfile`.
- Build: `npm exec --yes --package=pnpm@11.19.0 -- pnpm run build`.
- Output Directory: framework default; do not override with `build`.
- Official adapter: `@sveltejs/adapter-vercel@6.3.4`; existing framework versions retained.
- pnpm 11 settings use `allowBuilds` and `storeDir` in `pnpm-workspace.yaml`, not legacy `.npmrc`/`onlyBuiltDependencies`.

Do not press a dashboard import/deploy button if it creates a Production deployment. Create/configure the project without a production build, then deploy the preview branch with target Preview; otherwise stop for a suitable Preview-only workflow. CLI is usable only after user login and when available. Never run `vercel --prod`.

## Environment policy

No user-defined environment variables or secrets are needed for this Preview. Leave `WORDPRESS_URL`, `INKORA_BACKEND_ENABLED`, WooCommerce credentials and all payment/AI keys unset in Vercel. `VERCEL_ENV` is supplied by Vercel; `preview` always disables backend access, even if accidental backend settings exist.

Built deployments default to backend disabled. Local `vite dev` continues using private `WORDPRESS_URL` from the ignored local `.env`. No `.env` content is copied into Vercel or Git. There is no public environment prefix for credentials.

For a later, separately authorized production launch only: `WORDPRESS_URL` must be a reachable HTTPS WordPress hostname, and `INKORA_BACKEND_ENABLED=true` must be scoped to Production only. These values are not being set now. Any future secrets belong in the dashboard and server-only code. Local/test URLs, IP literals and credential-bearing URLs are rejected by the production helper.

## Public behavior and route policy

- Global notice explicitly identifies a disconnected preview; no invented catalog or artists.
- Home, category experiences, simulator, advisor, compare, journal and community overview render existing UI with honest unavailable/empty states.
- `/account` has no local URL or login link when disconnected.
- `/cart` and `/checkout` display unavailable states. `/api/cart` GET and POST return 503, no cart cookie, no backend request.
- `/design-system`, `/integration-check`, `/community/apply`, `/admin`, `/wp-admin` and their nested/data requests return 404 outside `vite dev`.
- Internal logo reference is no longer imported into browser bundles. The source reference remains in docs only.
- Community moderation/portal links are only emitted in local development; no public mutation endpoint is added.
- Disconnected HTML has `X-Robots-Tag: noindex, nofollow`. This is indexing policy, not access protection; private routes use server rejection.

## Verification

Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`, `pnpm build`. Start `pnpm --filter @inkora/storefront preview --port 4187` and run `node scripts/verify-preview.mjs`. The same script accepts a deployed URL after login/deployment. It verifies page responses, no local links/internal reference, robots policy, blocked routes/data requests and disabled cart operations.

Production requires a public secured WordPress/WooCommerce host, real approved products/media, reviewed account/community policy, a compatible gateway with sandbox end-to-end success/failure/callback and IRR-to-toman verification, followed by explicit production approval. Preview is not evidence that commerce works.

Sources: [SvelteKit Vercel adapter](https://svelte.dev/docs/kit/adapter-vercel), [Vercel package managers](https://vercel.com/docs/package-managers), [pnpm 11 release](https://github.com/pnpm/pnpm.io/blob/main/blog/releases/11.0.md).
