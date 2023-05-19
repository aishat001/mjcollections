import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./FeaturedProduct.scss"
import useFetch from '../../hooks/useFetch';
import Item from '../Item/Item';

const Featuredproduct = () => {
    const [selected, setselected] = useState("featured");
    const [displayedProducts, setDisplayedProducts] = useState(8);
    const [displayedLatestProducts, setDisplayedLatestProducts] = useState(6);

    const { data, loading, error } = useFetch(`/items`)


    const lists = [
        {
            id: "featured",
            title: "featured"
        },
        {
            id: "latest",
            title: "Latest"
        },
        {
            id: "bestseller",
            title: "BestSeller"
        }
    ]

    const featureImages = [
        "https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRvdGUlMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",

        "https://images.unsplash.com/photo-1610282081854-9c311350beb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHRvdGUlMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRvdGUlMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1621466550398-ac8062907657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dG90ZSUyMGJhZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"

    ]

    const latestItems = data.filter(item => {
        const createdAt = new Date(item.createdAt);
        const now = new Date();
        const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);

        return diffInDays <= 30; // Show items created within the last 30 days
    });
    const displayedItems = data.slice(0, displayedProducts);
    const displayedLatestItems = latestItems.slice(0, displayedLatestProducts);

    const getRandomItems = (items, count) => {
        const startIndex = Math.floor(Math.random() * items.length);
        const endIndex = startIndex + count;
        return items.slice(startIndex, endIndex);
    }

    const randomItem = getRandomItems(data, 1)
    console.log(randomItem)
    return (
        <div className='featured p-5'>
            <div className='banner flex flex-wrap justify-between flex-row gap-3'>
                {
                    featureImages.map((img, index) => (
                        <Link to="/products" key={index}>
                            <img className='h-[300px] w-[100%]'
                                src={img} />

                        </Link>
                    ))
                }

            </div>

            <div className='flex flex-row justify-center gap-5 mt-14'>
                {
                    lists.map((i, index) =>
                        <span key={index} className={`tab pointer ${selected === i.id ? "active" : ""}`} onClick={() => setselected(i.id)}>{i.title}</span>
                    )

                    // lists.map((item) =>  <div key={item.id} className={`${selected === item.id ? "Active" : ""}`} >hhghg{item}</div>)
                }



            </div>

            <div className='min-h-[250px] flex flex-wrap justify-center  gap-5 mt-14'>
                {
                    selected === 'featured' && (
                        loading ? "loading" : displayedItems?.map(item => (
                            <Item item={item} key={item.id} />
                        ))
                    )
                }

                {
                    selected === 'latest' && (
                        loading ? "loading" : displayedLatestItems.map(item => (
                            <Item item={item} key={item.id} />
                        ))
                    )
                }
            </div>

            <div className='py-10 m-auto w-[100%] flex justify-center'>
                <Link to="/products" className='bg-black text-white text-[12px] px-4 py-2'>VIEW MORE</Link>

            </div>


        </div>
    )
}

export default Featuredproduct