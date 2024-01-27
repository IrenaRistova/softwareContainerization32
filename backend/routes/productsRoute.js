import express from 'express';
import {Product} from '../models/productModel.js'

const router = express.Router();

console.log("ghe78fh98wg9ehs7")


// //Route to save a new product
router.post('/', async (request, response) => {
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
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
    try{
  
      const {id} = request.params;
      // const product = await Product.findById(id);
      const product = await Product.find({ _id: id });
  
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
  router.put('/:id',async (request, response) => {
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
  router.delete('/:id', async (request, response) => {
    try{
      const {id} = request.params
      const result = await Product.findByIdAndDelete(id);
  
      if(!result){
        return response.status(404).json({message: "Product not found"});
      }
  
      return response.status(200).send({message: "Product deleted succesfully"});
      
    }
    catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message})
    }
  })


  export default router;