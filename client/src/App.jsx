import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Product from './pages/Product/Product'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Navigate, Outlet, Route, Routes } from 'react-router'
import Slider from './components/Slider/Slider'
import Cart from './pages/Cart/Cart'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { useSelector } from 'react-redux'
import About from './pages/about/About'
import Checkout from './pages/checkout/Checkout'
import Success from './pages/success/Success'
import Rotate from './pages/rotate/rotate'



const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {

  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path='/checkout'
        element={<Checkout />} />
      <Route
        path='/cart'
        element={<Cart />} />
        <Route
          path='/success/:id'
          element={<Success />} />
                  <Route
          path='/rotate'
          element={<Rotate />} />
      <Route path='/' element={<Layout />}>

        <Route
          path='/'
          element={<Home />} />

        <Route
          path='/about'
          element={<About />} />

        <Route
          path='/products'
          element={<Products />} />
        <Route
          path='/products/:id'
          element={<Product />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

      </Route>

    </Routes>
  )
}

export default App
