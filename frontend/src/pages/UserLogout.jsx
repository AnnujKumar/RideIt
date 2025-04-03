import React, { useDebugValue } from 'react'
import { useEffect,useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if(!token){
        return(
            <div>NO token available</div>
        )
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status===201){
            console.log(response.status)
        localStorage.removeItem("token");
        navigate("/home")
        }
        else if(response.status===401){
            return (
                <div>Wrong response</div>
            )
        }
    })
return <></>
}

export default UserLogout