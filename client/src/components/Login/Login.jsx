import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { useNavigate } from 'react-router';

const Login = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isFetching, error } = useSelector((state) => state.user);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    try {
      login(dispatch, formData);

      navigate("/")
    } catch (err) {
      console.log(err, error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleClick} className="p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
            id="email"
            name="email"
            type="email"
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            id="password"
            name="password"
            type="password"
            onChange={handleFormChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isFetching}
          className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-600 focus:outline-none focus:bg-black"
        >
          {isFetching ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
};

export default Login;
