pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
        maven 'Maven3'
    }

    environment {
        FRONTEND_IMAGE = 'shuvam0032/resume-builder-frontend'
        BACKEND_IMAGE  = 'shuvam0032/resume-builder-backend'
        IMAGE_TAG      = "${BUILD_NUMBER}"
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
                    if ! docker ps >/dev/null 2>&1; then
                      echo "ERROR: Jenkins cannot access Docker."
                      exit 1
                    fi
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

        stage("Deploy Containers") {
            steps {
                // We pass Jenkins env variables directly into the shell block smoothly
                sh '''
                    echo "Ensuring custom Docker network exists..."
                    docker network create resume-network || true

                    echo "Stopping old containers..."
                    docker stop resume-frontend || true
                    docker stop resume-backend || true

                    echo "Removing old containers..."
                    docker rm resume-frontend || true
                    docker rm resume-backend || true

                    echo "Starting backend container using current build tag..."
                    docker run -d \
                      --name resume-backend \
                      --network resume-network \
                      -p 8082:8080 \
                      '"${FRONTEND_IMAGE}:${IMAGE_TAG}"'

                    echo "Starting frontend container using current build tag..."
                    docker run -d \
                      --name resume-frontend \
                      --network resume-network \
                      -p 3000:80 \
                      '"${FRONTEND_IMAGE}:${IMAGE_TAG}"'

                    echo "Cleaning up dangling/old images to save disk space..."
                    docker image prune -f

                    echo "Deployment completed successfully!"
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
        always {
            cleanWs()
        }
    }
}