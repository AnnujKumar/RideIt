import React,{useState,useContext} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { UserDataContext } from '../contexts/UserContext'
import Cookies from "js-cookie"
import axios from "axios"
const UserRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({email:"",password:"",firstname:"",lastname:"",username:""})
  const {user,setUser} = useContext(UserDataContext);
  const handleChange =(evt)=>{
    setData((d)=>({
          ...d,[evt.target.name]:evt.target.value
    }))
  }

  const handleSubmit = async (evt)=>{
        evt.preventDefault();
        const newUser = {
          fullname:{
            firstname:data.firstname,
            lastname:data.lastname
          },
          password:data.password,
          email:data.email
        }
        const response = await axios.post("http://localhost:3000/users/register",newUser);
        if(response.status===201){
        console.log(response.data);
        localStorage.setItem("token",response.data.token);
        setUser(newUser);
        setData({email:"",password:"",firstname:"",lastname:"",username:""})
        navigate("/user-home");
        }
        else navigate("/user-login");
  }


  return (
    <div className="w-screen h-screen px-5 py-5 flex flex-col justify-between  bg-white">
        <div  className="">
          <img className="w-20 mb-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <form action="" onSubmit={handleSubmit}>
          <h3 className="text-black text-lg font-medium">What's Your Username</h3>
              <input  type="text" onChange={handleChange} value={data.username} name="username" className="w-full px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='username' />

              <h3 className="text-black text-lg font-medium">What's Your Name</h3>
              <div className="flex gap-2">
              <input  type="text" onChange={handleChange} value={data.firstname} name="firstname" className="w-1/2 px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='firstname' />
              <input  type="text" onChange={handleChange} value={data.lastname} name="lastname" className="w-1/2 px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='lastname' />
              </div>
              <h3 className="text-black text-lg font-medium">What's Your Email</h3>
              <input  onChange={handleChange} type="email" value={data.email} name="email" className="w-full px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='xyz@example.com' />
              <h3 className="text-black text-lg font-medium">Set a Password</h3>
              <input onChange={handleChange} value={data.password} name="password" type="password"  className="w-full px-4 py-2 bg-[#EEEEEE]  border mb-7 rounded text-black placeholder:text-base" required placeholder='password' />
              <button  onClick={handleSubmit} type="submit" style={{color:"white"}} className="py-3 flex justify-center items-center w-full rounded bg-black mb-2" >
                Register
              </button>
              </form>
              <p className=" text-black text-center font-medium">Already a User?  <Link to="/user-login">Login here</Link></p>
        </div>
        <div>

        </div>
    </div>
  )
}

export default UserRegister