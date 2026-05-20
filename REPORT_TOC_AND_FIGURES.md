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

2. Existing System and Proposed System ...................................... 3-4  
2.1 Existing System ........................................................ 3  
2.2 Proposed System (Docker + Jenkins) ..................................... 4  

3. System Requirements ...................................................... 5-6  
3.1 Hardware Requirements ................................................... 5  
3.2 Software Requirements ................................................... 6  

4. System Design and Architecture ........................................... 7-9  
4.1 High-Level Architecture ................................................ 7  
4.2 Component Design (Frontend, Backend, Database) ......................... 8  
4.3 CI/CD Workflow Design (Jenkins) ........................................ 9  

5. Implementation ........................................................... 10-14  
5.1 Dockerization and Docker Compose ....................................... 10-11  
5.2 Jenkins Pipeline Implementation .......................................... 12-13  
5.3 Application Screens and Runtime Verification ........................... 14  

6. Testing and Validation ................................................... 15-17  
6.1 Build and Pipeline Testing ............................................... 15  
6.2 Docker Compose Deployment Testing ........................................ 16  
6.3 Functional Verification of Resume Builder .............................. 17  

7. Results and Discussion ................................................... 18-19  

8. Future Enhancements and Conclusion ....................................... 20-21  

References .................................................................. 22  

---

# List of Figures (Polished Format)

## FIG. NO. | DESCRIPTION | PAGE NO.

5.1 | System Architecture Diagram of Resume Builder (Docker Stack) | 7  
5.2 | Use Case Diagram of Resume Builder Web Application | 8  
5.3 | Jenkins CI/CD Pipeline Flow Diagram | 9  
5.4 | Docker Compose Service Topology Diagram | 10  
6.1 | Docker Containers Running (Frontend, Backend, MongoDB, Mailpit) | 11  
6.2 | Jenkins Pipeline Successful Build and Push Stages | 13  
6.3 | Docker Hub Repository with Versioned Images | 14  
7.1 | Resume Builder Home/Login Page | 17  
7.2 | Resume Editor Dashboard Page | 18  
7.3 | Resume Preview and PDF Export Page | 18  
7.4 | GitHub Repository Page | 19  

---

# Docker + Jenkins Diagram Caption List

Use these captions under your diagrams/screenshots in the report:

1. **Figure 5.1:** High-level architecture of the Resume Builder showing React frontend, Spring Boot backend, and MongoDB in Docker containers.
2. **Figure 5.2:** User interaction flow and major use cases in the Resume Builder web application.
3. **Figure 5.3:** Jenkins CI/CD pipeline stages from checkout to Docker image push.
4. **Figure 5.4:** Docker Compose service layout with frontend, backend, database, and mail services.
5. **Figure 6.1:** Running Docker containers for the full application stack.
6. **Figure 6.2:** Successful Jenkins pipeline execution showing build and registry push.
7. **Figure 6.3:** Docker Hub repository showing frontend and backend image tags.
8. **Figure 7.1:** Resume Builder login and landing page.
9. **Figure 7.2:** Resume creation and editing interface.
10. **Figure 7.3:** Resume preview and PDF export screen.

---

# Optional Word Formatting Tips

- Use **Times New Roman**, size **12** for body and **14 bold** for headings.
- Keep heading text in **UPPERCASE** for `TABLE OF CONTENTS` and `LIST OF FIGURES`.
- Use dotted leaders between section name and page number.
- Keep roman numerals (`I, II, III, IV`) for front matter pages.
