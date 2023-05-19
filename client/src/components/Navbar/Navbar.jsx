import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import  { AccountCircle, ArrowDropDown, Close, Menu, Public, Search, ShoppingCart }  from "@mui/icons-material"
import Cart from '../../pages/Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer';

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);
    const [onClickProfile, setOnclickProfile] = useState(false);

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const items = useSelector(state => state.cart.items)
    console.log(items);
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user.currentUser?.user)


    if(open === true) {
        document.body.style.overflow = "hidden"
      }  else {
        document.body.style.overflow = "auto"
    
      }

  return (
    <div className='navbar w-[100vw] h-[50px]  fixed z-10 bg-white top-[0] border-bottom-[inset]'>
        <div className='container flex flex-row justify-between m-auto w-[90%] h-[100%] items-center'>
        <Link to='/' className='logo'>
            <img src="/logo.jpeg" alt="logo" height="100px" width="80px"
            />
        </Link>

        <div className='hidden lg:inline-flex gap-5'>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
        </div>

        <div className='flex lg:hidden ml-auto pr-5' onClick={() => setOpenNav(true)}>
        <Menu/>
        </div>


        {
            openNav === true && (
                <>
                <div className='z-10 flex flex-col fixed p-10  w-[70vw] h-[100vh] top-[0] left-[0] bg-[black] text-[white] gap-5'>
                <Close className='relative -top-[30px] -left-[30px]' onClick={() => setOpenNav(false)}/>
                <Link to="/" onClick={() => setOpenNav(false)}>Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                {
                    user ?
                    <button onClick={() => dispatch(logout())}>Logout</button>
                    :
                    <Link to="/login">Login/Register</Link>
                }


            </div>
            <div className='absolute w-[100vw] h-[100vh] bg-[#00000096] z-1 top-[0] left-[0]'></div>

            </>
            )
        }

        <div className='inline-flex  gap-5'>
            <span className='hidden lg:flex'>NGN <ArrowDropDown/> </span>
            <span className='hidden md:flex' onClick={() => setOnclickProfile(!onClickProfile)}><AccountCircle /></span>

            {
                onClickProfile && ( 
                    <div className='absolute top-5 p-5 bg-white mt-5 py-3 border rounded border-color-[black]'>
                                    {
                    user ?
                    <button onClick={() => dispatch(logout())}>Logout</button>
                    :
                    <Link to="/login">Login/Register</Link>
                }
                    </div>
                )
            }
            

            <Link to="/cart" className='relative' ><ShoppingCart/> 
            <span className='absolute h-[25px] w-[20px] rounded-[100%] text-black text-center -top-3 left-4'>{items.length}</span>
            </Link>

            <Search/>
        </div>
        </div>

        {
            open === true && 
                <div className='flex justify-center'><Cart open={open} setOpen={setOpen}/></div>
            
        }
    </div>
  )
}

export default Navbar