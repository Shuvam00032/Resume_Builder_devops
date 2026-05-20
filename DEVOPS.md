# DevOps Guide (Docker + Jenkins)

This project uses **Docker** for containerization and **Jenkins** for CI/CD. Kubernetes has been removed.

## Run locally with Docker

From the project root:

```bash
docker compose up -d --build
```

| Service   | URL |
|-----------|-----|
| Frontend  | http://localhost:3000 |
| Backend   | http://localhost:8080 |
| Mailpit   | http://localhost:8025 |

Stop:

```bash
docker compose down
```

## Jenkins pipeline

The `Jenkinsfile` runs:

1. Checkout
2. Build frontend
3. Build backend
4. Docker test (`docker ps`)
5. Build Docker images
6. Push to Docker Hub

### Jenkins setup

1. Install plugins: Pipeline, Git, Credentials.
2. Add credentials:
   - **ID:** `dockerhub-creds` (Username with password for Docker Hub)
3. Configure tools (if used): NodeJS, Maven3.
4. Ensure the Jenkins agent is **Linux** (or use `sh` steps). The pipeline uses `sh`, not Windows `bat`.
5. **Fix Docker permission** (required for build/push stages):
   - Error: `permission denied ... docker.sock`
   - Full steps: see [`jenkins/README.md`](jenkins/README.md)
   - Quick start:
     ```bash
     cd jenkins
     docker compose up -d --build
     docker exec jenkins docker ps
     ```
6. Create a **Pipeline** job pointing to the repo and `Jenkinsfile`.

### Image names (already in Jenkinsfile)

- `shuvam0032/resume-builder-frontend`
- `shuvam0032/resume-builder-backend`

Tags: `BUILD_NUMBER` and `latest`.

## Report files

- `PROJECT_REPORT_CONTENT.md` — full report sections (Docker + Jenkins only)
- `REPORT_TOC_AND_FIGURES.md` — table of contents and figure list
