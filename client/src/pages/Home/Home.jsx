import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import Categories from '../../components/Categories/Categories'
import Featuredproduct from '../../components/FeaturedProduct/Featuredproduct'
import Slider from '../../components/Slider/Slider'
import { useSelector } from 'react-redux'

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/items')
           .then(res => {
             console.log(res);

           })
           .catch(err => console.log(err))
     
   
 }, []);

 const userr = useSelector(state => state.user.currentUser)
const user = userr?.user

  console.log(userr ? userr : user)

  return (
    <div className=''>
      <Slider />
      <Featuredproduct />
    </div>
  )
}

export default Home