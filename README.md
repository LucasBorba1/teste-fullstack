# teste-fullstack

### Stack
#### Backend:
- NodeJS server + Express for route management
- Docker container running PostgreSQL image for database
- Prisma ORM for database migrations and mapping
- TypeScript

#### Frontend:
- React + TypeScript
- Tailwind

## Backend

### Setup steps

```cd backend```

#### Install dependencies and Docker image

```npm install```
 
```systemctl start docker```

```sudo docker compose up -d```

#### Setup database

```prisma migrate dev```

#### Run backend
```npm run dev```

### API endpoints

#### Create new user: POST
http://localhost:8000/createUser

#### List all users: GET
http://localhost:8000/listUsers/

#### Find user by ID: GET
http://localhost:8000/listUsers/1

#### Update user information by ID: PUT 
http://localhost:8000/updateUser/555

#### Delete user by ID: DELETE
http://localhost:8000/deleteUser/1

This method does not delete the user registry in the database, instead it switches a flag in the registry that soft deletes the user and prevents it from being accessed by other methods.


## Frontend

```cd frontend```

### Install dependencies

```npm install```

### Run frontend
```npm run start```