import express, { response } from 'express';
import { PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import { Product } from './models/productModels.js'
// import cors from 'cors';


const app = express();

//Midleware for parsing request body (after error in poostman saying cannot read properties of undefined)
app.use(express.json());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

//Route to save a new product
app.post('/products', async (request, response) => {
  try{
    if(
      !request.body.productName ||
      !request.body.size ||
      !request.body.expiryYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, size, expiryYear',
      });
    }
    const newProduct = {
      productName: request.body.productName,
      size: request.body.size,
      expiryYear: request.body.expiryYear,
    };
    const product = await Product.create(newProduct);

    return response.status(201).send(product);  //send to client
  } catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message});
  }
})

//Route to get all products from database
app.get('/products', async (request, response) => {
  try{
    const products = await Product.find({});

    return response.status(200).json({
      count: products.length,
      data: products
    });
  }catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message})
  }
})

//Route to get one product from database by id
app.get('/products/:id', async (request, response) => {
  try{

    const {id} = request.params;
    const product = await Product.findById(id);

    return response.status(200).json({
      count: product.length,
      data: product
    });
  }catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message})
  }
})

//Route to update a product
app.put('/products/:id',async (request, response) => {
  try{
    if(
      !request.body.productName ||
      !request.body.size ||
      !request.body.expiryYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: productName, size, expiryYear',
      });
    }
    
    const {id} = request.params;
    const result = await Product.findByIdAndUpdate(id,request.body);

    if(!result){
       return response.status(404).json({message: "Product not found"});
    }
    return response.status(200).send({message: "Product updated successfullu"});

  }catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message})
  }
})

//Route to delete a product


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
