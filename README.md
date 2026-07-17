# DevOps Technical Assessment

Two independently accessible static websites deployed to one Linux server with Docker Compose, an Nginx reverse proxy, and automated GitHub Actions delivery.

## Status

The repository is being delivered incrementally with one branch and pull request per functional phase. This bootstrap establishes repository conventions and continuous integration; website and deployment components follow in dedicated branches.

## Engineering goals

- Run each static website in its own container.
- Manage the complete application with Docker Compose.
- Route requests to both sites through an Nginx reverse proxy.
- Validate every branch and pull request with CI.
- Deploy every accepted update to `main` automatically.
- Keep credentials outside Git and document a reproducible deployment process.

## Planned structure

```text
.
|-- .github/
|   `-- workflows/
|-- deployment/
|-- nginx/
|-- site1/
|-- site2/
|-- docker-compose.yml
`-- README.md
```

The complete server, Docker, Compose, Nginx, CI/CD, local-running, assumptions, and deployment documentation will be added as the corresponding phases are implemented and verified.

## Development workflow

Changes are created on scoped feature branches and merged through pull requests only after CI succeeds. See [CONTRIBUTING.md](CONTRIBUTING.md) for branch, commit, validation, and security conventions.

## Current checks

```bash
npm ci
npm run check
```
