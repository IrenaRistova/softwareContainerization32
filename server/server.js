import express from 'express';
import { PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import { Product } from './models/productModels.js'
// import cors from 'cors';


const app = express();

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

//Route to save a new product
// app.post('/products', async (request, response) => {
//   try{
//     if(
//       !request.body.
//     ) 
//   }
// })


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
