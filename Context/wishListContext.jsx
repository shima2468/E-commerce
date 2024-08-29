import axios from "axios";
import { createContext , useEffect, useState } from "react";
import toast from "react-hot-toast";



// 1.
// كريت كونتيكس لانها انترينل بكيج ما بحتاج انزلها
export let WishContext=createContext()
export default function WishContextProvider(props){
      
    const [wishlist, setWishlist] = useState([]);


    
    let[wishList,setWishList]=useState([]);
    let[heartColor,setHeartColor]=useState(false)
    let headers={
        token:localStorage.getItem("userToken"),

     }

   let [idd,setIdd]=useState(20);
   async function addProductToWish(productId){
    let headers={
       token:localStorage.getItem("userToken"),

    }

     return await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
        productId 
     },{
          headers
     }).then((response)=>{
         console.log(response);
         setHeartColor(true)
         toast.success(response.data.message)
      
     
          

    
          
     }).catch((error)=>{
         console.log(error);
         toast.error(response.data.message)
        
       
     })}

   


     async function getWishList() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers
        }).then((respones)=>{
             console.log(respones);
             console.log(respones.data.data);
            //  هنعمله ريتيرن للريسبونس عشان يسمع في الكمبوننت التانيه
            // عشان يظهر برضو العدد داخل الكارت كمبوننت
            setWishList(respones?.data?.data)
            return respones
             
        }).catch((error)=>{
             console.log(error);
             return error
             
        })
    }

    async function deleteWishlist(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
          }).then((respones)=>{
                    console.log(respones);
                    // setWishList()
                    return respones
                    
          }).catch((error)=>{
            console.log(error);
            return error;
            
            
       })
    }
   
    

    return <WishContext.Provider value={{idd,addProductToWish,getWishList,wishList,deleteWishlist,heartColor,wishlist}}>
        
         {props.children}  
    
    </WishContext.Provider>
}