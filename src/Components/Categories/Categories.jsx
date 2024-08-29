// "use client"

import React, { useEffect, useState } from 'react'
import styles from "./Categories.module.css"
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/ProductSlice';


export default function Categories() {

  // let pathName=usePathname();
  // let pathName2=useParams();
  // console.log(pathName);
  
  const [isLoading, setIsLoading] = useState(true)
  const [subCategorie, setSubCategorie] = useState([]);
  let   [nameCat,setNameCat]=useState()
  let dispatch=useDispatch()
  let {categories}= useSelector(((state)=>state.productReducer))
  console.log(categories?.data)


    async  function getSubCateories(id,name){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`).then((data)=>{
                 console.log(data?.data?.data);
                 setSubCategorie(data?.data?.data);
                 setIsLoading(false);
                 setNameCat(name)
                
                 
               

                 
                 
                 
    }).catch((error)=>{
                 console.log(error);
                 setIsLoading(false)
                 
    })
}






  useEffect(()=>{
    // (9)
    //   هنا روح كلملي الفنكشن الي اسمها قيت براند
    // بنفعش اعملها قيت عطول لازم اعمل فنكشن وسيطه 
    getData()
   

},[])

async function getData() {
    // هلقيت البراند اول ما  اعمل كول هتسير البراند فيها الداتا من الاي بي اي
    // همسك الدسباتش واعمل راب للفنكشن عليه 
    await dispatch(getCategories());
    setIsLoading(false)
}
   

   



 
  return (
  
          
          <>
        
            {isLoading? <Loader/>:
            <div className='mx-28 mt-24 mb-32'>
                           
                            <div className='grid grid-cols-2 lg:grid-cols-4  md:grid-cols-2 sm:grid-cols-1 gap-5'>
                            {categories?.data?.map((cat)=>
      
                                                      <div onClick={()=>getSubCateories(cat._id,cat.name)}  key={cat._id} className="hover:shadow-sm hover:shadow-green-400 max-w-70 max-h-50 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                                        <div className='flex justify-center text-center'>
                                                                            <img class="rounded-t-lg w-[400px] h-[400px]" src={cat.image} alt="" />
                                                                        </div>
                                                                        <div className="p-5">
                                                                        
                                                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{cat.name}</h5>
                                                                        
                                                                            
                                                                        </div>
                                                                        
                                                       </div>
                  
                                      
                        
                        
                        )}
                        </div>
                      {isLoading? <Loader/>: 
                        <section class=" py-8 antialiased dark:bg-gray-900">
                                        <h2 className="text-main text-center mx-auto font-bold text-3xl mt-24 mb-10">{nameCat} subcategories
                                        </h2>
                                       <div class=" grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                                          {subCategorie?.map((SubCat)=>
                                                          <div key={SubCat._id} class="">

                                                                  <a href="#" class="hover:shadow-sm hover:shadow-green-400 text-center w-[400px] h-[70px] flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                                            <span class="text-center text-2xl font-medium text-gray-900 dark:text-white">{SubCat.name}</span>
                                                                  </a>
                                                                  
                                                          </div>
                                                          

                                          )}
                                          </div>
                        </section>       }
                                            
               </div>
                                                                            


           }
            
      
                         
    </>


  )

}