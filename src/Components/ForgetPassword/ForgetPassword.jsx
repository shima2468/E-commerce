import React, { useState } from "react";
import styles from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
export default function ForgetPassword() {
  const [isLoadsing, setIsLoading] = useState(false)
  let navgate=useNavigate()
  let formik = useFormik({
    initialValues: {
      email: ""
    },

    onSubmit: (values) => {
      console.log(values);
      ForgetPassword(values)
    },
  });


  async function ForgetPassword(values) {
      setIsLoading(true)
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",{
         email: values.email
    },).then((respones)=>{
         setIsLoading(false)
         console.log(respones);
         console.log(respones.data.message);
         toast.success(respones.data.message);
         navgate("/verfiy")
         
       
         
    }).catch((error)=>{
         console.log(error);
         
    })
  }


   













  return (
    <>
      <Helmet>
                                <meta charSet="utf-8" />
                                <title>Forget Password</title>
      </Helmet>
      <div className="w-[1200px] mx-auto my-32">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl">please enter your Email:</h2>
          <div className="relative mt-5">
            <input
               name="email"
               type="email"
                id="email"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.email}
             
              className="peer w-full h-[50px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  placeholder-transparent focus:outline-none focus:border-blue-500"
              placeHolder="Email"
              required
            />
            <label
              htmlFor="email"
              className="ps-3 pt-1 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-0.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Email
            </label>
          </div>
                   {formik.touched.email && formik.errors.email ? (
              <div
                className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
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
  );
}
