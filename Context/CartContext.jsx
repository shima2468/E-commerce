import axios from "axios";
import { createContext , useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";


// 1.
// كريت كونتيكس لانها انترينل بكيج ما بحتاج انزلها
export let CartContext=createContext()

// 3.
export default function CartContextProvider(props){
  
  // // Payment..........................
  // دعمل يوذ ستيت واحط فيها الكارت اي دي وهتكون بنل كمان
  // وفي كل مره بعمل ميثود بروح باخد منها الكارت اي دي عن طريق السيت
  // سواء اتغير ولا لا مليش دخل
  // هحطها في كل فنكشن فيها احتماليه الكارت اي دي يتغير
  let[cartId,setCartId]=useState()



  let headers={
              token:localStorage.getItem("userToken"),
  
           }
           // بدي اروح اعملها سيت اول ما بأد بالكارت
  const [numOfCartItem, setnumOfCartItem] = useState(0)
  // total price...................
    const [totalPrice, settotalPrice] = useState(0)
  // 2.
  // المفروض هاي الفنكشن بقدر اعملها راب ع الاب كله
    // بدي اكول الاي بي اي تبعتي جوا الكونتيكس
    // ومن اي حته بقى عادي يعني من اي حته عايزة اعمل اد في الكارت
    // بروح اكول الفنكشن تاعت الاكسيوس من الكونتيكس 
    // بدي الابلكيشن كله يشوف الكارت بتاعتي 
    // كنا مشيرين هالحاجات اما من المين او من الاب 
    // طالما عملاه من الاول في المين كملي من المين
    // رحت عملتلها راب ع كل الاب في المين وخلاص الدنيا كدا تمام
    
// هعملها كولين من اي كمبوننت هاي الفنكشن الاد تو كارت عشان هيك استخدمت الكونتيكس ونا بعملها كول همرر البرودكت اي دي ايا كان
// بدي هاي الفنكشن كل الكمبوننت تشوفها  
  async function addProductToCart(productId){
         let headers={
            token:localStorage.getItem("userToken"),

         }
        //  الاكسيوس هيرجع بروميس فلازم الحقه بأويت
          return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            //   الكلمه دي بجيبها بالزبط من الموجوده في الاي بي اي 
            //  لما يكون اسم البروبرتي نفس اسم الفاليو خلاص بكتبها مره وهوا لحاله بيفهم 
            productId 
          },{
               headers
          }).then((response)=>{
              // 4. بدي اطبع الايرور او انو سكسيس
              //  هاي المسيج عايزة اطلعها بالتوست
              console.log(response.data.message);
              // كل ما اعمل اد
              setnumOfCartItem(response.data.numOfCartItems)
              //  toast hot..................
              toast.success(response.data.message)
              settotalPrice(response.data.data.totalCartPrice)
                // console.log(response.data.data);
                
            //    عملت ريتيرن عشان اخد الي راجع منها بفاريبل
               

            // Payment..........................
            // ط الكارت اي دي من وين اجيبه انا ما بدي ياه ستتك 
            // ونا بعمل اد برودكت في الكارت  بيرجعلي برودكت اي دي 
             console.log(response,"add");  
             // لما بأد البرودكت عندي بيرجع دايما بالرسبونس عندي كارت اي دي
            //  وكمان من الميثود الي بتعملي قيت للداتا بيكون فيها 
            // الكارت اي دي فأصلا الكارت اي دي بيجيلي من كل ميثود
            console.log(response.data.data._id,"add");
            // بيكون اصلا فاضي فبعمل انشاء لواحد جديد كأني
            setCartId(response.data.data._id)
            return response;
               
          }).catch((error)=>{
              console.log(error);
              toast.error(response.data.message)
              return error
            
          })}
        //   الاي دي برودكت مبعود في حاجه اسمها بادي
        // طالب حاجه تانيه اسمها  هيدر والهيدر جواه التوكين
        // يا اما اجيبه من الكونتيكس يا من اللوكل ستورج
        
        async function getCartProducts() {
            return await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
                headers
            }).then((respones)=>{
                 console.log(respones);
                //  هنعمله ريتيرن للريسبونس عشان يسمع في الكمبوننت التانيه
                // عشان يظهر برضو العدد داخل الكارت كمبوننت
                setnumOfCartItem(respones.data.numOfCartItems)
                settotalPrice(respones.data.data.totalCartPrice)
                setCartId(respones.data.data._id)
                return respones
                 
            }).catch((error)=>{
                 console.log(error);
                 return error
                 
            })
        }

        async function deletProduct(productId) {
          return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
          }).then((respones)=>{
              //  لما تضغطي ع الديليت هيجي ريسبونس وهيكون حاذف فالريسبونس البرودكت الي حذفتيه بس ما شاله من العرض فأنا بدي يعمل ابديت 
              // ما حصللها ريندر في الاي بي اي 
              // فمفروض اعمل كول للميثود الي بتقيت الداتا تاني
              // فهتروح من العرض لما اعمل ريفيرش
              // فأنو بعد الديليت اروح اعمل قيت للكارت تاني
              // بس هالشغله مش احسن حاجه ممكن اعملها
              // بس في الرد الي رجعته حذفت الي ضغطت عليه ديليت
              // هي اصلا الاي بي اي بترد عليا بالداتا بعد ما انعمللها ابديت
              // فالحل بعد ما اعمل ريموف اسيت في الكارت بتاعتي الداتا الجديده الي رجعلي ياها الاي بي اي بعد التعديل
              // في اي بي اي بترجعليش الداتا الجديده بعد التعديل
              // فبتخليك غصبن عنك تروح تقيت الداتا من الكارت
              // عشان اعمل ري ريندر للاي بي اي هروح اسيت الداتا الجديده الي رجعالي من الكارت في الستيت
              // انو لازم اكول الريندر تاني  لانزو الاي بي اي عندي مرجعالي الداتا الجديده
              // لو مش مرجعالي بسير غصبن عني اروح اكول الميثود الي بتقيت الداتا تاني بعد ما اعمل ريموف فقعان
              console.log(respones);
              //  هنعمله ريتيرن للريسبونس عشان يسمع في الكمبوننت التانيه
              // وكمان بدي اسيت النمبر ونا عامله ديليت
              // عشان لما احذف ونا بالكارت تنقص من فوق من جنب الكارت
              setnumOfCartItem(respones?.data.numOfCartItems)
              settotalPrice(respones?.data.data.totalCartPrice)
              return respones
               
          }).catch((error)=>{
               console.log(error);
               return error
               
          })
      }

        // بدي الابديت تتشاف من كله بدي اروح ارميها تحت
  async function  updateCartItem(productId,count){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
       //  body
       count
    },{
       //  header
       headers
    }
   
   ).then((respones)=>{
     console.log(respones);
     //  التوتل برايس هيتغير هنا
     settotalPrice(respones?.data?.data.totalCartPrice)
     setCartId(respones?.data.data._id)
     return respones
     
}).catch((error)=>{
     console.log(error);
     return error
     
})
}
async function clearCart() {
  return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
    // بعتلها بس التوكين عشان تخذف الكارت الخاصه بيوزر معين
    headers
  }).then((respones)=>{
      console.log(respones);
      //  هنعمله ريتيرن للريسبونس عشان يسمع في الكمبوننت التانيه
      settotalPrice(0)
      return respones
     
       
  }).catch((error)=>{
       console.log(error);
       return error
       
  })
}



