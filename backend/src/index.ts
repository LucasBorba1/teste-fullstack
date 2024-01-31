import Express from "express";
import UserController from "./controllers/UserController";
import cors from 'cors';

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app = Express();
app.use(cors(options));
app.use(Express.json());
const PORT = 8000;

app.get('/', (request, response) => {
    return response.send({ message: 'Hello World'});
})

app.post('/createUser', UserController.createUser);

app.get('/listUsers', UserController.listUsers);
app.get('/listUsers/:id', UserController.findUser);

app.get('/searchUsers/:name', UserController.searchUsers);
app.get('/filterUsers/', UserController.filterUsers);
app.get('/listDeletedUsers', UserController.listDeletedUsers);

app.put('/updateUser', UserController.updateUser);

app.delete('/deleteUser/:id', UserController.deleteUser);

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})