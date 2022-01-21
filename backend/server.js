// IMPORTS:
import express from 'express';
import cors from 'cors';
import data from './data.js';



//  "APP" CONSTANT:
const app = express();


// USING PACKAGE "CORS":
app.use(cors());


// ROUTE "GET(/API/PRODUCTS)":
app.get('/api/products', (req, res) => {
  res.send(data.products);
});


// START THE "SERVER" 
app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
