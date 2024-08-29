import React, { useEffect, useState } from 'react'
import styles from "./Brands.module.css"
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { decreament, increament, increamentByValue } from '../../Redux/ProductSlice';
export default function Brands() {

//   (10)................................
// انا هلقيت برا الانتقريشن تاع الريدكس بستخدم هنا الرياكت ريدكس
// دعمل امبورت
let {counter}= useSelector((state)=>state.productReducer)  // هيك اوبجكت جواه الكاونتر بتاعي 
// {productReducer: {…}}
// productReducer   //اسم الريدويسر تيعنا تاع البرودكت ممكن اعمل واحد للكاتوقري كمان
// : 
// {counter: 20}    // البرودكت ريدويسر فيها الانيشل فاليو
// [[Prototype]]
// : 
// Object

// (11)..................
// خلص انا دخصص رجعلي الستيت دوت برودكت ريدوسر مباشره
// (12)..............
// بدي اعمل انا ديستركت للكاونتر عطول وخلص
// (13)..........................
// بدي اروح استخدمها جوا الناف بار
console.log(counter);
// (15)..............................
let dispatch=useDispatch()

  return (
    
        <>
           <div className="w-1/2 text-center mx-auto">
           
                <h2>{counter}</h2>
                {/* (14) */}
                {/* انا عندي اكشن وبدي اعمله كول والاكشن هيا الميثود والاكشن لازم ينعمله دسباتش عشان اروح اغير في ستيت */}
                {/* بس بنفعش اكول هيك الفنكشن لازم اعلمه دسباتش  */}
                <button onClick={()=>dispatch(increament())} className='px-3 bg-red-500 text-white'>+</button>
                <button onClick={()=>dispatch(decreament())}className='px-3 bg-cyan-500 text-white'>-</button>
                 {/* (16) */}
                {/* بدي لما يدوس ع هالزر يزود بالقيمه الي انا هبعتهاله */}
                {/* ط لو بدي امررله القيمه الي بده يزود فيها هان عشان وين ما يروح يقدر يزود بالقيمه الي بده ياها */}
                <button onClick={()=>dispatch(increamentByValue(50))}className='px-3 bg-yellow-500 text-white'>by value</button>
           </div>
        </>
  )
       
}
  