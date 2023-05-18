import { Cancel, Delete } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, resetCart } from '../../redux/cartReducer'
import { loadStripe } from '@stripe/stripe-js';
import {  publicRequest, userRequest } from '../../makeRequest';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

const Cart = ({open, setOpen}) => {
    const cart = useSelector(state => state.cart)
    const items = cart.items.map(item => item.price);

console.log(cart);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const totalPrice = () => {
        let total = 0;
        cart.items.map(item => {
            total += item.price * item.quantity
        }
        )

        return total.toFixed(2)
    }



console.log(cart);

    return (
        <>
            <div className='w-[100vw]  h-[100vh]  flex flex-col gap-5 absolute top-[0] bg-white z-40'>
                <h2 className='text-3xl bg-black w-[100vw] p-3 text-white flex justify-between items-center'>Shopping cart  <Cancel className=' text-[30px]' onClick={() => setOpen(!open)}/></h2>
              
              <div className=''>
                {
                    cart?.items?.length === 0 && (

                        <>
                                                <div className='text-center text-[20px] my-20'>your cart is empty</div>

                        <button className='bg-black text-white py-2 px-3 flex justify-center m-auto mt-10' onClick={() => navigate(-1)} >Continue Shopping</button>

                        </>


                    )
                }
</div>

                {
                    cart?.items?.length > 0 && (
                        <>
                            <div className='flex flex-col gap-5 px-5'>
                                {
                                    cart.items.map(item => (
                                        <div className='flex gap-3 items-center' key={item.id}>
                                            <div className='image w-[80px] h-[100px]'>
                                                <img src={item.img} alt className='w-[100%] h-[100%]' />
                                            </div>

                                            <div className='desc flex flex-col justify-between gap-4'>
                                                <h3>{item.name}</h3>
                                                {/* <p>{item.description}</p> */}
                                                <p>{item.quantity} * {item.price}</p>
                                            </div>

                                            <div className='ml-auto' onClick={() => dispatch(removeItem(item.itemId))}>
                                                <Delete className='text-[red]' />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='fixed bottom-[0] w-[100vw] gap-5 flex flex-col'>
                            <div className='flex flex-row justify-between mt-20 px-10'>
                                <h3 className='text-xl font-[500]'>SUBTOTAL</h3>
                                <h3 className='text-xl font-[500]'>${totalPrice()}</h3>
                            </div>

                            <div className='px-5 flex justify-between bottom-[0] relative'>
                            <button className='bg-black text-white py-2 px-3' onClick={navigate(-1)} >Continue Shopping</button>

                                <Link to="/checkout" className='bg-black text-white py-2 px-3'
                                >
                                   CHECKOUT
                                 </Link>
                                
                            </div>

                            <button className='text-[red] mr-auto px-10' onClick={() => dispatch(resetCart())}>RESET CART</button>
                            </div>
                        </>
                    )

                }

            </div>


        </>
    )
}

export default Cart