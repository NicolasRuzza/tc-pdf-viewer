# TcPdfViewer

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

## Docker container

```bash
sudo docker run -d --name tc-pdf-viewer -p 8080:80 tc-pdf-viewer:latest
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment Process (Docker)

This project uses a **Node.js Backend** and an **Angular Frontend (served by Nginx)**, orchestrated via Docker Compose. The deployment is performed via offline image transfer (using a `.tar` file).

### 1. On the Development Machine (Build)

Generate the images and the package for transfer:

```bash
# 1. Build the Backend image
# (Run inside the backend directory)
docker build -t meu-projeto-backend:v1 .

# 2. Build the Frontend image
# (Run inside the frontend directory)
docker build -t meu-projeto-frontend:v1 .

# 3. Create a single package (.tar) containing both images
docker save -o app-pacote.tar meu-projeto-backend:v1 meu-projeto-frontend:v1
```

> **Files required to transfer to the server/VM:**

> 1. `app-pacote.tar` (The images)
> 2. `docker-compose.prod.yml` (The orchestration)
> 3. `.env` (Production environment variables)

### 2. On the Server / VM (Execution)Once the files are transferred to the server, execute the following commands:

```bash
# 1. Load the images from the tar file into the Docker daemon
sudo docker load -i app-pacote.tar

# 2. Start the containers (using the production file)
sudo docker compose -f docker-compose.prod.yml up -d
```

The application will be available at: `http://server-ip:8080`

## Configuration Files

### docker-compose.prod.yml

This file defines the production infrastructure. It uses the pre-built images loaded from the `.tar` file instead of building them from source.

```yaml
services:
  app:
    image: meu-projeto-backend:v1
    container_name: backend-api
    restart: always
    env_file: .env
    networks:
      - minha-rede-app

  frontend:
    image: meu-projeto-frontend:v1
    container_name: frontend-app
    restart: always
    ports:
      - "8080:80"
    depends_on:
      - app
    networks:
      - minha-rede-app

networks:
  minha-rede-app:
    external: false
```