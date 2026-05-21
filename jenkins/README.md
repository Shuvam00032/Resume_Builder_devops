 Fix Jenkins Docker Permission Error

If your pipeline fails with:

```text
permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock
```

Jenkins can see the socket but the `jenkins` user is not allowed to use it.

## Quick fix (recommended for this project)

Use the Jenkins image in this folder. It includes the Docker CLI and runs as **root** so `docker build` and `docker push` work with a mounted socket.

### On Windows (PowerShell) — required for Docker build/push stages

```powershell
cd D:\devops-project\jenkins

docker compose down
docker rm -f jenkins 2>$null

docker compose up -d --build

# MUST pass — otherwise pipeline fails at "Docker Test"
docker exec jenkins docker ps
```

If `docker ps` fails inside Jenkins, the socket is not mounted. Recreate with `docker compose up -d --build` (do not use `docker run` without the socket volume).

### On Linux

```bash
cd jenkins
docker compose down
docker rm -f jenkins 2>/dev/null || true
docker compose up -d --build
docker exec jenkins docker ps
```

Open Jenkins: http://localhost:8080

Get initial admin password:

```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Re-run your pipeline job.

---

## Fix existing Jenkins container (without recreating)

If you want to keep your current Jenkins data volume:

### Option A — Add docker group GID (secure)

On the **host**:

```bash
DOCKER_GID=$(stat -c '%g' /var/run/docker.sock)
echo "Docker socket group ID: $DOCKER_GID"
```

Recreate Jenkins with that group:

```bash
docker stop jenkins
docker rm jenkins

docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --group-add "$DOCKER_GID" \
  jenkins/jenkins:lts-jdk21
```

Install Docker CLI inside the container:

```bash
docker exec -u root jenkins bash -c "apt-get update && apt-get install -y docker.io"
docker exec jenkins docker ps
```

### Option B — Run Jenkins as root (simple, dev only)

```bash
docker stop jenkins
docker rm jenkins

docker run -d --name jenkins \
  -u root \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts-jdk21

docker exec -u root jenkins apt-get update
docker exec -u root jenkins apt-get install -y docker.io
docker exec jenkins docker ps
```

---

## Checklist before re-running pipeline

- [ ] `docker exec jenkins docker ps` works (no permission error)
- [ ] Jenkins credential `dockerhub-creds` exists
- [ ] NodeJS and Maven3 tools configured in Jenkins (if using `tools {}` block)
- [ ] Pipeline job uses `Jenkinsfile` from your repo

---

## Your current build status

| Stage            | Status   |
|------------------|----------|
| Build Frontend   | Success  |
| Build Backend    | Success  |
| Docker Test      | Failed (permissions) |
| Build Docker Images | Skipped |
| Push Docker Images  | Skipped |

After fixing Docker access, all stages should pass.
