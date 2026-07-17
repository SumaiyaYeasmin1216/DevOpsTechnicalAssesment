# Contributing

This assessment uses a branch-per-feature workflow so every change remains reviewable and traceable.

## Branch workflow

1. Update local `main` from `origin/main`.
2. Create a narrowly scoped branch from `main`.
3. Implement and validate one feature or phase.
4. Commit with a clear conventional commit message.
5. Push the branch and open a pull request into `main`.
6. Merge only after the required CI checks pass.

Use these branch prefixes:

- `feature/` for new functionality
- `fix/` for defect corrections
- `docs/` for documentation-only work
- `chore/` for maintenance

## Commit messages

Use an imperative conventional commit subject, for example:

```text
feat(site-one): add responsive company landing page
```

Common types are `feat`, `fix`, `docs`, `ci`, `chore`, `refactor`, and `test`.

## Local checks

Install the pinned quality tools and run the same checks used by CI:

```bash
npm ci
npm run check
```

Later phases add Docker, Compose, Nginx, and deployment-specific validation to this baseline.

## Security

Never commit `.env` files, deployment credentials, private keys, passwords, tokens, or server-specific secret values. GitHub Actions secrets must hold deployment credentials.
