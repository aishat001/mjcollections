import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Categories from '../../components/Categories/Categories';
import Featuredproduct from '../../components/FeaturedProduct/Featuredproduct';
import Slider from '../../components/Slider/Slider';
import { useSelector } from 'react-redux';
import './Home.scss';
import 'animate.css';


const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/items')
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  const userr = useSelector(state => state.user.currentUser);
  const user = userr?.user;

  console.log(userr ? userr : user);

  return (
    <div className='animate__animated animate__fadeIn'>
      {/* <Slider /> */}
      <div className='w-[100%] h-[100vh]  bg-no-repeat bg-[whitesmoke] pl-5 sm:pl-[86px] flex flex-col-reverse sm:flex-row'>
        <div className='flex flex-col h-[100%] w-[50%] justify-center gap-5'>
          <h1 className='text-4xl sm:text-[4.5rem] leading-none w-[300px] animate__animated animate__bounce'>
            New collections are Now Available!!
          </h1>
          <button className='bg-black text-[12px] text-white px-4 py-1 sm:px-7 sm:py-3 md:text-[20px] w-[max-content] animate__animated animate__fadeInLeft'>
            Shop Now
          </button>
        </div>
        <div className='bg-black relative ml-auto w-[40%] h-[100%] flex items-center image-containe animate__animated animate__fadeInRight'>
          <img src='/tote.png' alt='tote.png' className='w-[300px] h-[300px] relative left-[-120px]' />
        </div>
      </div>

      <Featuredproduct />
    </div>
  );
};

export default Home;
