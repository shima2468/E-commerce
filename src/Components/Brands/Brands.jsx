import React, { useEffect, useState } from 'react'
import styles from "./Brands.module.css"
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { decreament, getBrands, increament, increamentByValue } from '../../Redux/ProductSlice';
import { Helmet } from 'react-helmet';
export default function Brands() {
    const [isLoading, setIsLoading] = useState(true)
    // (8) dispatch action 
    let dispatch=useDispatch()

   //   (6)
  //    هنا البراند عندي كأنيشل فاليو هيا اريه فاضيه 
 //    ط هلقيت بدي اعمل كول للفنكشن وهيا اكشن عشان اعملها كول لازم اكول الدسباتش
   let{brands}= useSelector(((state)=>state.productReducer))
   console.log(brands?.data)
   console.log(brands);
  //  (7) 
  // مفروض اول ما ادخل فالبراند بدي اروح اعمل كول للاي بي اي
  // ع هيك في مرحلة الديد ماونت 
  useEffect(()=>{
    // (9)
    //   هنا روح كلملي الفنكشن الي اسمها قيت براند
    // بنفعش اعملها قيت عطول لازم اعمل فنكشن وسيطه 
    getData()

},[])

async function getData() {
    // هلقيت البراند اول ما  اعمل كول هتسير البراند فيها الداتا من الاي بي اي
    // همسك الدسباتش واعمل راب للفنكشن عليه 
    await dispatch(getBrands())
    setIsLoading(false)
}
   
  
   return (
    
        <>
             <Helmet>
                            <meta charSet="utf-8" />
                            <title>Brand</title>
           </Helmet>


             <h2 className="text-main text-center mx-auto font-bold text-3xl mt-32">All Brands:</h2>
            {isLoading? <Loader/>:
            <div className='mx-28 mt-14 mb-32'>
                                             
                            <div className='grid grid-cols-2 lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-1 gap-5'>
                            {brands?.data?.map((brand)=>
                        
                                        <div  key="brand._id" className="max-w-70 max-h-50 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                                        <div className='flex justify-center text-center'>
                                                                            <img class="rounded-t-lg w-[300px]" src={brand.image} alt="" />
                                                                        </div>
                                                                        <div className="p-5">
                                                                        
                                                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{brand.name}</h5>
                                                                        
                                                                            
                                                                        </div>
                                        </div>
                        
                        
                        )}
                        </div>


            </div>}
            
        </>
  )
       
}
  



                 
                 
                 



{/* {isLoading?<Loader/>:
    <div>
      

    {brands.map((brand)=>{
     
          
          <div   className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                   <a href="#">
                       <img class="rounded-t-lg" src="{brands?.image}" alt="" />
                   </a>
                   
                   <div className="p-5">
                       <a href="#">
                           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{brand?.name}</h5>
                       </a>
                       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                       
                   </div>
           </div>




       })} 
        


     

    </div>
    
} */}
