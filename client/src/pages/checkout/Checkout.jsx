import { Delete } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, unstable_HistoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userReducer';
import { useState } from 'react';
import { publicRequest, userRequest } from '../../makeRequest';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import { v4 as uuidv4 } from 'uuid';




const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const stripePromise = loadStripe("pk_test_51MaruBCQzbP9V7n83HEZkZvc9p0J9PJLD2NdVhpKgWrPisFEGrie92NZ4Niwkak18Igfu7z3TaNs3Ngii0y5hSwz00RWCCMXuI")

    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user.currentUser?.user)
    const items = cart.items.map(item => item.price);
    const [formData, setFormData] = useState(user || {});
let cartt = [{cart : cart}]
const generateId = () => {
    const uniqueId = uuidv4();
    // Use the uniqueId as needed
    return uniqueId;
  }
  cartt.push({cartUser : formData})

  console.log(formData);

if (!user) {
    formData.id = generateId()

} else {
    formData.id = user.id

}
// console.log(formdata.id);





    const handleFormChange = (e) => {
  
        // Add the ID to the form data
        const { name, value } = e.target;
        setFormData((formData) => ({
          ...formData,
          [name]: value,
        }));
    };

    const totalPrice = () => {
        let total = 0;
        cart.items.map(item => {
            total += item.price * item.quantity
        }
        )

        return total.toFixed(2)
    }


  
    const handlePayment = async () => {
        try {

            // await publicRequest.get("/cart")
          const stripe = await stripePromise;
      
          const res = await publicRequest.post("/checkout", {
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
            <div className='w-[100vw]  h-[100vh]  flex flex-col gap-5 absolute top-[0] bg-white z-40'>
                <h2 className='text-3xl bg-black w-[100vw] p-3 text-white flex justify-between items-center'>Checkout </h2>

                <div>
                    <div>Checkout</div>

                    {
                        !user && (
                            <>
                                <p>Already has an account? </p>
                                <Link to='/login'>login</Link>
                            </>
                        )
                    }



                    <h2>Contact Information</h2>

                    {
                        user ? (
                            <>
                                <div>{user.name} ({user.email})</div>

                                <h2>Shipping Infomation</h2>
                                <input type='text' placeholder='Address' name='name' onChange={handleFormChange} />
                                <input type='text' placeholder='Address' />
                                <input type='text' placeholder='Country' />
                                <input type='text' placeholder='state' />
                            </>
                        )
                            :
                            <>
                                <input type='text'  placeholder={`${"name"}`} name='name' onChange={handleFormChange} />
                                <input type='text'  placeholder='Email' name='phoneNo' onChange={handleFormChange} />
                                <input type='email'  placeholder='Email' name='email' onChange={handleFormChange} />

                                <h2>Shipping Infomation</h2>
                                <input type='text' placeholder='Address' name='address' onChange={handleFormChange} />
                                <input type='text' placeholder='City' name='city' onChange={handleFormChange} />
                                <input type='text' placeholder='Country' name='country' onChange={handleFormChange} />
                                <input type='text' placeholder='state' name='state' onChange={handleFormChange} /></>
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
                                    <button className='bg-black text-white py-2 px-3'
                                        onClick={() => navigate(-1)}
                                    >Return to cart</button>

                                    <button className='bg-black text-white py-2 px-3'
                                        onClick={handlePayment}
                                    >
                                        CHECKOUT
                                    </button>

                                </div>
                            </div>
                        </>
                    )

                }
            </div>


            <>

    </>

        </>
    )
}

export default Checkout