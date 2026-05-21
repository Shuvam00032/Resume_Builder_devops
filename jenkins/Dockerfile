FROM jenkins/jenkins:lts-jdk21

USER root
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        docker.io \
        libatomic1 \
        nodejs \
        npm \
    && rm -rf /var/lib/apt/lists/*

# Root user can access the mounted Docker socket (dev/CI setup).
USER root
