import React from 'react'
import styles from "./ProtectedRoutes.module.css"
import { Navigate } from 'react-router-dom'
export default function ProtectedRoutes(props) {
  // بيروح يتشك ع اللوكل ستورج بالاول
  // في حاجه اسمها تاغ نافقيت جاي اصلا من رياكت راوتر دوم
  // البروبز هي اي كمبوننت انا عايزة اعديه
  // ط الراوتنج وين موجود بالاب ط انا عايزة اعمل بروتكد لكل باث هناك
  if(localStorage.getItem("userToken")){
        // gلو عنده لوكل ستورج هيرجعلي البروبز 
        return props.children
  }else{
          // هلقيت لو رحت بالباث ع الكارت بدون ما اعمل لوق ان ما يرضى يوديني هيخليني باللوق ان لاني عامله بروتيكد 
          return <Navigate to="/login"></Navigate>
  }
  return (
    <div>ProtectedRoutes</div>
  )
}