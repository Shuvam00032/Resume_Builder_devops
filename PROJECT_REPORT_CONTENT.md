# Resume Builder with Docker and Jenkins - Report Content

Use this content directly in your project report.

## 1. Introduction

The Resume Builder is a web-based platform that helps users create, edit, and export professional resumes. The system uses a React frontend and a Spring Boot backend with MongoDB for data storage.

The DevOps goal of this project is to containerize the application with Docker and automate build and release using Jenkins. Docker provides consistent runtime environments, and Jenkins automates compilation, image creation, and publishing to a container registry.

## 2. Objectives

- Build a responsive web application for resume creation and management.
- Containerize frontend and backend services using Docker.
- Run the full stack locally with Docker Compose.
- Automate build, Docker image creation, and registry push with Jenkins.
- Reduce manual deployment effort and improve release repeatability.

## 3. Existing vs Proposed System

### Existing System

- Application runs manually on local machines (Node + Java + MongoDB).
- Environment setup varies between developers.
- Deployment and updates are manual.

### Proposed System (Docker + Jenkins)

- Frontend, backend, MongoDB, and Mailpit run as Docker containers.
- Docker Compose starts all services with one command.
- Jenkins pipeline builds code, creates Docker images, and pushes them to Docker Hub.
- Same images can be pulled and run on any machine with Docker installed.

## 4. System Architecture

The architecture follows a three-tier model:

1. **Presentation Layer (Frontend)**  
   React + Vite application served by an Nginx container.

2. **Application Layer (Backend)**  
   Spring Boot REST API for authentication, resume management, and integrations.

3. **Data Layer (Database)**  
   MongoDB container with a Docker volume for persistent storage.

DevOps components:

- **Docker**: Multi-stage images for frontend and backend.
- **Docker Compose**: Orchestrates all services on a single host.
- **Jenkins**: CI/CD pipeline for automated build and image publishing.

## 5. Implementation Details

### 5.1 Dockerization

- Frontend Dockerfile: Node build stage + Nginx runtime stage.
- Backend Dockerfile: Spring Boot JAR on Java 21 JRE.
- `docker-compose.yml` defines frontend, backend, mongo, and mailpit services with ports and environment variables.

### 5.2 Jenkins Pipeline

The `Jenkinsfile` implements these stages:

1. Checkout source code from Git.
2. Build frontend (`npm install`, `npm run build`).
3. Build backend (`mvnw clean package`).
4. Verify Docker connectivity.
5. Build Docker images for frontend and backend.
6. Push versioned and `latest` tags to Docker Hub.

### 5.3 Running the Application

**Local (Docker Compose):**

```bash
docker compose up -d --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Mailpit UI: http://localhost:8025

**After Jenkins build:**

Images are available on Docker Hub (`shuvam0032/resume-builder-frontend` and `shuvam0032/resume-builder-backend`) with build-number tags and `latest`.

## 6. CI/CD Workflow

1. Developer pushes code to the Git repository.
2. Jenkins job runs the pipeline.
3. Frontend and backend are compiled.
4. Docker images are built and tagged with the build number.
5. Images are pushed to Docker Hub.
6. Operators or servers pull images and run with Docker Compose or `docker run`.

## 7. Testing Strategy

- Build verification in Jenkins (frontend and backend compile successfully).
- Docker connectivity test (`docker ps`) in the pipeline.
- Local integration testing with Docker Compose.
- Functional testing of login, resume editor, and PDF export in the browser.

## 8. Outcomes and Benefits

- Consistent environments across development and deployment.
- Faster, repeatable builds through Jenkins automation.
- Portable deployment using standard Docker images.
- Simpler operations compared to full cluster orchestration.
- Clear foundation for future enhancements (tests, staging, monitoring).

## 9. Future Enhancements

- Add automated tests (unit and integration) in the Jenkins pipeline.
- Add SonarQube or lint stages for code quality.
- Use environment-specific `.env` files for staging and production.
- Add health-check scripts after `docker compose up`.
- Optional migration to Kubernetes later if horizontal scaling is required.

## 10. Conclusion

The project successfully combines application development with practical DevOps using Docker and Jenkins. Containerization makes the Resume Builder easy to run and deploy, while Jenkins automates build and image publishing. This approach is suitable for academic projects and small-to-medium deployments without the complexity of Kubernetes.
