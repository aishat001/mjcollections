import React, { useEffect } from 'react';
import { ArrowLeft, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userReducer';
import { useState } from 'react';
import { publicRequest, userRequest } from '../../makeRequest';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import { v4 as uuidv4 } from 'uuid';
import './Checkout.scss';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser?.user);
  const items = cart.items.map((item) => item.price);
  const [formData, setFormData] = useState(user || {});
  const [errors, setErrors] = useState({});


  let cartt = [{ cart: cart }];

  const generateId = () => {
    const uniqueId = uuidv4();
    // Use the uniqueId as needed
    return uniqueId;
  };

  cartt.push({ cartUser: formData });

  console.log(formData);

  if (!user) {
    formData.id = generateId();
  } else {
    formData.id = user._id;
  }

  const handleNavigation = () => {
    navigate(-1);
  };

  const handleFormChange = (e) => {
    // Add the ID to the form data
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.phoneNo) {
      newErrors.phoneNo = 'Phone number is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const totalPrice = () => {
    let total = 0;
    cart.items.map((item) => {
      total += item.price * item.quantity;
    });

    return total.toFixed(2);
  };

  const handlePayment = async () => {
    try {
      const isValid = validateForm();

      if (!isValid) {
        return;
      }

      const stripe = await stripePromise;

      const res = await publicRequest.post('/checkout', {
        cartt, // Make sure to pass the correct cart object
      });

      const session = res.data;

      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="checkout w-[100vw] flex flex-col gap-5 absolute top-[0] bg-white z-50 h-[100vh] px-7 py-5">
      <div className="flex justify-between items-center">
        <Link to="/cart" className="flex items-center cursor-pointer">
          <ArrowLeft className="mr-2" /> Continue Shopping
        </Link>
        <Delete className="cursor-pointer" onClick={handleNavigation} />
      </div>

      <h2 className="font-bold bold text-2xl mb-2" data-aos="fade-up">
        Contact Information
      </h2>

      <div className="flex gap-5" data-aos="fade-up" data-aos-duration="800">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name || ''}
            onChange={handleFormChange}
            className={`w-full border p-2 focus:outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNo"
            value={formData.phoneNo || ''}
            onChange={handleFormChange}
            className={`w-full border p-2 focus:outline-none ${
              errors.phoneNo ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phoneNo && <p className="text-red-500 text-sm">{errors.phoneNo}</p>}
        </div>
      </div>

      <h2 className="font-bold bold text-2xl mt-8 mb-2" data-aos="fade-up">
        Shipping Address
      </h2>

      <div className="flex gap-5" data-aos="fade-up" data-aos-duration="800">
        <div className="w-1/2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email || ''}
            onChange={handleFormChange}
            className={`w-full border p-2 focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address || ''}
            onChange={handleFormChange}
            className={`w-full border p-2 focus:outline-none ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
      </div>

      <div className="flex gap-5" data-aos="fade-up" data-aos-duration="800">
        <div className="w-1/3">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city || ''}
            onChange={handleFormChange}
            className={`w-full border p-2 focus:outline-none ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <div className="w-1/3">
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country || ''}
            onChange={handleFormChange}
            className={`w-full border p-2 focus:outline-none ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>
        <div className="w-1/3">
          <input
            type="text"
            placeholder="State"
            name="state"
            value={formData.state || ''}
            onChange={handleFormChange}
            className={`w-full border p-2 focus:outline-none ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>
      </div>

      <h2 className="font-bold bold text-2xl mt-8 mb-2" data-aos="fade-up">
        Order Summary
      </h2>

      <div className="flex justify-between items-center" >
        <div className="flex items-center gap-2">
          <h3 className="font-bold">{cart.items.length} Items</h3>
          <span className="text-gray-500">- {totalPrice()} NGN</span>
        </div>
        <h3 className="font-bold">{totalPrice()} NGN</h3>
      </div>

      <div className="flex justify-center mb-10" >
  
          <button className="button-primary  bg-black text-white mt-8 py-2 px-3"
            onClick={handlePayment}
            >Proceed to Payment</button>
      </div>
    </div>
  </>
  );
};

export default Checkout;







{/* <div className="mt-5 flex justify-between bottom-[0] relative bg-white">
<button
  className="w-[100%] bg-black text-center text-white py-2 px-3"
  onClick={handlePayment}
>
  Make Payment
</button>
</div> */}