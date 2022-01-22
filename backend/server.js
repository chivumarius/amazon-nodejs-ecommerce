/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
// IMPORTS:
import express from 'express';
import cors from 'cors';
import data from './data.js';



//  "APP" CONSTANT:
const app = express();

// USING PACKAGE "CORS":
app.use(cors());



// ROUTE 1 -- "GET(/API/PRODUCTS)":
app.get('/api/products', (req, res) => {
  res.send(data.products);
});


// ROUTE 2 -- "GET(/API/PRODUCTS/:ID)":
app.get('/api/products/:id', (req, res) => {
  
  // METHOD ".FIND()":
  const product = data.products.find((x) => x._id === req.params.id);
  
  // IF "PRODUCT EXISTE" → OR "NOT":
  if (product) {
    res.send(product);
  } else {
    // MESSAGE ERROR: "404":
    res.status(404).send({ message: 'Product Not Found!' });
  }
});


// START THE "SERVER" 
app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
