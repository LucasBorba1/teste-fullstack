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

```body = {name: xxx, email: xxx, phone: xxx}```

#### List all users: GET
http://localhost:8000/listUsers/

#### Find user by ID: GET
http://localhost:8000/listUsers/${id}

#### Search Users: GET
http://localhost:8000/searchUsers/${searchParams}

#### Filter Users: GET
<http://localhost:8000/filterUsers/?sortBy=${order}&filterStart=${startDate}&filterEnd=${endDate}>

#### List all deleted users: GET
<http://localhost:8000/listDeletedUsers/>

#### Update user information by ID: PUT 
http://localhost:8000/updateUser/

```body = {id: xxx, name: xxx, phone: xxx}```

#### Delete user by ID: DELETE
http://localhost:8000/deleteUser/${id}

This method does not delete the user registry in the database, instead it switches a flag in the registry that soft deletes the user and prevents it from being accessed by other methods.


## Frontend

### Setup steps

```cd frontend```

### Install dependencies

```npm install```

### Run frontend
```npm run start```