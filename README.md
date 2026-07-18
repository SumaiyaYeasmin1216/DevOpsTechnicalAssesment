# DevOps Technical Assessment

Two independently accessible static websites deployed to one Linux server with Docker Compose, an Nginx reverse proxy, and automated GitHub Actions delivery.

## Status

The repository is being delivered incrementally with one branch and pull request per functional phase. The engineering baseline and both static websites are implemented; containerization and deployment components follow in dedicated branches.

## Implemented components

- `site1/` — responsive, accessible LumaStack company landing page built with semantic HTML, CSS, and vanilla JavaScript
- `site2/` — responsive portfolio/about experience with an accessible saved theme preference
- Automated HTML, CSS, JavaScript, Markdown, and formatting checks
- Per-site non-root Nginx images behind a dedicated reverse-proxy container

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

## Docker setup

Each website has its own pinned Nginx Alpine image, isolated build context, health check, read-only filesystem, and unprivileged runtime user. Docker Compose manages both services on a shared private network.

Build and start both websites:

```bash
docker compose up --build -d
```

The reverse proxy is the only published service. Local endpoints are:

- Site One: `http://127.0.0.1:8080/site1/`
- Site Two: `http://127.0.0.1:8080/site2/`

Copy `.env.example` to `.env` only when a different public host port is required. The site containers use Compose networking and are not bound directly to host ports.

Inspect health and stop the stack:

```bash
docker compose ps
docker compose down
```
## CI/CD

### Completed

- Git version control
- GitHub repository
- GitHub Actions Continuous Integration (CI)
- Automated quality checks
- Docker image build
- Container integration testing
- Local deployment verification

### Deployment Status

Linux deployment was partially completed as part of this assessment. A Linux environment was prepared and tested using Ubuntu Server on VMware to practice the deployment workflow and verify the project in a Linux-based environment.

I also attempted to provision a public cloud Linux virtual machine for the final deployment. However, due to cloud subscription restrictions encountered during VM provisioning, the deployment could not be completed and the GitHub Actions Continuous Deployment (CD) pipeline could not be fully integrated with a public Linux server.

The project is fully prepared for deployment, and the remaining configuration can be completed once a suitable Linux server and the required GitHub deployment credentials are available.

## Future Improvements

- Configure GitHub Actions Continuous Deployment (CD)
- Deploy on a public Linux server
- Enable HTTPS using SSL certificates
- Automate production deployment

---

## Author

**Sumaiya Yeasmin**
