import React, { useContext, useEffect, useState } from 'react'
import styles from "./WishList.module.css"
import { WishContext } from '../../../Context/wishListContext'
import Loader from '../Loader/Loader';
import { CartContext } from '../../../Context/CartContext';

export default function WishList() {

    let{getWishList,wishList,deleteWishlist}= useContext(WishContext);
    const [isLoading, setIsLoading] = useState(true)
    let[heartColor,setHeartColor]=useState(false)
   console.log(wishList);
    

    async function getWish() {
         await getWishList();
         setIsLoading(false)
    
    }
    async function deleteWish(productId) {
         await deleteWishlist(productId);
         setHeartColor(true)
         setIsLoading(false)


    }
    let {addProductToCart}=useContext(CartContext)
    //   let{addProductToCart}= useContext(CartContext)
    
    
    
      async function addToCart(productId){
            // لانها بترجع بروميس لازم اقلها اسينك واويت
            // ط انا بدي اخد الي راجع منها في حاجه 
           let response=await addProductToCart(productId);
           console.log(response);
           
      }
    

    useEffect(()=>{
        getWish()
    })
  return (
    <> 
     
      <div className="container mx-auto my-24">

                    
                    <div className=" p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-3xl  leading-none text-gray-900 dark:text-white">My wish List</h5>
                           
                      </div>
                      {isLoading? <Loader/>:
                      <div>
                         
                                          <div className="flow-root">
                                          {wishList?.map((list)=>   
                                                                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                                                        <li className="py-3 sm:py-4">
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0">
                                                                                    <img class="w-[200px] rounded-full" src={list?.imageCover}/>
                                                                                </div>
                                                                                <div className="flex-1 min-w-0 ms-4 mb-12">
                                                                                    <p className="text-xl text-black  truncate dark:text-white">
                                                                                            {list?.title}
                                                                                    </p>
                                                                                    <p className="text-sm text-main truncate dark:text-gray-400 mt-1">
                                                                                            {list?.price}EGB
                                                                                    </p>
                                                                                    <p onClick={()=>deleteWish(list?._id) }  className="text-sm text-red-600 truncate dark:text-gray-400 mt-1">
                                                                                        <i class="fa-solid fa-trash"></i> Remove
                                                                                    </p>
                                                                                </div>
                                                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                                <button  onClick={()=>addToCart(list?._id) } className='me-3 text-center btn bg-main text-white px-12 py-2 rounded-md'>Add To cart</button>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                        <hr/>
                                                                      
                                                                    </ul>
                                          )}
                                         
                                    </div>
                      
                      </div>}
                     
                    
                    </div>
      </div>
     

    </>
  )
}
