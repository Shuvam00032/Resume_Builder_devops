pipeline {
  agent any

  environment {
    REGISTRY = "docker.io"
    FRONTEND_IMAGE = "shuvam0032/resume-builder-frontend"
    BACKEND_IMAGE = "shuvam0032/resume-builder-backend"
    IMAGE_TAG = "${BUILD_NUMBER}"
    K8S_NAMESPACE = "resume-builder"
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
          sh "npm ci"
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

    stage("Build Docker Images") {
      steps {
        script {
          sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./resume-builder"
          sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./resumebuilderapi"
        }
      }
    }

    stage("Push Docker Images") {
      steps {
        withCredentials([usernamePassword(credentialsId: "dockerhub-creds", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]) {
          sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
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

    stage("Deploy to Kubernetes") {
      steps {
        withCredentials([file(credentialsId: "kubeconfig", variable: "KUBECONFIG_FILE")]) {
          sh """
            export KUBECONFIG=${KUBECONFIG_FILE}
            kubectl apply -f k8s/namespace.yaml
            kubectl apply -f k8s/configmap.yaml
            kubectl apply -f k8s/secrets.yaml
            kubectl apply -f k8s/mongo.yaml
            kubectl apply -f k8s/backend.yaml
            kubectl apply -f k8s/frontend.yaml
            kubectl apply -f k8s/ingress.yaml
            kubectl -n ${K8S_NAMESPACE} set image deployment/frontend frontend=${FRONTEND_IMAGE}:${IMAGE_TAG}
            kubectl -n ${K8S_NAMESPACE} set image deployment/backend backend=${BACKEND_IMAGE}:${IMAGE_TAG}
            kubectl -n ${K8S_NAMESPACE} rollout status deployment/frontend --timeout=180s
            kubectl -n ${K8S_NAMESPACE} rollout status deployment/backend --timeout=180s
          """
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
