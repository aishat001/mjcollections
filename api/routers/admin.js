const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const User = require('../models/user');
const Order = require('../models/order');

// Get all users
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all orders
router.get('/orders', auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('owner', '-password');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;