// Payment............................................
// عشان الكل يشوفها هعملها تحت ديستركت
// هروح عند التشيك اوت واخد الفنكشن 
async function onlinePayment(shippingAddress) {
  return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{
      // مفروض يجيه اوبجكت اسمه تشبينج ديتيلز 
      shippingAddress
  },{
    headers
  }).then((respones)=>{
       console.log(respones);
      //  عمل لوق ليها لما مررتله للفنكشن الاونلاين بايمنت الفاليو فطلعلي سكسيس
      // اهم اشي بالريسبونس هوا اليو ار ال
      // هيعملي ري دايركت فبدي لما اضغط ع الباي ويكون الريسبونس اوكي يعملي الري دايركت
      // كان عندي وندو دوت لوكيشن دوت اتش ريف
      // فبدي اقله روح ع اليو ار ال بدي اقله روح ع الداتا دوت سيشن 
      // دوت يو ار ال
      console.log(respones.data.session.url); //طبعلي اليو ار ال دخلي الابلكيشن يوديني ري دايركت عليه 
      window.location.href=respones.data.session.url
      // هروح اشتري بالفيزا بتاعتي وهيرجعني تاني 
      // للهوست بتاعي الي هوا 5173
      setnumOfCartItem(respones.data.numOfCartItems)
      settotalPrice(respones.data.data.totalCartPrice)
       
  }).catch((error)=>{
       console.log(error);
       
  })
}
async function cashPayment(shippingAddress) {
  return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
      // مفروض يجيه اوبجكت اسمه تشبينج ديتيلز 
      shippingAddress
  },{
    headers
  }).then((respones)=>{
       console.log(respones);
        // هيك هيك الكاش عندي بيروح يمسح الكارت \
        // لما الكارت تفضى روح اعمل ابديت للكارت والبرايس
        setnumOfCartItem(respones.data.numOfCartItems)
        settotalPrice(respones.data.data.totalCartPrice)
        window.location.url="http://localhost:5173/home"
  }).catch((error)=>{
       console.log(error);
       
  })
}


   

        // بدي كل الكمبوننت تشوفها عشان هيك همرر الفنكشن هان 
    // بدي اباس الفنكشن ديليت عشان يبين
    // بدي كل الكمبوننت تشوف الكارت اوف نمب ايتم
    return <CartContext.Provider  value={{cashPayment,onlinePayment,updateCartItem,getCartProducts,addProductToCart,deletProduct,totalPrice,numOfCartItem,clearCart}}>
        {props.children}  
        
        </CartContext.Provider>
    

}