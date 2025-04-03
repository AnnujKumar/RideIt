import React, {useEffect,useState,useContext,createContext} from 'react'
import {io} from "socket.io-client"
export const SocketDataContext = createContext();
const socket = io(`${import.meta.env.VITE_BASE_URL}`)
   
const SocketContext = ({children}) => {
    useEffect(()=>{
        socket.on("connect",()=>{
            console.log(`Connected to server ${socket.id}`)
        })
    },[])
  return (
    <SocketDataContext.Provider value={{socket}}>
    <div>{children}</div>
    </SocketDataContext.Provider>
  )
}

export default SocketContext