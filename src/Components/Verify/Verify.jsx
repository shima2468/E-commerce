import React, { useState } from 'react'
import styles from "./Verify.module.css"
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
  const [isLoadsing, setIsLoading] = useState(false);
  let navgate=useNavigate()
  let formik = useFormik({
    initialValues: {
      resetCode: ""
    },

    onSubmit: (values) => {
      console.log(values);
      getCodeVerify(values)
    },
  });
  async function getCodeVerify(values) {
    setIsLoading(true)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",{
      resetCode: values.resetCode
  },).then((respones)=>{
       setIsLoading(false)
       console.log(respones);
       navgate("/Reset")
     
       
     
       
  }).catch((error)=>{
       console.log(error);
       
  })
}



  return (
     <>
    
     <div className="w-[1200px] mx-auto my-32">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl">reset your account password </h2>

          <div className="my-2 relative">
            {/* لازم في النيم انو احط عندي نفس اسم الاتربيوت الموجود في الاي بي اي */}
           
   
          </div>
          <div className="relative mt-5">
            <input
               name="resetCode"
               type="text"
                id="resetCode"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.code}
             
              className="mt-2 peer w-full h-[50px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  placeholder-transparent focus:outline-none focus:border-blue-500"
              placeHolder="resetCode"
              required
            />
            <label
              htmlFor="resetCode"
              className="ps-3 pt-1 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-0.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Code
            </label>
          </div>
                   {formik.touched.resetCode && formik.errors.resetCode ? (
              <div
                className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.resetCode}
              </div>
            ) : null}

          <div className="text-start my-7 ">
             {/* بدي اظهره بس لما اللودر يكون بتروو */}
          {isLoadsing?<button
            type="submit"
            className="bg-main text-white px-5 py-3 rounded-lg"
          >
              <i className="fa fa-spinner fa-spin"></i>
          </button> :   <button
            type="submit"
            className="bg-main text-white px-5 py-3 rounded-lg me-4"
            // ديرتي لسا ما دخلت ع الانمبت فيلد كلها
            disabled={!(formik.isValid && formik.dirty)}
         >
            Verify
          </button> }
          </div>
        </form>
      </div>
     
     </>
  )
}
