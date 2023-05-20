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
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY
  );


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
      <div className="checkout w-[100vw]    flex flex-col gap-5 absolute top-[0] bg-white z-40 pb-28">
        <h2 className="fixed text-3xl bg-black w-[100vw] p-3 text-white flex justify-between items-center">
          Checkout
        </h2>

        <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-0 px-10 pt-[80px]">
          <div className="flex-1 py-5 pr-10 border-r-2 ">
            {!user && (
              <div className="flex flex-col gap-5 mb-5">
                <button
                  className="border border-1 border-black text-black py-2 px-3 max-w-[max-content]"
                  onClick={handleNavigation}
                >
                  <ArrowLeft /> Back
                </button>
                <div className="w-[100%] inline-flex gap-4">
                  <p>Already has an account? </p>
                  <Link to="/login" className="text-blue underline">
                    Login
                  </Link>
                </div>
              </div>
            )}

            {user ? (
              <div className='flex gap-5 flex-col'>
                <h2 className="font-bold bold ">Contact Information</h2>
                <div className=''> <p className='capitalize'>{user.name}</p> ({user.email})</div>
                <h2 className="font-bold bold">Shipping Information</h2>
                <input
                className='focus:outline-none focus:ring-2 focus:ring-black'
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleFormChange}
                />
                <div className="flex gap-4 w-[100%]">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleFormChange}
                    className='focus:outline-none focus:ring-2 focus:ring-black'
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleFormChange}
                    className='focus:outline-none focus:ring-2 focus:ring-black'
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleFormChange}
                    className='focus:outline-none focus:ring-2 focus:ring-black'
                  />
                </div>
              </div>
            ) : (
              <div className="flex gap-5 flex-wrap">
                <h2 className="font-bold bold">Contact Information</h2>
                <div className="flex gap-4 w-[100%]">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleFormChange}
                    className='focus:outline-none focus:ring-2 focus:ring-black'
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNo"
                    value={formData.phoneNo || ''}
                    onChange={handleFormChange}
                    className='focus:outline-none focus:ring-2 focus:ring-black'
                  />
                </div>
                {errors.name && <span className="text-red-500">{errors.name}</span>}
                {errors.phoneNo && <span className="text-red-500">{errors.phoneNo}</span>}
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleFormChange}
                  className='focus:outline-none focus:ring-2 focus:ring-black'
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
                <h2 className="font-bold bold">Shipping Information</h2>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleFormChange}
                  className='focus:outline-none focus:ring-2 focus:ring-black'
                />
                <div className="flex gap-4 w-[100%]">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleFormChange}
                    className='focus:outline-none focus:ring-2 focus:ring-black'
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleFormChange}
                    className='focus:outline-none focus:ring-2 focus:ring-black'
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleFormChange}
                    className='focus:outline-none focus:ring-2 focus:ring-black'
                  />
                </div>
              </div>
            )}

            <div className="mt-5 flex justify-between bottom-[0] relative bg-white">
              <button
                className="w-[100%] bg-black text-center text-white py-2 px-3"
                onClick={handlePayment}
              >
                Make Payment
              </button>
            </div>
          </div>

          <div className="flex-1 md:w-[50%] md:px-14">
            {cart?.items?.length > 0 && (
              <div className="h-[100%]">
                <div className="h-[300px] overflow-y-scroll">
                  <div className="flex flex-col gap-5 pt-[70px] pb-[50px] px-5 h-[auto]">
                    {cart.items.map((item) => (
                      <div className="flex gap-3 items-center pb-2" key={item.id}>
                        <div className="image w-[80px]">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-[50px] h-[50px] bg-[#f0f0f0] rounded-[15px] p-2"
                          />
                        </div>
                        <div className="desc flex flex-col justify-between gap-2">
                          <p className="text-base">{item.name}</p>
                          <p>
                            {item.quantity} * ₦ {item.price}
                          </p>
                        </div>
                        <div className="ml-auto" onClick={() => dispatch(removeItem(item.itemId))}>
                          <Delete className="text-[red]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="gap-5 flex flex-col bg-white py-5 px-5">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-[500]">SUBTOTAL</h3>
                    <h3 className="text-xl font-[500]">₦ {totalPrice()}</h3>
                  </div>
                  <div className="flex flex-row justify-between border-b pb-2">
                    <h3 className="text-xl font-[500]">Estimated Delivery</h3>
                    <h3 className="text-xl font-[500]">₦ Free</h3>
                  </div>
                  <div className="flex flex-row justify-between border-b pb-2">
                    <h3 className="text-xl font-[500]">Total</h3>
                    <h3 className="text-xl font-[500]">₦ {totalPrice()}</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
