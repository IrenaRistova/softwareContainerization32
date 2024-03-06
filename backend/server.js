import express, { response } from 'express';
import { PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import productsRoute from './routes/productsRoute.js'
import cors from 'cors';
import * as dotenv from 'dotenv';


dotenv.config();
const app = express();

const MONGO_DB = process.env.MONGO_DB;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;


//Midleware for parsing request body (after error in poostman saying cannot read properties of undefined)
app.use(express.json());

app.use(cors())

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/products', productsRoute);


mongoose
  .connect(URI)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
