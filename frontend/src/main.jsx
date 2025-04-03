import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import UserContext from './contexts/UserContext.jsx'
import CaptainContext from "./contexts/CaptainContext.jsx"
import RideContext from "./contexts/RideContext.jsx"
import SocketContext from "./contexts/SocketContext"
createRoot(document.getElementById('root')).render(
  <RideContext >
  <SocketContext >
  <CaptainContext>
  <UserContext >
    <BrowserRouter >
    <App />
    </BrowserRouter>
  </UserContext>
  </CaptainContext>
  </SocketContext>
  </RideContext>
)
