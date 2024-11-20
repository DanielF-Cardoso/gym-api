# Simple GymPass Clone API ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

This is an API application developed to manage gyms and user check-ins, with features similar to Gympass. The system allows users to sign up, authenticate, check in to gyms, view their check-in history, and search for nearby gyms. Administrators can add gyms and validate check-ins.

## Functional Requirements (FR)

- [x] **User Registration**: The user must be able to sign up with an email and password.
- [x] **Authentication**: The user must be able to authenticate using JWT (JSON Web Token).
- [x] **User Profile**: The user can retrieve their profile after authentication.
- [x] **Check-in History**: The user can view their check-in history.
- [x] **Check-ins**: The user can perform check-ins at nearby gyms.
- [x] **Search Gyms**: The user can search gyms by proximity (up to 10 km) or by name.
- [x] **Validate Check-in**: The user can validate their check-in, but only within 20 minutes of creation and only by administrators.
- [x] **Gym Registration**: Only administrators can add gyms.

## Business Rules (BR)

- [x] **Unique Email**: The user cannot sign up with a duplicate email.
- [x] **Daily Check-in Limit**: The user cannot perform two check-ins on the same day.
- [x] **Gym Proximity**: The user must be within 100 meters of the gym to check in.
- [x] **Check-in Validation**: The check-in must be validated within 20 minutes of creation and only by administrators.
- [x] **Gym Registration**: Only administrators can register gyms.

## Non-Functional Requirements (NFR)

- [x] **Password Encryption**: User passwords must be encrypted using bcryptjs.
- [x] **Database**: All data will be stored in a PostgreSQL database.
- [x] **Pagination**: All lists of data will be paginated with 20 items per page.: The user must be within 100 meters of the gym to check in.
- [x] **Check-in Validation**: The check-in must be validated within 20 minutes of creation and only by administrators.
- [x] **Gym Registration**: Only administrators can register gyms.

## Technology Stack

- Node.js
- Fastify
- Prisma
- PostgreSQL
- bcryptjs
- dayjs
- dotenv 
- zod
- Docker

## API Endpoints

- POST /users: Create a new user.
- POST /sessions: Log in and return the JWT.
- POST /gyms/check-ins: Perform a check-in at a gym.
- POST /gyms: Add a new gym (administrators only).
- POST /check-ins/validate: Validate a check-in (administrators only).
- GET /me: Retrieve the profile of the logged-in user.
- GET /check-ins/history: Get the check-in history of the logged-in user.
- GET /check-ins/metrics: Retrieve check-in metrics (total check-ins, validation status, etc.).
- GET /gyms/search: Search for gyms by name.
- GET /gyms/nearby: Search for gyms within proximity (up to 10 km).
- PATCH /check-ins/validate: Validate a specific check-in (only accessible by administrators).
  
## Steps to Run the Project

1. **Clone the Repository**
    - Clone the project repository to your local machine:
      ```sh
      https://github.com/DanielF-Cardoso/gym-api.git
      ```

2. **Install Dependencies**
    - Navigate to the project directory and install the dependencies:
      ```sh
      npm install
      ```
      
3. **Set Up the Database with Docker**
    - This project uses PostgreSQL in a Docker container. The necessary configuration is already present in the repository. Follow the steps below to set it up:
    - Ensure you are in the project root directory.
    - The `docker-compose.yml` file is already included in the project. Simply run the following command to start the PostgreSQL database containe
     ```sh
      docker-compose up -d
      ```
     - This will start the PostgreSQL database, which will be available on port 5432.
     
4. **Set Up Environment Variables**
    - In the project root directory, you will find a file called .env.example. Copy this file and rename it to .env:
    - Open the newly created .env file and fill in the required variables with the appropriate values.

5. **Run Prisma Migrations**
    - Run the following command to apply the migrations:
     ```sh
      npx prisma migrate dev
      ```
5. **Start the Server**
    - After configuring the database and environment variables, start the Fastify server in development mode:
     ```sh
      npm run dev
      ```
     - The server will be running locally on port 3333 by default.
