import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const UserProtectorWrapper = ({children}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(()=>{
        if(!token){
            return navigate("/user-login");
    }
    else{
        console.log(token,"hereisthishit");
        
    }
    },[])
    return (
        <>
        <div>
            {children}
        </div>
        </>
      )
    
}

export default UserProtectorWrapper