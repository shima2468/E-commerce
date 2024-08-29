import React, { useContext } from 'react'
import styles from "./CategorySlider.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { WishContext } from '../../../Context/wishListContext';
export default function CategorySlider() {


  let{idd}=useContext(WishContext)
  console.log(idd);
  




  // هكول الاي بي اي واجيب منها شوية الصور
  // مش هتفرق اذا باليوذ كيوري ولا باليوذ ستيت ويوذ ايفيكت
  // لانو عادي حتى لو كيش مش مهم
  var settings = {
    // الدوتس اذا بدي ياه يشيلها ولا لا
    dots: true,
    // auto play
    infinite: true,
    speed: 500,
    // صورة وحده كل مره
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows:true,
    autoplay:true,
    // اوت بلاي بالملي سكند
    // كل ثانيتين يبقى يحبلي الصورة الي بعدها
    autoplaySpeed:2000
  };

  function getCategorySlider(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let {data} =useQuery({
    queryKey:["categorySlider"],
    queryFn:getCategorySlider
  })
  console.log(data?.data?.data,"category");
  
  return (
     <> 
    
            <div className="mx-28 my-11">  
                  <h1>Show Poupoular Categories:</h1>
                  <Slider {...settings}>
                         {data?.data.data.map((cat)=> 
                           
                           
                            
                                  <div key={cat._id}    className="text-center my-10">

                                      <img src={cat.image} alt="" className='h-[200px]' />
                                      <p>{cat.name}</p>
                                      
                                  </div>
                          
                              
                              
                          
                          )}
                  </Slider>
            </div>
    
        
     </>
  )
}
