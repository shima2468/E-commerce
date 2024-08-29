import React, { useState } from 'react'
import styles from "./Register.module.css"
// 1. بدنا ناخد هوك من الفورمك
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Register() {
  const [userMessage,setuserMessage]=useState(null)
  const [userErr, setUserErr] = useState(null)
 //  بدي اللودر يشتغل اول ما اعمل ريكويست للاي بي اي 
  const [isLoadsing, setIsLoading] = useState(false)
  let navgate=useNavigate()
 //  داخد منها انستنس 
//    // //  2.manual vaildition..............1
//    function validate(values){
//     const errors={};
//     // لو الفاليوز مش موجوده
//     if(!values.name){
//       // بدي اكريت جوا الايرور حاجه اسمها نيم
//       // الايرور هيطلع لو عملت سبمت بدون ما احط النيم 
//       errors.name="Name is Required"

//     }else if(values.name.length < 3){
//         errors.name="cant be less than 3 character"
//     }

//     if(!values.email){
//       errors.email="email is required"
//     }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//       errors.email = 'Invalid email address';
//     }
//     if(!values.password){
//       errors.password="password is required"
//     }else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
//       errors.password = 'Invalid password ';
//     }
//     if(!values.rePassword){
//       errors.rePassword="rePassword is required"
//     }else if (values.password !== values.rePassword) {
//       errors.rePassword = 'Password not match';
//     }
//     if (!values.phone) {
//       errors.phone = "Phone is required";
//     } else if (!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)) {
//       errors.phone = 'Invalid phone';
//     }


//     return errors;
// } 

// 2.

let mySchema=Yup.object({
  // جوا الريكويرد بينحط الايرور
  // انو متلا لازم يدخل ريكويرد وشغله تانية اصغر حاجه بدي متلا تلات احرف
  // انا عيزاه يب من نوع سترنق
  name: Yup.string().required("Name is required").min(3,"cant be less than 3 chars").max(10,"max is 10"),
  // هوا عامل بداخله شغله اسمها دوت ايميل بتعمل فالديشين للايميل اوتماتك
  email: Yup.string().required("Email is required").email("invaild email"),
  password:Yup.string().required("pass is req").matches(/^[A-Z][a-z0-9]{3,8}$/,"pass is not vaild"),
//  ون اوف بتاخد اريه 
// داخل الاريه بحط فيها الاشي الي بدي ينعمل ماتش معاه
// فيي عندي يب دوت ريفيرنس
// انو بدك تكوني ايكول ايكول الباسورد الي فوق
  rePassword:Yup.string().required("rePass is required").oneOf([Yup.ref("password")], "not match pass"),
  phone:Yup.string().required("phone is required").matches(/^(002)?01[0125][0-9]{8}$/,"phone is not vaild"),

})
 
let formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  },
  // validate,
   validationSchema:mySchema,
  //4..............................
  onSubmit:(values)=>{
      console.log(values);

      registerForm(values)
      
  }
});

async function registerForm(values){
  // let data = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
  // بس بدي اهندل لما تكون الداتا تمام ولا لا
  // كنت حطاها الاول ففارلايبل بس لا هلقيت دحطها بريتيرن عشان اقدر استخدم الذين والكاش
  
  // بدي اول ما هالفنكشن تشتغل تسير ترو
  setIsLoading(true)
  return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(data=>{
      console.log(data);
      // السكسسيس راجعه في داتا دوت داتا دوت مسيج
      // بدي اخزن الداتا انها سكيس في يوذ ستيت 
      console.log(data.data.message);
      
      setuserMessage(data.data.message)
      // بدي اعمل ري دايريكت ع اللقو ان
      // بسموها بالرياكت راوتر دوم نفقيت 
      // لازم بالاول اعمل امبورت لهوك اسمها يوذ نفقيت
      // وهاخد منه انستنس هوا هاحده من الراوتر دووم 
      navgate("/login")
  
      // لو الداتا رجعت صح بدي اوقف اللودر
      // في الحالتين اول ما الاي بي اي ترد عليا هوقف اللودر
      
      setIsLoading(false)
     
      
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
      
      <div className="ms-32 me-32 mt-24">
        <h1 className="text-main text-2xl">Register Now:</h1>
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

        

        {/* 3............ */}
        {/* خلي الفورمك يهندل السبمت */}
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            {/* لازم في النيم انو احط عندي نفس اسم الاتربيوت الموجود في الاي بي اي */}
            {/* ولما اضغط ع الزر هيبدأ يجمع الداتا عندي */}
            <input
              name="name"
              type="text"
              // 5......................
              // بدي اخلي الفورمك يهندل اي تشينج ممكن يسير بالانمبت
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* 3. */}
            {formik.touched.name && formik.errors.name ? (
              <div
                className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            ) : null}
          </div>
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
            {formik.touched.email && formik.errors.email ? (
              <div
                className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
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
            {formik.touched.password && formik.errors.password ? (
              <div
                className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="my-2">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              rePassword
            </label>
            {/* لازم في النيم انو احط عندي نفس اسم الاتربيوت الموجود في الاي بي اي */}
            <input
              name="rePassword"
              type="password"
              id="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div
                className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            ) : null}
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
              type="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.phone && formik.errors.phone? (
              <div
                className="my-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
          <div className="text-end my-7 ">
            {/* بدي اظهره بس لما اللودر يكون بتروو */}
            {isLoadsing ? ( 
              <button
                type="submit"
                className="bg-main text-white px-5 py-3 rounded-lg"
              >
                <i className="fa fa-spinner fa-spin"></i>
              </button>
               ) : (
              <button
                type="submit"
                className="bg-main text-white px-5 py-3 rounded-lg me-4"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Register
              </button>
             )} 
          </div>
        </form>
      </div>
   
   </>
  )
}
