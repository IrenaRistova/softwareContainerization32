import express, { response } from 'express';
import { PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import productsRoute from './routes/productsRoute.js'
import cors from 'cors';


const app = express();

//Midleware for parsing request body (after error in poostman saying cannot read properties of undefined)
app.use(express.json());

//middleware gor handling CORS policy
//Option 1: Allow all origins wiht default of cors()
// app.use(cors())

//Option 2: ALlow Custom origins // now only clients with this origin can access server
app.use(cors({
  origin:'http://localhost:3001',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type'],
})
);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/products', productsRoute);


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
