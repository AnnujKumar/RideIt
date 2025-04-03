import React,{useState,useRef,useEffect,useContext} from 'react';
import {useGSAP} from "@gsap/react"
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel';
import gsap from "gsap"
import ConfirmRides from '../Components/ConfirmRides';
import ChooseRide from '../Components/ChooseRide';
import WaitingForDriver from '../Components/WaitingForDriver';
import {UserDataContext } from "../contexts/UserContext"
import {SocketDataContext} from '../contexts/SocketContext';
import UserWaitingForDriver from "../components/UserWaitingForDriver"
import { RideDataContext } from '../contexts/RideContext';
import {useNavigate} from "react-router-dom"
import axios from "axios"
const UserHome = () => {
  const navigate = useNavigate()
  const {ride,setRide} = useContext(RideDataContext)
  const [input, setinput] = useState({drop:"",pickup:""})
  const [panelopen, setPanel] = useState(false)
  const panelLow = useRef(null)
  const panelUp = useRef(null)
  const panelClose = useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false)
  const vehiclePanelRef= useRef(null)
  const conformRide = useRef(null);
  const [conformRidePanel, setconformRidePanel] = useState(false)
  const [waitDriver, setwaitDriver] = useState(false);
  const [locations, setlocations] = useState([])
  const [activeInput, setactiveInput] = useState(true)
  const [vehicleType, setvehicleType] = useState("")
  const [vehicleFares, setvehicleFares] = useState({car:0,moto:0,auto:0})
  const [journeyDetails, setjourneyDetails] = useState({distance:{},destination:{}})
  const waitDriverRef = useRef(null);
  const {socket} = useContext(SocketDataContext)
  const {user,setUser} = useContext(UserDataContext)
  const [lookingForDriver, setlookingForDriver] = useState(false)
  const lookingForDriverRef = useRef()
  let rideDetails;
  useEffect(()=>{
    console.log("been here ")
    console.log(user)
      socket.emit("join",{userId:user._id,userType:"user"});
      socket.on("ride-accepted",(ride)=>{
        setlookingForDriver(false);
        setwaitDriver(true);
        console.log(ride)
        console.log("beststt")

        setRide(ride);
      }
      
     
    )
    socket.on("ride-start",()=>{
      setwaitDriver(false);
      navigate("/user-ride-start")
    })
    return () => {
      socket.off("ride-accepted",()=>{
        setlookingForDriver(false);
        setwaitDriver(true);
      });
    };
  },[])
  const calculateFare =async ()=>{
    if(input.pickup&&input.drop){
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        params:{
          pickup:input.pickup,
          drop:input.drop
        }
      })
      if(response.status===201){
          setvehicleFares(response.data.fare);
          setjourneyDetails({distance:response.data.distance,duration:response.data.duration
          })
      }
    }
  }
  const createRide = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/create-ride`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      },
      params:{
        pickup:input.pickup,
        destination:input.drop,
        vehicleType:vehicleType,
        distance:journeyDetails.distance,
        duration:journeyDetails.duration,
        fare:vehicleFares[`${vehicleType}`],
        user_id:user._id
      }
    })
    console.log(response.data)
    setRide(response.data.ride);
  }



const handleChange = (evt)=>{
  setinput((ele)=>{
    return {...ele,[evt.target.name]:evt.target.value};
  })
}


  useEffect(()=>{
    const fetchSuggestions = async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-autocomplete-suggestions`,{
          params:{
            input:`${activeInput===true?input.pickup:input.drop}`
          }
        })
        if(response.status===201){
          setlocations(response.data);
        }
  }
  if(input.pickup||input.drop)fetchSuggestions()
},[input])


  useGSAP(function(){
    if(panelopen){
    gsap.to(panelLow.current,{
      height:"65%",
      padding:"25px"
    })
    gsap.to(panelUp.current,{
      height:"35%"
    })
    gsap.to(panelClose.current,{
      opacity:1
    })
  }
  else{
    gsap.to(panelLow.current,{
      height:"0%",
      padding:"0px"
    })
    gsap.to(panelClose.current,{
      opacity:0
    })
    gsap.to(panelUp.current,{
      height:"30%"
    })
  }
  },[panelopen])

  useGSAP(()=>{
    if(vehiclePanel){
    gsap.to(vehiclePanelRef.current,{
      transform:"translateY(0)"
    })
  }
  else{
    gsap.to(vehiclePanelRef.current,{
      transform:"translateY(100%)"
    })
  }
  },[vehiclePanel])
  useGSAP(()=>{
    if(conformRidePanel){
    gsap.to(conformRide.current,{
      transform:"translateY(0)"
    })
  }
  else{
    gsap.to(conformRide.current,{
      transform:"translateY(100%)"
    })
  }
  },[conformRidePanel])
  useGSAP(function(){
    if(waitDriver){
    gsap.to(waitDriverRef.current,{
      transform:"translateY(0)"
      
    })
  }
  else{
    gsap.to(waitDriverRef.current,{
      transform:"translateY(100%)"
    })
  }
  },[waitDriver]

)

  const submitHandler = (evt)=>{
    evt.preventDefault();
  }
  useGSAP(function(){
    if(lookingForDriver){
    gsap.to(lookingForDriverRef.current,{
      transform:"translateY(0)"
    })
  }
  else{
    gsap.to(lookingForDriverRef.current,{
      transform:"translate(100%)"
    })
  }
  },[lookingForDriver])
  
  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative">
      <img className="w-25 absolute top-0 py-5 ml-5" 
     src="/ride-it-logo-black.png" 
     alt="Uber Logo" />

      <div className="h-full w-full">
        <img className="h-full w-full object-cover" src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="Background" />
      </div>
        <div className=" flex flex-col justify-end h-screen w-full absolute top-0">
          <div ref={panelUp} className="h-[30%]  bg-white p-5 relative">
            <h5 className="absolute right-6 top-6 w-6 " >
            <i ref={panelClose} onClick={()=>setPanel(false)} className="ri-arrow-down-wide-line"></i>
            </h5>
            <h5 className="text-black font-semibold text-2xl">Find a Trip</h5>
                  <form onSubmit={submitHandler}>
                  <div className="line h-16 w-1 bg-black rounded top-[47%] absolute left-10 "></div>
                    <input type="text" name="pickup" onChange={(evt)=>{
                      handleChange(evt);
                      setactiveInput(true)
                    }} onClick={()=>{
                      setPanel(true);
                    }} value={input.pickup}className="w-full rounded-lg  p-3 text-base bg-[#eee] mb-5 mt-5 border-rounded" placeholder='Add a pickup location' />
                    <input name="drop" onClick={()=>{
                      setPanel(true);
                    }} type="text" value={input.drop} onChange={(evt)=>{
                      handleChange(evt);
                      setactiveInput(false)
                    }} className="w-full rounded-lg p-3 text-base bg-[#eee]" placeholder='Add a drop location'/>
                    <button onClick={()=>{
                      calculateFare();
                      setPanel(false)
                      setvehiclePanel(true)
                    }} className="w-full bg-black text-white mt-4 py-4 rounded-full font-semibold text-lg">Find Ride</button>
                  </form>
          </div>
          <div ref={panelLow}  className="bg-white h-0">
                      <LocationSearchPanel activeInput={activeInput} setinput={setinput} setPanel={setvehiclePanel} closeDestination={setPanel} locations={locations} set/>
          </div>
          <div ref={vehiclePanelRef} className="z-20 bottom-0 absolute bg-white w-full gap-2 rounded-t-4xl translate-y-100" >
            <ConfirmRides vehicleFares={vehicleFares} setvehicleType={setvehicleType}  setvehiclePanel={setvehiclePanel} setconformRidePanel={setconformRidePanel} />
          </div>
          <div ref={conformRide} className="z-20 bottom-0 absolute bg-white w-full gap-2 rounded-t-4xl translate-y-100" >
            <ChooseRide createRide={createRide} input={input} fare={vehicleFares[vehicleType]}  setconformRidePanel={setconformRidePanel} setwaitDriver={setwaitDriver} setlookingForDriver={setlookingForDriver}/>
          </div>
          <div ref={waitDriverRef} className="z-20 bottom-0 absolute bg-white w-full gap-2 rounded-t-4xl translate-y-0">
              <WaitingForDriver setwaitDriver={setwaitDriver} ride={ride} waitDriver={waitDriver}/>
          </div>
          <div ref={lookingForDriverRef} className="z-20 h-3/5 bottom-0 absolute bg-white w-full gap-2 rounded-t-4xl translate-y-100">
          <UserWaitingForDriver />
          </div>
        </div>
    </div>
  );
};

export default UserHome;

