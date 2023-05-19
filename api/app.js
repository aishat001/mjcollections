const express = require('express')
require("dotenv").config(); 
// const path = require('path');
const userRouter = require('./routers/user')
const itemRouter =require('./routers/item')
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')
const StripeRouter = require('./routers/stripe')
const cors = require('cors');
const app = express() 

require('./db/mongoose').connect()
app.use((_, res, next) => {
    res.set('Access-Control-Allow-Origin', '*'); // or 'localhost:8888'
    res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    return next();
  });
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(cartRouter)
app.use(orderRouter)
app.use(StripeRouter)



app.get('/', (req, res) => {
    res.send("helllloooooooooo")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server listening on port ' + PORT)
    })