const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/cart');
const Item = require('../models/items');
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken');
const router = new express.Router()

  
// router.get('/cart', async(req, res) => {
//     const owner = req.user._id
//     try {
//         const cart = Cart .findOne({owner})
//         if (cart && cart.items.length > 0) {
//             res.status(200).send(cart);
//        } else {
//              res.send(null);
//        }
//     } catch (error) {
//         res.status(404).send(error)
//     }
// })

// Handle POST requests to the '/cart' endpoint

router.post('/cart', async (req, res) => {
  const newCart = new Cart(req.body);

    try {


      // const { userId, itemId, quantity } = req.body;
      // // Look up the item in the database by ID
      // const item = await Item.findById(itemId);
      // if (!item) {
      //   // If the item isn't found, return a 404 error response
      //   return res.status(404).json({ message: 'Item not found' });
      // }
  
      // // Extract the item's name and price
      // const name = item.name;
      // const price = item.price; 
  
      // Look up the user's cart in the database
      // let cart = await Cart.findOne({ owner: userId });
      // if (cart) {
      //   // If the cart already exists for the user, update it
      //   const itemIndex = cart.items.findIndex(
      //     (item) => item.itemId === itemId
      //   );
      //   if (itemIndex > -1) {
      //     // If the item already exists in the cart, update its quantity
      //     const cartItem = cart.items[itemIndex];
      //     cartItem.quantity += quantity;
      //     cart.bill = cart.items.reduce(
      //       (total, item) => total + item.quantity * item.price,
      //       0
      //     );
      //     cart.items[itemIndex] = cartItem;
      //   } else {
      //     // If the item doesn't exist in the cart, add it
      //     cart.items.push({ itemId, name, quantity, price });
      //     cart.bill = cart.items.reduce(
      //       (total, item) => total + item.quantity * item.price,
      //       0
      //     );
      //   }
      //   // Save the updated cart to the database and return it in the response
      //   cart = await cart.save();
      //   return res.status(200).json(cart);
      // } else {
      //   // If the cart doesn't exist for the user, create a new one
      //   const newCart = await Cart.create({
      //     userId: userId,
      //     items: [{ itemId, name, quantity, price }],
      //     bill: quantity * price,
      //   });
      //   console.log(newCart)

        // Return the newly created cart in the response
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
      } catch(err) {
      // Handle any errors that occur during the request
      console.error(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
  ); 

router.delete('/cart', async (req, res) => {
  console.log(req.body);

    try {
      const { userId, itemId } = req.body;
      console.log(req.body);


        // Find the cart for the given user ID
        const cart = await Cart.findOne({ userId });
    // console.log(cart); 
        // Find the index of the item with the given product ID
        const itemIndex  = cart.items.findIndex(item => item.itemId === itemId);
    
        if (itemIndex > -1) {
          // Remove the item and bills from the items array
          let item = cart.items[itemIndex];
          cart.bill -= item.quantity * item.price;
     if(cart.bill < 0) {
           cart.bill = 0
     }
          cart.items.splice(itemIndex, 1);
          cart.bill = cart.items.reduce((acc, curr) => {
     return acc + curr.quantity * curr.price;
     },0)
          // Save the updated cart to the database
          await cart.save();
    
          // Send the updated cart as the response
          res.status(200).send(cart);
        } else {
          // If the item was not found in the cart, send a 404 error response
          res.status(404).send('Item not found in cart');
        }
      } catch (err) {
        // If there was a server error, log the error to the console and send a 500 error response
        console.error(err);
        res.status(500).send('Server Error');
      }
})

//GET USER CART
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ owner: req.params.owner });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router