import { axios } from "axios";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const postLogin = async (values) => {
    // POST request using fetch with async/await
    //console.log(values);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    const response = await fetch('https://testing--environment.herokuapp.com/API/authentication/login_user', requestOptions);
    const data = await response.json();
    const {is_successful, msg} = data;
    console.log(data);
    if(is_successful)
    {
        
    }
}

export default postLogin;