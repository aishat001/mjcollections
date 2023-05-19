import { Balance, Compare, Favorite, HeartBroken } from '@mui/icons-material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Tab from '../../components/Tab/Tab';
import useFetch from '../../hooks/useFetch';
import { addCart } from '../../redux/apiCalls';
import { addItem } from '../../redux/cartReducer';

const Product = () => {
  const id = useParams().id;
  const [selectedImage, setSelectedImage] = useState("");
  const [selected, setselected] = useState("description");
  const [quantity, setQuantity] = useState(1);
  // const user = useSelector((state) => state.user.currentUser.user)

  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/items/${id}`);

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
  ];

  const handleClick = () => {
    dispatch(addItem({
      itemId: data._id,
      // userId: user._id,
      name: data.name,
      description: data.description,
      price: data.price,
      img: data.img,
      quantity,
    }));

    console.log(data);
  };

  return (
    <div className='container m-auto mt-28 mb-10'>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className='flex flex-col md:flex-row justify-center gap-10 my-16 px-5 sm:px-5'>
            <div className='left flex flex-col-reverse sm:flex-row-reverse sm:justify-end md:flex-row justify gap-8'>
              <div className='images w-[90vw] h-[70px] sm:w-[70px] flex flex-row md:flex-col gap-3  md:m-0'>
                <img src={data.img} onClick={() => setSelectedImage(`${data.img}`)} height="70px" width="70px" className='bg-[#f0f0f0] rounded-[15px] p-2'/>
                {/* <img src="" onClick={() => setSelectedImage("img2")} height="70px" width="70px" /> */}
              </div>
              <div className='w-[280px]  md:w-[350px] lg:w-[400px]  flex  md:m-[unset]'>
                <img src={data.img} alt="" height="100%" width="100%" className='h-[300px] md:h-[400px] m-auto bg-[#f0f0f0] rounded-[15px] p-2' />
              </div>
            </div>

            <div className='right m-auto md:ml-0 w-[90vw] md:w-[330px] flex flex-col gap-6 items-start'>
              <h2 className='text-4xl'>{data.name}</h2>
              <span className='inline-flex items'><p>Details:</p> <p className='text-lg ml-5'>{data.description}</p></span>
              <h2 className='text-[26px] font-[500]'>₦{data.price}</h2>

              <div className="addtoCart flex ">
                <span className='w-[50px] h-[50px] text-3xl text-center' onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}>-</span>
                <input type="number" className='w-[50px] h-[50px] border text-center' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <span className='w-[50px] h-[50px] text-3xl text-center' onClick={() => setQuantity(quantity + 1)}>+</span>
              </div>

<div className='flex flex-row gap-5'>
<button
                className='bg text-black w-max py-2 px-3 border border-black'
                onClick={handleClick}
              >ADD TO CART</button>               <button className='bg-black text-white w-max py-2 px-3'>Buy now</button>

</div>

      

              <div className='flex gap-3 mt-4'>
                <button className=''><Favorite /> ADD TO WISHLIST</button>
                <button><Balance /> ADD TO COMPARE</button>
              </div>

            </div>
          </div>

          {/* <div>
            <div className='flex justify-center gap-10 md:gap-16'>
              {lists.map(i => (
                <span
                  key={i.id}
                  className={`tab text-base md:text-2xl border-b-4 border-solid border-[#00000033] pb-1 pointer ${selected === i.id ? "active" : ""}`}
                  onClick={() => setselected(i.id)}
                >
                  {i.title}
                </span>
              ))}
            </div>

            <div className='md:ml-[100px] py-8 px-5'>
              <p className='text-lg'>{data.description}</p>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Product;
