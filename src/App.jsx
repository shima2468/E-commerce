import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './Components/Layout/Layout'
import Navbar from './Components/Navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Product from './Components/Product/Product'
import NotFound from './Components/NotFound/NotFound'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import IndexHome from './Components/indexHome/indexHome'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import AllOrders from './Components/AllOrders/AllOrders'
import Checkout from './Components/Checkout/Checkout'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import WishList from './Components/WishList/WishList'
import Verify from './Components/Verify/Verify'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import 'flowbite-react'
// import flowbite from '../node_modules/f'

function App() {

   //  calling react Query...............
  //  هروح اخد انستنس من الكيوري كلاينت واسيفها بكونستننت 
  // 2.
  const queryClient = new QueryClient()
  // بدي اراب الحاجات دي كلهتا 




  let routers=createBrowserRouter([{
    path:"",element:<Layout/>,children:[
      // الاندكس ترو عشان يفتح غفي البيس يو ار ال بتاعي


      //  Protected Route............................................................................... 
      // لو ضغطت ع اللوق اوت وبعدها رحت قلتله كتبله بالباث بدي الكارت او حتى بدي الالهوم هيجبلي ياه مع اني مش عامله لوق ان فلازم احفظ الباث عندي
      // عايزه اعلم برودكت للباث الموجوده عندي 
      // {/* جكت انخليه ايه عشان لما اعمل لوق اوت يعمل ريفيرش اه ويطلعني برا */}
      // {/* لو عملت لوق اوت وخلص طلعني منه ووداني ع اللوق ان لو رجعت ع الهوم عادي هيرجعني ويفتحلي الكارت بدون ما اعمل تسجيل دخول فلازم اعمل بروتكيت للراوت تبعتي  */}
      // البرودكتد راوت بيضل باصصلي ع اللوكل ستورج وع اي كمبوننت بده يعدي اه اذا عندي لوكل ستورج
      // عادي هيعديلي كل الباث الي احطها بشكل طبيعي بس لو ما في ما هيعديلي ياها ويوديهم ع اللقو ان او الريجيستر
      // اي كمبوننت عندي بده يعدي بيروح البروتكد راوت يبص ع اللوكل ستورج
      // عندك يوزر توكين عادي عدي

      // ProtectedAuth................................................
      // انو كان بنفع لما اكون عامل لوق ان وجاهز اروح بالباث فوق واكتب لوق ان ولا ريجيستر برجعني لا انا بديش هيك بدي يحفظلي الدنيا
      {index:true,element:<ProtectedAuth><Login/></ProtectedAuth>},
         {path:"login",element: <ProtectedAuth> <Login/></ProtectedAuth>},
         {path:"register",element:<ProtectedAuth> <Register/></ProtectedAuth> },
         {path:"cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
         {path:"brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
         {path:"product",element:<ProtectedRoutes><Product/></ProtectedRoutes>},
         {path:"*",element:<NotFound/>},
         {path:"/productdetails/:id/:category",element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
         {path:"allorders",element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
         {path:"categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
         {path:"/checkout",element:<ProtectedRoutes><Checkout/></ProtectedRoutes>},
         {path:"wishlist",element:<ProtectedRoutes><WishList/></ProtectedRoutes>},
         {path:"/forgetpassword",element:<ForgetPassword/>},
         {path:"/verfiy",element:<Verify/>},
         {path:"/Reset",element:<ResetPassword/>},
         {path:"home",element:<ProtectedRoutes><IndexHome/></ProtectedRoutes>},
         {path:"/",element:<ProtectedAuth><Login/></ProtectedAuth>}
    ]
  }])
 

  return (
    <>
    {/* هعمله راب هنا الكل يشوفه  */}
    {/* 3. */}
    {/* خطيتها قوق  الرياكت بروفايدر كدا عملتلها راب ع الموقع كله */}
    <QueryClientProvider client={queryClient}>
       <RouterProvider router={routers}></RouterProvider>
        {/* موجوده باللديف دبندسي ما بتطلع معاي ع السيرفر */}
         {/* 3. */}
         {/* فريش انو الداتا لسا راح يجيبها وما حطها لسا بالرامات */}
          {/* فيتشنج بيروح يجيب الداتا */}
          {/* الداتا اصلا مترندره من الرامات فهتلاقي الستيت انو حطها في الرامات وسارت قديمه سارت مش فريش سارت ستيل بس لما بتنقل انا متلا بين الهوم والبرودكت بسير الفتيشنج في الباك جراوند واحنا بدنا نتحكم في هاد الوقت */}
          {/* ان اكتف لو رحت لكمبوننت تاني خالص  */}
       <ReactQueryDevtools initialIsOpen={false} />
       {/* 3. دعملها امبوت */}
       <Toaster  position='top-right'/>
       
    </QueryClientProvider>
</>
  )
}

export default App
