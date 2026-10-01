# Node.js CI/CD Pipeline with GitHub Actions

Project overview

Technologies Used
- Node.js
- Express.js
- Jest
- Supertest
- Docker
- GitHub Actions
- Docker Hub

Application Endpoints
- /
- /health

Running Locally

Running with Docker

CI/CD Pipeline
1. Push to main
2. GitHub Actions starts
3. Install dependencies
4. Run automated tests
5. Build Docker image
6. Authenticate to Docker Hub
7. Push latest image

GitHub Secrets
- DOCKERHUB_USERNAME
- DOCKERHUB_TOKEN
