import React,{useState,useEffect,useContext} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
const CaptainProtectorWrapper = ({children})=>{
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        if(token){
            setloading(false)
        }
        else{
            navigate("/captain-login")
        }

    },[]);
    if(loading){
        return (
            <div>Loading...</div>
        )
    }
    else{
       return (
        <>
        {children}
        </>
       )
    }

}
export default CaptainProtectorWrapper