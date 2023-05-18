const Cart = require("../models/cart");

const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);


router.post('/', async (req, res) => {

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: 'customer@example.com',
      submit_type: 'donate',
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
  
    res.redirect(303, session.url);
  } catch (error) {
    
  }

});


router.post('/api/charge', async (req, res) => {
  try {
    const { amount, currency, token } = req.body;

    const charge = await stripe.charges.create({
      amount,
      currency,
      source: token.id,
    });

    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err });
  }
});

router.post("/checkout", async (req, res) => {
  // const cart = await Cart.find({});
  console.log(req.body.cartt);

  const { cart } = req.body.cartt[0];
  const {cartUser} = req.body.cartt[1]
  let user = cartUser
  const items = cart.items

  let lineItems = []; 


  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const lineItem = {
      price_data: {
        currency: "ngn",
        product_data: {
          name: item.name,
          images: [item.img],
        },
        unit_amount: Math.round(item.price * 100),
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
      id: item.id,
      quantity: item.quantity,
    };

    lineItems.push(lineItem);
  }

  try {
    // const customer = await stripe.customers.create({
    //   email: user.email,
    //   name: user.name,
    //   phone: user.phoneNo,
    //   description: "User Account Created",
    // });
 
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      submit_type: "pay",
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // billing_address_collection: auto,
      // shipping_options: [{ shipping_rate: "shr_1MrmQlSIAuiZ4gmylVIIdf7j" }],
      success_url: `${process.env.CLIENT_URL}/success/${user.id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      client_reference_id: user.id,

    });

    res.status(200).json({ id: session.id });
    console.log("success");
  } catch (error) {
    res.status(401).send(console.log(error, "chai"));
  }
});

module.exports = router;