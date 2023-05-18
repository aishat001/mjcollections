import { Balance, Compare, Favorite, HeartBroken } from '@mui/icons-material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Tab from '../../components/Tab/Tab';
import useFetch from '../../hooks/useFetch';
import { addCart } from '../../redux/apiCalls';
import { addItem } from '../../redux/cartReducer';

const Product = () => {
    const id = useParams().id
    const [selectedImage, setSelectedImage] = useState("");
    const [selected, setselected] = useState("description");
    const [quantity, setQuantity] = useState(1);
    // const user = useSelector((state) => state.user.currentUser.user)

    const dispatch = useDispatch()
    const { data, loading, error } = useFetch(`/items/${id}`)


    const lists = [
        {
            id: "description",
            title: "Description"
        },
        {
            id: "shipping",
            title: "Shipping"
        },
        {
            id: "review",
            title: "Review"
        }
    ]
    const handleClick = () => {
        dispatch(addItem({
            itemId: data._id,
            // userId: user._id,
            name: data.name,
            description: data.description,
            price: data.price,
            img: data.img,
            quantity,
        })
        )

        // addCart(dispatch,   {    itemId: data._id,
        //     // userId: user._id,
        //     name: data.name,
        //     description: data.description,
        //     price: data.price,
        //     img: data.img,
        //     quantity,}
        
        
        // )

        // dispatch(addProduct({
        //     id: data._id,
        //     user: user._id,
        //     name: data.name,
        //     description: data.description,
        //     price: data.price,
        //     quantity,
        // }))

        console.log(data)
    }


    return (
        <div className='container m-auto'>
            {
                loading ?
                    "loading"
                    :
                    <>
                        <div className=' flex flex-col md:flex-row justify-center gap-10 my-16'>
                            <div className='left flex-1 flex flex-col-reverse md:flex-row justify-end  gap-8'>
                                <div className='images w-[90vw] md:w-[70px] flex flex-row md:flex-col gap-3 m-auto md:m-0'>
                                    <img src={data.img} onClick={() => setSelectedImage(`${data.img}`)} height="70px" width="70px" />
                                    <img src="" onClick={() => setSelectedImage("img2")} height="70px" width="70px" />

                                </div>
                                <div className='w-[90vw] md:w-[30vw] lg:w-[20vw] h-[370px] flex m-auto md:m-[unset]'>
                                    <img src={selectedImage} alt="" height="100%" width="100%" className='!h-[365px] m-auto ' />
                                </div>
                            </div>

                            <div className='right flex-1 m-auto md:ml-0 w-[90vw] md:w-[330px] flex flex-col gap-5'>
                                <h2 className='text-5xl'>{data.name}</h2>
                                <h2 className='text-3xl font-[500]'>{data.price}</h2>

                                <div className="addtoCart flex ">
                                    <span className='w-[50px] h-[50px] text-3xl text-center' onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}>-</span>
                                    <input type="number" className='w-[50px] h-[50px] border text-center' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    <span className='w-[50px] h-[50px] text-3xl text-center' onClick={() => setQuantity(quantity + 1)}>+</span>
                                </div>

                                <button className='bg-black text-white w-max py-2 px-3'
                                    onClick={handleClick}
                                >ADD TO CART</button>

                                <div className='flex gap-3 mt-4'>
                                    <button className=''><Favorite /> ADD TO WISHLIST</button>
                                    <button><Balance /> ADD TO COMPARE</button>

                                </div>

                                <button className='bg-black text-white w-max py-2 px-3'>CONTACT SELLER</button>



                            </div>

                        </div>

                        <div>
                            <div className=' flex justify-center gap-10 md:gap-16'>
                                {
                                    lists.map(i =>
                                        <span key={i.id} className={`tab text-base md:text-2xl border-b-4 border-solid border-[#00000033] pb-1 pointer ${selected === i.id ? "active" : ""}`} onClick={() => setselected(i.id)}>{i.title}</span>
                                    )

                                }
                            </div>

                            <div className='md:ml-[100px] py-8 px-5'>

                                <p className='text-lg'>{data.description}</p>)

                            </div>


                        </div>

                    </>
            }



        </div>
    )
}

export default Product