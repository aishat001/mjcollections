import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {  userRequest } from '../../makeRequest';

const Register = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate() 

    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
      }

      const handleFormSubmit =  (e) => {
        e.preventDefault()

             axios.post("http://localhost:3000/register", formData)   
            .then((response) => {
                console.log(response.data);
                // Handle successful registration
              })
              .catch((error) => {
                console.error(error);
                // Handle error during registration
              });
  

      }

const handleLogout = async () => {
    try {
         await userRequest.post("/users/logout")   
        localStorage.removeItem('token');
        navigate.push('/');

    } catch (error) {
        console.log(error, 'dsffadas')
    }

}



    return (
        <>
        <form onSubmit={handleFormSubmit} className="p-10 m-10">

            <div className=''>
                <label>Full Name</label>
                <input name="name" type="text" onChange={handleFormChange}/>
            </div>

            <div className=''>
                <label>Email</label>
                <input name="email" type="email" onChange={handleFormChange}/>
            </div>

            <div className=''>
                <label>Phone Number</label>
                <input name="phoneNo" type="phone" onChange={handleFormChange}/>
            </div>

            <div className=''>
                <label>Password</label>
                <input name="passwword" type="password" onChange={handleFormChange}/>
            </div>

            <button type='submit'>Create Account</button>

        </form>

        <button onClick={handleLogout}>logout</button>
        </>
    )
}

export default Register