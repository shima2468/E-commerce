import React , { useContext, useState } from 'react'
import styles from './Login.module.css'
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TokanContext } from '../../../Context/TokanContext';


export default function Login() {
  const [userMessage,setuserMessage]=useState(null)
   const [userErr, setUserErr] = useState(null)
  //  بدي اللودر يشتغل اول ما اعمل ريكويست للاي بي اي 
  const [isLoadsing, setIsLoading] = useState(false)
  let {token, setToken}=useContext(TokanContext)
  let navgate=useNavigate()

  let mySchema=Yup.object({
    // هوا عامل بداخله شغله اسمها دوت ايميل بتعمل فالديشين للايميل اوتماتك
    email: Yup.string().required("Email is required").email("invaild email"),
    password:Yup.string().required("pass is req").matches(/^[A-Z][a-z0-9]{3,8}$/,"pass is not vaild"),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "", 
    },
  
    validationSchema:mySchema,
    onSubmit: (values) => {
      console.log("hellllo");
      console.log(values);
      logInForm(values)
  },
  });
  async function logInForm(values){
    // let data = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
    // بس بدي اهندل لما تكون الداتا تمام ولا لا
    // كنت حطاها الاول ففارلايبل بس لا هلقيت دحطها بريتيرن عشان اقدر استخدم الذين والكاش
    
    // بدي اول ما هالفنكشن تشتغل تسير ترو
    setIsLoading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(data=>{
        console.log(data);
        console.log(data.data.token);
        
        
       
        
        // السكسسيس راجعه في داتا دوت داتا دوت مسيج
        // بدي اخزن الداتا انها سكيس في يوذ ستيت 
        setuserMessage(data.data.message)
        localStorage.setItem("userToken",data.data.token)
        setToken(data.data.token)
        // بدي اعمل ري دايريكت ع اللقو ان
        // بسموها بالرياكت راوتر دوم نفقيت 
        // لازم بالاول اعمل امبورت لهوك اسمها يوذ نفقيت
        // وهاخد منه انستنس هوا هاحده من الراوتر دووم 
        navgate("/home")
        // لو الداتا رجعت صح بدي اوقف اللودر
        setIsLoading(false)
        // هيك هيك الداتا بيرجعلي معاها توكين بدي اسيفه عندي بالستيت
       
        
        
    }).catch((err)=> {
       // console.log('Error:', err.response.data));
      // بدي اعمل لما اكزن مدحله اليوزر مرتيت كخساب يقلي ايميل اوردي اقزيست
      // console.log(err.response.data.message) 
      setIsLoading(false);
      setUserErr(err.response.data.message)

    }
     
    )
      
      

  }
  
  
  
   return (
    <>
   
    <div className="ms-32 me-32 ">
      <h1 className="text-main text-2xl">Login Now:</h1>
      {userErr ? (
           <div className="mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  {userErr}
            </div>
          ) : null} 
        
        {/*لو هيا موجوده  هان دعرض المسيج السكسس  */}
        {/* انو لما يسير سبمت خلي الفورمك تهندل السبمت  */}
        {userMessage ? ( 
         <div className="mt-4 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                 {userMessage}
          </div>
         ) : null} 
      {userMessage}
      <form onSubmit={formik.handleSubmit}>
     
        <div className="my-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            email
          </label>
          {/* لازم في النيم انو احط عندي نفس اسم الاتربيوت الموجود في الاي بي اي */}
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.email && formik.errors.email? <div className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}</div>:null }
        </div>
        <div className="my-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          {/* لازم في النيم انو احط عندي نفس اسم الاتربيوت الموجود في الاي بي اي */}
          <input
            name="password"
            type="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.password && formik.errors.password? <div className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}</div>:null }
        </div>
        <div> 
                   <Link to="/forgetpassword" className='text-black'>
                          <h2 className='hover:text-green-500'>forget your password ?</h2>
                         
                   </Link>
                   
        </div>
        
        <div className="text-end my-7 ">
          
        
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
            LogIn
          </button> }
          
          
        </div>
      </form>
    </div>
  </>
  )
}
