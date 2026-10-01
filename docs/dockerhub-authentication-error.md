# GitHub Actions: Docker Hub Authentication Failure

## Scenario

The CI/CD pipeline was configured to automatically test the Node.js application, build a Docker image, and push the image to Docker Hub.

The test job completed successfully, but the `build-and-push` job failed during the Docker Hub login step.

---

## Error

GitHub Actions reported:

```text
Error: Username and password required
```

The failure occurred during the Docker Hub authentication step.

---

## Workflow Configuration

The workflow used GitHub repository secrets for Docker Hub authentication:

```yaml
- name: Login to DockerHub
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```

The credentials were intentionally not hardcoded into the workflow file.

---

## Why It Happened

The error indicated that the Docker login action was not receiving usable authentication values.

The workflow expected the following GitHub repository secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

The secret names and their configured values therefore needed to be checked.

---

## Troubleshooting

I opened the GitHub repository settings and checked:

```text
Settings
→ Secrets and variables
→ Actions
→ Repository secrets
```

I verified that the required repository secrets existed with the exact names:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

The username secret contained the Docker Hub username, while the token secret contained a Docker Hub personal access token.

The actual token was kept private and was not stored in the repository or workflow file.

After correcting/verifying the repository secrets, I reran the failed GitHub Actions workflow.

---

## Result

The Docker Hub login step completed successfully.

The remaining pipeline steps then executed:

```text
Automated Tests
      |
      v
Docker Hub Login
      |
      v
Docker Image Build
      |
      v
Docker Image Push
      |
      v
Docker Hub
```

The image was successfully published as:

```text
krutiknikhal/nodejs-demo-app:latest
```

I later pulled this image from Docker Hub and successfully ran a container from it, confirming that the image produced by the pipeline was usable.

---

## Security Consideration

The Docker Hub password or token should not be written directly into:

```text
.github/workflows/main.yml
```

Instead, sensitive credentials should be stored using GitHub Actions repository secrets and referenced in the workflow:

```yaml
${{ secrets.DOCKERHUB_USERNAME }}
${{ secrets.DOCKERHUB_TOKEN }}
```

This keeps the credential values outside the source code.

---

## What I Learned

This issue helped me understand:

- CI/CD failures can be isolated by identifying the exact failed job and step.
- GitHub Actions can securely access credentials through repository secrets.
- Secret names in the workflow must match the configured GitHub secret names.
- Docker Hub personal access tokens can be used for CI/CD authentication.
- Credentials should never be hardcoded into a workflow file.
- A failed workflow does not always indicate an application-code problem.
- After correcting secrets, an existing workflow run can be rerun without creating an unnecessary code commit.

---

## Key Takeaway

When a CI/CD pipeline fails during authentication, first identify the failed step and verify the expected credentials and secret configuration rather than modifying unrelated application code.

GitHub Actions repository secrets allow sensitive values such as Docker Hub credentials to be used by the pipeline without exposing them in the repository.