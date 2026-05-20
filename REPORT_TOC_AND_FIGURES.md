# Table of Contents (Polished Format)

## CONTENTS

Abstract ........................................................................ I  
Acknowledgement ............................................................ II  
Table of Contents .......................................................... III  
List of Figures ............................................................ IV  

1. Introduction ............................................................ 1-2  
1.1 Background ............................................................. 1  
1.2 Purpose ................................................................ 1  
1.3 Objectives ............................................................. 2  

2. Existing System and Proposed Cloud-Native System ........................ 3-4  
2.1 Existing System (Dockerized Setup) ..................................... 3  
2.2 Proposed System (Docker + Jenkins + Kubernetes) ........................ 4  

3. System Requirements ...................................................... 5-6  
3.1 Hardware Requirements ................................................... 5  
3.2 Software Requirements ................................................... 6  

4. System Design and Architecture ........................................... 7-10  
4.1 High-Level Architecture ................................................ 7  
4.2 Component Design (Frontend, Backend, Database) ......................... 8  
4.3 CI/CD Workflow Design ................................................... 9  
4.4 Deployment Design in Kubernetes ........................................ 10  

5. Implementation ........................................................... 11-15  
5.1 Dockerization .......................................................... 11  
5.2 Jenkins Pipeline Implementation ........................................ 12-13  
5.3 Kubernetes Manifests and Deployment .................................... 14-15  

6. Testing and Validation ................................................... 16-18  
6.1 Build and Deployment Testing ........................................... 16  
6.2 Kubernetes Health and Rollout Validation ............................... 17  
6.3 Functional Verification of Resume Builder .............................. 18  

7. Results and Discussion ................................................... 19-20  

8. Future Enhancements and Conclusion ....................................... 21-22  

References .................................................................. 23  

---

# List of Figures (Polished Format)

## FIG. NO. | DESCRIPTION | PAGE NO.

5.1 | System Architecture Diagram of Cloud-Native Resume Builder | 7  
5.2 | Use Case Diagram of Resume Builder Web Application | 8  
5.3 | Jenkins CI/CD Pipeline Flow Diagram | 9  
5.4 | Kubernetes Deployment and Service Topology Diagram | 10  
6.1 | Docker Containers Running (Frontend, Backend, MongoDB) | 11  
6.2 | Jenkins Pipeline Successful Build Stage | 13  
6.3 | Docker Hub Repository with Versioned Images | 14  
6.4 | Kubernetes Pods Running in `resume-builder` Namespace | 15  
6.5 | Kubernetes Services and Ingress Output | 15  
7.1 | Resume Builder Home/Login Page | 18  
7.2 | Resume Editor Dashboard Page | 19  
7.3 | Resume Preview and PDF Export Page | 19  
7.4 | Admin/Management View (if implemented) | 20  

---

# Jenkins + Kubernetes Architecture Diagram Caption List

Use these captions under your diagrams/screenshots in the report:

1. **Figure 5.1:** High-level architecture of the Cloud-Native Resume Builder showing React frontend, Spring Boot backend, and MongoDB database.
2. **Figure 5.2:** User interaction flow and major use cases in the Resume Builder web application.
3. **Figure 5.3:** Jenkins CI/CD pipeline stages from source checkout to Kubernetes deployment.
4. **Figure 5.4:** Kubernetes object relationship diagram with Deployments, Services, ConfigMap, Secret, PVC, and Ingress.
5. **Figure 6.1:** Dockerized local environment running frontend, backend, MongoDB, and supporting services.
6. **Figure 6.2:** Successful Jenkins pipeline execution showing build, image push, and deployment stages.
7. **Figure 6.3:** Docker image registry entries for frontend and backend with build-number tags.
8. **Figure 6.4:** Active Kubernetes pods in `resume-builder` namespace after deployment.
9. **Figure 6.5:** Service discovery and external routing through Kubernetes Ingress.

---

# Optional Word Formatting Tips (to match your screenshot style)

- Use **Times New Roman**, size **12** for body and **14 bold** for headings.
- Keep heading text in **UPPERCASE** for `TABLE OF CONTENTS` and `LIST OF FIGURES`.
- Use dotted leaders between section name and page number.
- Keep roman numerals (`I, II, III, IV`) for front matter pages.
- Keep section numbering consistent with chapter headings in your report.
