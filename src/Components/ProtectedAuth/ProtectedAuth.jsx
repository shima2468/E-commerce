import React from 'react'
import styles from "./ProtectedAuth.module.css"
import { Navigate } from 'react-router-dom'
export default function ProtectedAuth(props) {
  if(localStorage.getItem("userToken")){
    // هنا بنفقيت كمبووننت مش باث
      return <Navigate to="/"> </Navigate>
  }else{
      return props.children
  }
  return (
        <>

        </>
  )
}
