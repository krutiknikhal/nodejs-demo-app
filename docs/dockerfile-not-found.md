# Docker Build Error: Dockerfile Not Found

## Scenario

While containerizing the Node.js application, I attempted to build a Docker image using:

```bash
docker build -t nodejs-demo-app .
```

The Docker build failed because Docker could not locate the `Dockerfile` in the build context.

---

## Error

The following error was returned:

```text
failed to read dockerfile: open Dockerfile: no such file or directory
```

---

## Why It Happened

The final `.` in the Docker build command specifies the current directory as the Docker build context:

```bash
docker build -t nodejs-demo-app .
```

By default, Docker expects to find a file named:

```text
Dockerfile
```

inside that build context.

At the time the command was executed, the required Dockerfile was not available correctly in the current project directory.

---

## Troubleshooting

I verified that I was working from the correct project directory and checked the project files.

The expected structure was:

```text
nodejs-demo-app/
├── Dockerfile
├── .dockerignore
├── app.js
├── package.json
├── package-lock.json
└── ...
```

After ensuring that the file was correctly created and named `Dockerfile`, I ran the build again:

```bash
docker build -t nodejs-demo-app .
```

The Docker image then built successfully.

---

## Verifying the Image

After the successful build, I verified the image using:

```bash
docker images
```

The application could then be started in a container:

```bash
docker run -d -p 3000:3000 --name nodejs-demo-container nodejs-demo-app
```

The running container was verified using:

```bash
docker ps
```

---

## What I Learned

This issue helped me understand that:

- Docker requires a valid Dockerfile to build an image.
- By default, Docker looks for a file named `Dockerfile`.
- The `.` in `docker build` represents the current directory as the build context.
- Docker commands should be executed from the correct project directory when using `.` as the context.
- File names and locations are important when working with Docker.
- Build errors should be investigated from the actual error message rather than repeatedly running the same command.

---

## Commands Used

```bash
# Build the Docker image
docker build -t nodejs-demo-app .

# Verify available Docker images
docker images

# Run the image as a container
docker run -d -p 3000:3000 --name nodejs-demo-container nodejs-demo-app

# Verify running containers
docker ps
```

## Key Takeaway

When Docker reports that it cannot find a Dockerfile, verify the current build context, project directory, filename, and location of the Dockerfile before investigating more complex causes.