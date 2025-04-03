import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
const CaptainLogout = ()=>{
    const navigate = useNavigate();
    const tokenRef = useRef(false);
    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(!token){
            navigate("/captain-login")
        }
        if(tokenRef.current===true){
            navigate("/captain-login")
        }
        console.log(token)
            localStorage.removeItem("token")
            tokenRef.current = true;
            axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((response)=>{
                if(response.status===201){
                    console.log("successfully logged out");
                    navigate("/user-login")
                }
                
            }).catch(err=>{
                console.log(err)
            })
    },[])
}
export default CaptainLogout