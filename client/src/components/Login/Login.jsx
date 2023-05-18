import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../redux/apiCalls';

const Login = () => {
    const [formData, setFormData] = useState({});
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);


    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
      }

  const handleClick = (e) => {
    e.preventDefault();
    try {
        login(dispatch, formData);
    } catch (err) {
        console.log(err, error)
    }
  };


    return (
        <>
        <form onSubmit={handleClick} className="p-10 m-10">

            <div className=''>
                <label>Email</label>
                <input name="email" type="email" onChange={handleFormChange}/>
            </div>

            <div className=''>
                <label>Password</label>
                <input name="password" type="password" onChange={handleFormChange}/>
            </div>

            <button type='submit' enabled={isFetching}>log in</button>

        </form>

        </>
    )
}

export default Login