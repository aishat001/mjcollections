import { ArrowBack, ArrowForward, ArrowForwardIos, ArrowLeft, ArrowRight } from '@mui/icons-material'
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import "./Slider.scss"

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate()

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1)
    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide === 3 ? 0 : (prev) => prev + 1)
    }

    const data = [
        "https://images.unsplash.com/photo-1618249807726-2f381c277de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxXWkZQNUYzVVYzMHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
        "https://media.istockphoto.com/id/1345809682/photo/young-beautyful-woman-with-linen-eco-bag-on-city-background.jpg?s=612x612&w=0&k=20&c=RZGzFxNfChXa8Zzpi_ecLmzQX9bl6Lky3RDWyp3swvA=",
       "https://images.unsplash.com/photo-1495091932580-1e3d65691a5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwyMDEyOTIxfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
        "https://media.istockphoto.com/id/1400112193/photo/young-model-girl-on-the-street-holding-white-eco-bag-and-mobile-phone-mock-up.jpg?s=612x612&w=0&k=20&c=6E63ZwIL9Bt1nqYZFAPa51Uf3I4vBFMJEeiVqrqw1mY=",

    ]

  return (
    <div className='slider relative overflow-x-hidden'>
        <div className='slider_container w-[400vw] h-[auto] md:h-[100vh] flex' style={{transform: `translateX(-${currentSlide * 100}vw)`}}>
        
        <img src={data[0]} alt="slider" className=''/>
        <img src={data[1]} alt="slider" className=''/>
        <img src={data[2]} alt="slider" className=''/>
        <img src={data[3]} alt="slider" className=''/>
        </div>

        <div className='absolute top-[50%] left-auto right-auto flex justify-center w-[100%]'>
        <button onclick={navigate("/products")} className=' bg-black text-[12px] text-white px-4 py-1 sm:px-7 sm:py-3  md:text-[20px]'>Shop Now</button>

        </div>



        <div className='icons absolute  flex justify-center gap-5 left-[0] right-[0] m-auto top-[70%] md:top-[65%]'>
            <ArrowBack className='icon !w-[28px] !h-[28px] md:!w-[45px] md:!h-[45px] text-white' onClick={prevSlide}/>
            <ArrowForward className='icon !w-[28px] !h-[28px] md:!w-[45px] md:!h-[45px] text-white' onClick={nextSlide}/>
        </div>
    </div>
  )
}

export default Slider