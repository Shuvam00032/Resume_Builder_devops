pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "shuvam0032/resume-builder-frontend"
        BACKEND_IMAGE = "shuvam0032/resume-builder-backend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Build Frontend") {
            steps {
                dir("resume-builder") {
                    sh "node -v && npm -v"
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        stage("Build Backend") {
            steps {
                dir("resumebuilderapi") {
                    sh "chmod +x mvnw"
                    sh "./mvnw -B clean package -DskipTests"
                }
            }
        }

        stage("Docker Test") {
            steps {
                sh '''
                    set -e
                    echo "=== Docker diagnostics ==="
                    id
                    ls -l /var/run/docker.sock || echo "MISSING: /var/run/docker.sock not mounted"
                    docker version
                    docker ps
                '''
            }
        }

        stage("Build Docker Images") {
            steps {
                sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./resume-builder"
                sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./resumebuilderapi"
            }
        }

        stage("Push Docker Images") {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "DockerHub",
                        usernameVariable: "DOCKER_USER",
                        passwordVariable: "DOCKER_PASS"
                    )
                ]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh "docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${BACKEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${FRONTEND_IMAGE}:latest"
                    sh "docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker logout"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
