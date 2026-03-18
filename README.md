# Project Title: Build Calculator
## Description
A simple calculator application to perform basic arithmetic operations.

## Tech Stack
* Frontend: React
* Backend: None
* Database: None
* Auth: Supabase
* Payments: None
* Realtime: False

## Architecture Overview
```
                      +---------------+
                      |  Client   |
                      |  (React)  |
                      +---------------+
                             |
                             |
                             v
                      +---------------+
                      |  API      |
                      |  (None)   |
                      +---------------+
                             |
                             |
                             v
                      +---------------+
                      |  Auth     |
                      |  (Supabase)|
                      +---------------+
```
The application consists of a React frontend, with no backend or database. Authentication is handled by Supabase.

## API Endpoints
The following API endpoint is available:
* **POST /api/calculate**: Perform basic arithmetic operations
	+ Request Body:
		- operation: string
		- num1: number
		- num2: number
	+ Response:
		- result: number

## ENV Variables
The following environment variables are required:
* **SUPABASE_URL**: The URL of the Supabase instance
* **SUPABASE_KEY**: The key for the Supabase instance

These variables should be set in a `.env` file in the root of the project.

## Local Setup Instructions
To run the application locally, follow these steps:
1. Clone the repository: `git clone https://github.com/your-username/build-calculator.git`
2. Navigate to the project directory: `cd build-calculator`
3. Create a `.env` file with the required environment variables
4. Run `docker-compose up` to start the application
5. Open a web browser and navigate to `http://localhost:3000` to access the application

## Deploy Instructions
To deploy the application, follow these steps:
1. Create a Supabase instance and obtain the URL and key
2. Set the `SUPABASE_URL` and `SUPABASE_KEY` environment variables in your deployment environment
3. Build the Docker image: `docker build -t build-calculator .`
4. Push the image to a container registry: `docker push your-username/build-calculator`
5. Deploy the image to your preferred platform (e.g. Kubernetes, AWS ECS)

## File Structure
The project consists of the following files and directories:
* `.github/workflows/ci.yml`: GitHub Actions CI/CD pipeline
* `README.md`: Project documentation
* `package.json`: Defines the project's dependencies and scripts
* `.gitignore`: Specifies files to be ignored by version control
* `.env.example`: Provides an example of environment variables
* `database/schema.sql`: Defines the database schema (not used in this project)
* `database/migrations`: Stores database migration scripts (not used in this project)
* `backend/index.js`: Defines the backend application entry point (not used in this project)
* `backend/api/calculate.js`: Handles the calculate API endpoint (not used in this project)
* `frontend/public/index.html`: Defines the frontend application entry point
* `frontend/src/index.js`: Defines the frontend application logic
* `frontend/src/components/Calculator.js`: Defines the calculator component
* `tests/backend/test.calculate.js`: Tests the calculate API endpoint (not used in this project)
* `tests/frontend/test.calculator.js`: Tests the calculator component
* `.github/workflows/ci-cd.yml`: Defines the CI/CD pipeline
* `docker-compose.yml`: Defines the Docker composition
* `docker/Dockerfile`: Defines the Docker image