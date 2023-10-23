import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

const app = express();

//Middleware for parsing request body || We are checking it using POSTMAN...
app.use(express.json());

//Middleware for handling CORS Policy...
//Several ways...
//1. Allow all origins with default of cors(*)
//--->//app.use(cors());
//2. Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );
//--------------------

app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`APP is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })