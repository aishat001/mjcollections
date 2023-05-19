import React from 'react'
import { Link } from 'react-router-dom'
import "./Item.scss"

const Item = ({ item }) => {

    return (

        <Link to={`/products/${item._id}`}>
            <div className='card h-[] w-[130px] flex gap-1 flex-col'>
                <div className='img'>
                    {/* {
                item?.attributes.isNew && <span>New Design</span>
            } */}
                    <img src={item.img} alt="" className='mainimg bg-[#f0f0f0] rounded-[15px] p-2' />
                    {/* <img src="" alt="" className='secondimg' /> */}

                </div>
                <p className='text-base m-0 capitalize'>{item.name}</p>
                <div className='flex gap-5 '>
                    {/* <span className='text-[12px] text-md m-0 font-bold line-through text-[grey]'> <p className='text-[.95em]'>₦</p>
                        <p className='text-[1.7em]'>{item.oldPrice || item.price + 20}</p></span> */}
                    <span className='text-[12px] text-md font-bold inline-flex'>
                        <p className='text-[.95em] pt-[3px]'>₦</p>
                        <p className='text-[1.7em]'>{item.price}</p></span>
                </div>
            </div>
        </Link>

    )
}

export default Item