import { Facebook, Instagram, Twitter, WhatsApp, YouTube } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-black text-white text-sm py-5 flex flex-col gap-8 items-center w-[100vw] relative bottom-[0] border-1'>
            <div className='socials flex gap-5'>
                <Link to=""><Facebook/></Link>
                <Link to=""><Twitter/></Link>
                <Link to=""><Instagram/></Link>
                <Link to=""><YouTube/></Link>
                <Link to=""><WhatsApp/></Link>
     
            </div>

            <div className='flex flex-wrap justify-start md:justify-evenly w-[100%]'>
                <div className='flex flex-col p-3'>
                    <h2 className='font-bold'>Information</h2>
                    <ul>
                        <li><Link to="">About Us</Link></li>
                        <li><Link to="">Delivery Information</Link></li>
                        <li><Link to="">Exchange Policy</Link></li>
                        <li><Link to="">Private Policy</Link></li>
                        <li><Link to="">Terms & Conditions</Link></li>

                    </ul>
                </div>

                <div className='flex flex-col p-3'>
                    <h2 className='font-bold'>Information</h2>
                    <ul>
                        <li><Link to="">About Us</Link></li>
                        <li><Link to="">Delivery Information</Link></li>
                        <li><Link to="">Exchange Policy</Link></li>
                        <li><Link to="">Private Policy</Link></li>
                        <li><Link to="">Terms & Conditions</Link></li>

                    </ul>
                </div>
                <div className='flex flex-col p-3'>
                    <h2 className='font-bold'>About</h2>
                   <p className='max-w-[300px]'>
                   Phosfluorescently reintermediate
                    competitive e-business vis-a-vis
                     integrated ideas. Appropriately
                      leverage existing collaborative
                   </p>
                </div>

                <div className='flex flex-col p-3'>
                    <h2 className='font-bold'>Contact</h2>
                    <p className='max-w-[300px]'>
                    Phosfluorescently reintermediate
                    competitive e-business vis-a-vis
                     integrated ideas. Appropriately
                      leverage existing collaborative
          
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