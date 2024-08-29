import React, { useContext, useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Slider from "react-slick";
import Loader from '../Loader/Loader';
import { CartContext } from '../../../Context/CartContext';
import { Helmet } from 'react-helmet';
export default function ProductDetails() {
  // hot toast
  // بدي اخده من الكارت كونتيكس 
  let {addProductToCart}=useContext(CartContext)
  //   let{addProductToCart}= useContext(CartContext)
  
  
  
    async function addToCart(productId){
          // لانها بترجع بروميس لازم اقلها اسينك واويت
          // ط انا بدي اخد الي راجع منها في حاجه 
         let response=await addProductToCart(productId)
         console.log(response);
         
    }
  
  // hot toast

  //  عنا يوذ بارم موجوده في الرياكت راوتر دوم
  // هيا هوك بتسحبلي البراميتر الي بعتاها في الباث 
  let {id,category} =useParams();
  console.log(id);  // {id: '6428ead5dc1175abc65ca0ad'}


  // الافضل البرودكت ديتيلز نشتغلها بدون الرياكت كيوري
  // way 2 normal..............................
  const [productDetails, setProductDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setIsError] = useState(null)
  const [RelatedProducts, setRelatedProduct] = useState([])

  var settings = {
    // الدوتس اذا بدي ياه يشيلها ولا لا
    dots: true,
    // auto play
    infinite: true,
    speed: 500,
    // صورة وحده كل مره
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:true,
    autoplay:true,
    // اوت بلاي بالملي سكند
    // كل ثانيتين يبقى يحبلي الصورة الي بعدها
    autoplaySpeed:2000
  };







  async function getProductDetails(){  
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{
           console.log(data);
           setProductDetails(data?.data.data);
           setIsLoading(false )
           
    }).catch((error)=>{
           console.log(error);
           setIsError(error.message)
           setIsLoading(false )
           
           
    })
  }
  async function getRelatedProducts(){  
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((data)=>{
           console.log(data?.data.data,"Related");
           let relatedProducts=data?.data.data;
           relatedProducts=relatedProducts.filter((product)=>product.category.name==category)
          // console.log(relatedProducts);
           setRelatedProduct(relatedProducts)
          
             
    }).catch((error)=>{
           console.log(error);
           
    })
  }
  useEffect(() => {
      getProductDetails()
      getRelatedProducts()
  }, [])

//   // ط لو بدي لو ضغط ع وحده من الريليتدر تتغير وتسير هيا البرودكت حتى لو فوق عندي في الباث البرودكت نيم بس الاي دي تغير
//   // بدي استخدم اليوز ايفيكت في مرحلة الابديت
  useEffect(() => {
    // لما تعمل ابديت ع الاي دي روح اعملها كول تاني
    getProductDetails()
    getRelatedProducts()
}, [id])
  



//   function getProductDetails(){
//     // العيب تاع اليوذ كويري انو لما اجي اضغط ع البرودكت ويطلع برودكت ديتيلز انو بياخد لما يطلعها وهيا اصلا الداتا متكيشه وجاهزة مفروض
        
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//   }
//   // way 1 react query
//  let {data,isLoading,erroe,isEroor} = useQuery({
//     queryKey:["productDetails"],
//     queryFn:getProductDetails 
//   })
//   console.log(data?.data.data);

  
  
//   return (
//     <>
//            <div className="container mx-auto">
//             <div className="flex">
//                   <div className="w-1/4">
//                         <img src={data?.data.data.imageCover} alt="" />
//                   </div>
//                   <div className="w-3/4 mt-10 ms-10">
//                            <h1 className='text-black font-bolder text-2xl my-5'>{data?.data.data.title}</h1>
//                            <h3 className='text-gray-700 my-5'>{data?.data.data.description}</h3>
//                            <p className='my-5'>{data?.data.data.category.name}</p>
//                            <div className='flex justify-between items-center mt-10'>
//                                                               <p className='w-1/2'>{data?.data.data.price}EGB</p>
//                                                               <div className='w-1/2 '>
//                                                                     <i className='fa fa-star rating-color'></i>
//                                                                     {data?.data.data.ratingsQuantity}  
//                                                               </div>  
//                             </div>
//                             <div className='text-center mt-16'>
//                                                <button className='btn bg-main w-full text-white px-3 py-2 rounded-md'>Add To cart</button>
//                             </div>
//                   </div>
//             </div>
//            </div>
    
    
    
//     </>
//   )
  return (
    <>
          {/* مش محبب في البرودكت ديتيلز استخدم الكيوري لانو بده يعرض داتا دجديده بدي احس حمل وجابها */}
           <div className="container mx-auto mt-20">
            {isLoading? <Loader/> : null}
            {/*  هيك احسن عشان ما يبقى متكيش  داتا وااللودر ما بيبقى شغال وبشوف الداتا زي بسير تغيير وبعدين اظهرلي هلقيت برضو عند البرودكت ديتيليز سار لودر وعمل فتيش تاني*/}
            {/* عشان ما اىشوف انو الصورة بتتغير عندي */}
            {/* فالاسلم استخدم اليوذ ستيت واليوذ ايفيكت */}
            <div className="flex">
                  <div className="w-1/4">
                 <Slider {...settings}>
                         {productDetails?.images?.map((src)=> <img src={src} alt="" />)}
                  </Slider> 
                       
                  </div>
                  <div className="w-3/4 mt-10 ms-10">
                           <h1 className='text-black font-bolder text-2xl my-5'>{productDetails.title}</h1>
                           <h3 className='text-gray-700 my-5'>{productDetails.description}</h3>
                           <p className='my-5'>{productDetails.category?.name}</p>
                           <div className='flex justify-between items-center mt-10'>
                                                              <p className='w-1/2'>{productDetails.price}EGB</p>
                                                              <div className='w-1/2 '>
                                                                    <i className='fa fa-star rating-color'></i>
                                                                    {productDetails.ratingsQuantity}  
                                                              </div>  
                            </div>
                            <Helmet>
                                                    <meta charSet="utf-8" />
                                                    <title>{productDetails.title}</title>
                            </Helmet>
                            <div className='text-center mt-16'>
                                               <button onClick={()=>addToCart(productDetails.id)} className='btn bg-main w-full text-white px-3 py-2 rounded-md'>Add To cart</button>
                            </div>
                  </div>
            </div>
           </div>
             
           <div className="mx-6 mt-20">
                 <h1 >Related Product:</h1>
                {isLoading?<Loader/>:
                <div className="flex flex-wrap">
                             
                                  {RelatedProducts.map((product)=> <div key={product.id} className="w-1/6">
                                        <div className="product p-3">
                                             <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                                    <img src={product.imageCover} alt="" className='w-full' />
                                                    <h5 className='text-main'>{product.category.name}</h5>
                                                    <p>{product.title.split(" ").splice(0,2).join(" ")}</p>
                                                    <div className='flex justify-between items-center'>
                                                              <p className='w-1/2'>{product.price}EGB</p>
                                                              <div className='w-1/2'>
                                                                    <i className='fa fa-star rating-color'></i>
                                                                    {product.ratingsQuantity}  
                                                              </div>  
                                                    </div>
                                             </Link>
                                             
                                             <div className='text-center'>
                                               <button onClick={()=>addProductToCart(product.id)} className='btn bg-main text-white px-3 py-2 rounded-md'>Add To cart</button>
                                             </div>
                                        </div>
                                    </div>)}
             
             
             
             
                                    
                                   
                             </div>
                            
                
                }
              
            </div>
    
    
    </>
  )
}
