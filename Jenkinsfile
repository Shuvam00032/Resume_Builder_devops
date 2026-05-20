pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
        maven 'Maven3'
    }

    environment {
        DOCKER_HOST = 'tcp://localhost:2375'

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

                    bat "npm install"
                    bat "npm run build"
                }
            }
        }

        stage("Build Backend") {
            steps {
                dir("resumebuilderapi") {

                    bat "mvnw.cmd -B clean package -DskipTests"
                }
            }
        }

        stage("Docker Test") {
            steps {
                bat "docker ps"
            }
        }

        stage("Build Docker Images") {
            steps {
                script {

                    bat "docker build -t %FRONTEND_IMAGE%:%IMAGE_TAG% ./resume-builder"

                    bat "docker build -t %BACKEND_IMAGE%:%IMAGE_TAG% ./resumebuilderapi"
                }
            }
        }

        stage("Push Docker Images") {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: "dockerhub-creds",
                        usernameVariable: "DOCKER_USER",
                        passwordVariable: "DOCKER_PASS"
                    )
                ]) {

                    bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"

                    bat "docker push %FRONTEND_IMAGE%:%IMAGE_TAG%"
                    bat "docker push %BACKEND_IMAGE%:%IMAGE_TAG%"

                    bat "docker tag %FRONTEND_IMAGE%:%IMAGE_TAG% %FRONTEND_IMAGE%:latest"
                    bat "docker tag %BACKEND_IMAGE%:%IMAGE_TAG% %BACKEND_IMAGE%:latest"

                    bat "docker push %FRONTEND_IMAGE%:latest"
                    bat "docker push %BACKEND_IMAGE%:latest"

                    bat "docker logout"
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