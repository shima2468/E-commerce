import React, { useContext, useEffect, useState } from 'react'
import styles from "./Checkout.module.css"
import { useFormik } from 'formik';
import { CartContext } from '../../../Context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function Checkout() {
  // لانها بترجع بروميس اكيد هعملها فنكشن وسيطه
   let{onlinePayment,cashPayment}=useContext(CartContext)
  //  فأنا اخترت الاونلاين وجيت هان طبعلي الباث نيم 
  // الاتنين هيودوني ع التشيك اوت 
  // وفي كمان حاجه اسمها ستيت فيها التايب 
  // التايب عباره عن اونلاين بايمنت 
  // فممكن عطول اعمل ديستركت من اليوذ لوكيشن
  const[paymentType,setPaymentType]=useState()
  let navgate=useNavigate();
  
  let {state}=useLocation();
  console.log(location);
  console.log(state.type);
  
  // هيك هيك اول ما ادخل بالكمبوننت بتاعي سوا كان الكاش ولا الاونلاين هيروح يطبعلي التايب سوا كاش ولا اونلاين زي ما كتبتله بالستيت عند الدروب داون
  // اول ما ادخل ع الكمبوننت تبعي عايزة اسيت البايمنت تايب
  // بالستيت دوت تايب 
  // فهعمل يوذ ايفيكت في مرحله الديد ماونت 
  useEffect(()=>{
    setPaymentType(state?.type)
  },[])

  


  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },

    onSubmit: (values) => {
      console.log(values);
      // مفروض لما بعمل سبمت بكلم فنكشن ابعتلها الفاليو
      payonline(values)
    //  النتيجه بتاعت الي دخلته 
    //   {
    //     "details": "shimaa",
    //     "phone": "01064013731",
    //     "city": "Egypit"
    // }
    
  },
  });

  async function payonline(values) {
      if(paymentType == "online Payment"){
        await onlinePayment();
        navgate('/home')
        toast.success(`${state.type} Successfully completed` )
      }else{
         await cashPayment();
         navgate('/home')
         toast.success(`${state.type} Successfully completed` )
        
      }
  }
 
 
 
 
  return (
    <>
   
      <div className="w-1/2 mx-auto my-32">
      <h1 className="text-main text-2xl">{paymentType} Now:</h1>
     
      <form onSubmit={formik.handleSubmit}>
     
        <div className="my-2">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            details
          </label>
          {/* لازم في النيم انو احط عندي نفس اسم الاتربيوت الموجود في الاي بي اي */}
          <input
            name="details"
            type="details"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.details && formik.errors.details? <div className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.details}</div>:null }
        </div>
        <div className="my-2">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            phone
          </label>
          {/* لازم في النيم انو احط عندي نفس اسم الاتربيوت الموجود في الاي بي اي */}
          <input
            name="phone"
            type="tel"
            id="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.phone && formik.errors.phone? <div className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}</div>:null }
        </div>
        <div className="my-2">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            city
          </label>
          {/* لازم في النيم انو احط عندي نفس اسم الاتربيوت الموجود في الاي بي اي */}
          <input
            name="city"
            type="text"
            id="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.city && formik.errors.city? <div className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.city}</div>:null }
        </div>
        
        <div className="text-end my-7 ">
        
        <button
            type="submit"
            className="bg-main text-white px-5 py-3 rounded-lg me-4"
            // ديرتي لسا ما دخلت ع الانمبت فيلد كلها
            disabled={!(formik.isValid && formik.dirty)}
         >
             PayNow
          </button> 
          
          
        </div>
      </form>
    </div>
     
    
    
    
    </>
  )
}
