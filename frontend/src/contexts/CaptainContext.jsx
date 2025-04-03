import {createContext, useContext,useState} from "react"
import React from 'react'

export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null)
  return (
    <CaptainDataContext.Provider value={{captain,setCaptain}}>
        {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext