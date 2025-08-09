import React from 'react'
import { Navigate, Outlet } from 'react-router'
import CustomNavbar from './CustomNavbar'
import { useAuth } from '../helper/AuthContext'
import { Typography ,Box,Button} from '@mui/material'
function Home() {
  const{token}=useAuth()
  if(!token){

    return (<Navigate to={'/login'}/>);
  }  
  return (
    <>
    <CustomNavbar/>
    <Outlet/>
    </>
  )
}

export default Home