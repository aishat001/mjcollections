import axios from "axios";


const baseURL = "http://localhost:3000/"
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;

const currentUser =  user && JSON.parse(user).currentUser;
const Token =  currentUser?.token

export const publicRequest = axios.create({baseURL})

export const userRequest = axios.create({
    baseURL,
    header: {token : `Bearer ${Token}`},
})

