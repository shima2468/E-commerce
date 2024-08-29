import React from 'react'
import styles from "./MainSlider.module.css"
import slider1 from "../../assets/Screenshot 2024-08-11 084743.png"
import slider2 from "../../assets/Screenshot 2024-08-11 084808.png"
import slider3 from "../../assets/Screenshot 2024-08-11 084823.png"
import Slider from 'react-slick';
export default function MainSlider() {
  var settings = {
    // الدوتس اذا بدي ياه يشيلها ولا لا
    dots: true,
    // auto play
    infinite: true,
    speed: 500,
    // صورة وحده كل مره
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    // اوت بلاي بالملي سكند
    // كل ثانيتين يبقى يحبلي الصورة الي بعدها
    autoplaySpeed:2000
  };
  return (
       <>
           <div className="mx-28 my-11">  
              <div className="flex">

                  <div className="w-3/4">
                        <Slider {...settings} >
                              <img src={slider1} className='h-[500px]' alt="" />  
                              <img src={slider3} className='h-[500px]' alt="" />  
                              <img src={slider2} className='h-[500px]'alt="" />  
                        </Slider>
                  </div>
                  <div className="w-1/4">
                       <img src={slider2} className='h-[250px]' alt="" />  
                       <img src={slider3} className='h-[250px]' alt="" />  
                  </div>
              </div>
             
                  
        </div>
       
       </>
  )
}
