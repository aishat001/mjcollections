import { current } from "@reduxjs/toolkit";
import axios from "axios";


const baseURL = import.meta.env.VITE_SECRET_API_URL
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;

const currentUser =  user && JSON.parse(user).currentUser;
const Token =  currentUser?.token

export const publicRequest = axios.create({baseURL})

export const userRequest = axios.create({
    baseURL,
    header: {token : `Bearer ${Token}`},
})

