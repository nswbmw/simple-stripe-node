## v1.2.0 / 2026-11-12

- feat: `execute` supports `FormData` bodies (multipart/form-data file upload, e.g. `POST https://files.stripe.com/v1/files`)
- feat: `_getURL` passes absolute URLs through (files.stripe.com uses a different domain than api.stripe.com)
- refactor: multipart serialization is handled by lite-request 1.2.0 (spec-compliant escaping; Blob parts without a filename send `filename="blob"`, consistent with the worker build)

## v1.1.3 / 2026-07-17

- fix: proxy validation

## v1.1.2 / 2026-06-14

- chore(deps): update deps
- fix: use qs-esm instead of URLSearchParams

## v1.1.1 / 2026-05-24

- fix: worker.js expose error json

## v1.1.0 / 2025-12-01

- feat: export worker.js

## v1.0.0 / 2025-11-24

- init
