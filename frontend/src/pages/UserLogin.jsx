import React from 'react'
import {useState,useEffect,useContext} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {UserDataContext} from "../contexts/UserContext"
const UserLogin = () => {
  const [user,setuser] = useState("");
  const [password,setPassword] = useState("");
  const handleUser = (evt)=>{
      setuser(evt.target.value);
  }
  const navigate = useNavigate();
  const handlePassword = (evt)=>{
    setPassword(evt.target.value);
  }
  const {setUser} = useContext(UserDataContext)

  const handleSubmit =async  (evt)=>{
    evt.preventDefault();
    const newUser = {
      email:user,
      password:password
    }
    const response = await axios.post("http://localhost:3000/users/login",newUser);
    console.log(response.data)
    console.log(response.status)
    if(response.status===201){
      console.log(response);
      if(localStorage.getItem("token"))
        {console.log(localStorage.getItem("token"))
          localStorage.removeItem("token")
        }
      localStorage.setItem("token",response.data.token);
      
      setUser(response.data.user);
      navigate("/user-home");
    }
  }
  return (
      <div className="h-screen w-screen bg-white p-7 flex flex-col justify-between">
        
        <div className="h-40 flex flex-col  justify-between">
        <img className="w-25 mb-10" src="/ride-it-logo-black.png" alt="" />
          <form action="" onSubmit={handleSubmit} className="w-full">
            <h3 className="text-black text-lg font-medium">What's Your Email</h3>
              <input onChange={handleUser} type="email" className="w-full px-4 py-3 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='username' value = {user} />
          
          <h3 className="text-black text-lg font-medium">Enter Password</h3>
          <input  onChange={handlePassword} value={password} className="w-full px-4 py-3 border bg-[#EEEEEE] h-fit text-black mb-5 rounded placeholder:text-base" required  placeholder='password' type="password" />
            <button type="submit" onClick={handleSubmit} className="py-3 flex justify-center items-center w-full rounded bg-black mb-2" style={{color:"white"}} >
            Login
            </button>
            </form>

            <p className="text-black inline text-center">New here?<Link to="/user-register" className= " text-blue-600">Create New Account</Link></p>
          
        </div>
        <div className="w-full pb-10 h-15 ">
          <Link to="/captain-login" className="flex text-lg justify-center items-center w-full bg-[#10b461] rounded font-bold h-10 mb-7" style={{color:"white"}} >Sign in as Captain</Link>
        </div>
      </div>
  )
}

export default UserLogin