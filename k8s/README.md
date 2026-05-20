# Kubernetes Deployment Guide

This folder contains Kubernetes manifests for the Cloud-Native Resume Builder.

## Files

- `namespace.yaml` - Namespace creation.
- `configmap.yaml` - Non-sensitive app configuration.
- `secrets.example.yaml` - Secret template (copy to `secrets.yaml` and replace values).
- `mongo.yaml` - MongoDB deployment, service, and persistent storage claim.
- `backend.yaml` - Spring Boot backend deployment and service.
- `frontend.yaml` - React frontend deployment and service.
- `ingress.yaml` - Ingress routes (`/` to frontend and `/api` to backend).

## First-time setup

1. Create real secrets file:
   - Copy `secrets.example.yaml` to `secrets.yaml`.
   - Replace all placeholder values.
2. Update image names:
   - In `frontend.yaml` and `backend.yaml`, replace `your-dockerhub-username/...`.
3. Apply resources:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml
```

## Verify

```bash
kubectl get pods -n resume-builder
kubectl get svc -n resume-builder
kubectl get ingress -n resume-builder
```
