const express = require("express")
const Flutterwave = require("flutterwave-node-v3")
const Order = require("../models/order")
const auth = require("../middleware/auth")
const { verifyTokenAndAuthorization } = require("./verifyToken")
const stripe = require("stripe")(process.env.STRIPE_KEY);


const router = new express.Router()


const flw = new Flutterwave(process.env.FLUTTERWAVE_V3_PUBLIC_KEY, process.env.FLUTTERWAVE_V3_SECRET_KEY, { encryption: false }, process.env.FLUTTERWAVE_ENCRYPTION_KEY)
/* 
commenting that out till I find a fix for flutterwave public key required error
*/

//get orders 

router.get('/orders', async (req, res) => {
  // const owner = req.user._id;
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
    // const order = await Order.find({ owner: owner }).sort({ date: -1 });
    // if (order) {
    //   return res.status(200).send(order)
    // }
    // res.status(404).send('No orders found')
  } catch (error) {
    res.status(500).send()
  }
})
//CREATE


router.post("/orders", async (req, res) => {
  const newOrder = new Order(req.body);
  console.log(newOrder);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:id", auth, async (req, res) => {
  try {
    const orders = await Order.find({ owner: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router
