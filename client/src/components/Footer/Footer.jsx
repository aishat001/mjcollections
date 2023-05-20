import { Facebook, Instagram, Twitter, WhatsApp, YouTube } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-black text-white text-sm py-5 flex flex-col gap-8 items-center w-[100vw] relative bottom-[0] border-1 px-5'>
            <div className='socials flex gap-5 justify-start md:justify-center w-[100%] '>
                <Link to=""><Facebook/></Link>
                <Link to=""><Twitter/></Link>
                <Link to=""><Instagram/></Link>
                <Link to=""><YouTube/></Link>
                <Link to=""><WhatsApp/></Link>
     
            </div>

            <div className='flex flex-wrap justify-start md:justify-evenly gap-5  w-[100%]'>
                <div className='flex flex-col '>
                    <h2 className='font-bold'>Information</h2>
                    <ul>
                        <li><Link to="">About Us</Link></li>
                        <li><Link to="">Delivery Information</Link></li>
                        <li><Link to="">Exchange Policy</Link></li>
                        <li><Link to="">Private Policy</Link></li>
                        <li><Link to="">Terms & Conditions</Link></li>

                    </ul>
                </div>

                <div className='flex flex-col'>
                    <h2 className='font-bold'>Information</h2>
                    <ul>
                        <li><Link to="">About Us</Link></li>
                        <li><Link to="">Delivery Information</Link></li>
                        <li><Link to="">Exchange Policy</Link></li>
                        <li><Link to="">Private Policy</Link></li>
                        <li><Link to="">Terms & Conditions</Link></li>

                    </ul>
                </div>
                <div className='flex flex-col '>
                    <h2 className='font-bold'>About</h2>
                   <p className='max-w-[200px]'>
                   At MJCollections, we take pride in curating the 
                   finest collection of totes and backpacks that
                    perfectly blend style, functionality, and quality.
                   </p>
                </div>

                <div className='flex flex-col'>
                    <h2 className='font-bold'>Contact</h2>
                    <p className='max-w-[300px]'>
                    OKe Ilewo, <br/>
                    Abeokuta, Nigeria.<br/>

                    Call us on : <a href="tel:+2348140308878">+2348140308878</a>
                    </p>
                </div>


            </div>

            <div className='text-center py-5 text-[12px]'>
                <h2>MJCOLLECTIONS©, 2023. All Rights Reserved</h2>

            </div>
        </div>
    )
}

export default Footer