import React, { useContext, useEffect, useState } from 'react'
// import styles from './FeatureProducts.module.css'
import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader/Loader'
import { NavLink, useNavigate ,Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../../Context/CartContext'
import { WishContext } from '../../../Context/wishListContext'




// import { Link, NavLink } from 'react-router-dom'
export default function FeatureProduct() {
  const [wishlist, setWishlist] = useState([]);

  // Function to toggle product in the wishlist
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter(id => id !== productId) // Remove from wishlist
        : [...prevWishlist, productId] // Add to wishlist
    );
  };



  //  Wishlist...................................................
  let{addProductToWish,heartColor}=useContext(WishContext)

  async function getWish(productId){
    await addProductToWish(productId);
  }

   // Cart...................................
  // لازم بالاول ايوذ الكونتيكس بتاع الكارت 1
  //  ط لاني هاي الفنكشن بترجعلي بروميس مش هقدر احطها مباشره ع البتن اون كليك وخلاص
  // هروح احطها داخل فنكشن هنا واكولها فيها
  let {addProductToCart}=useContext(CartContext)
//   let{addProductToCart}= useContext(CartContext)



  async function addToCart(productId){
        // لانها بترجع بروميس لازم اقلها اسينك واويت
        // ط انا بدي اخد الي راجع منها في حاجه 
       let response=await addProductToCart(productId)
       console.log(response);
       
  }










   // عشان اقدر اعمل ماب ع اي حاجه لازم احطها بيوذ ستيت
//   const [products, setProduct] = useState({})
//   // // اللودر هيبقى شغال باي ديفولت
//   const [isLoading, setIsLoading] = useState(true)
//   async function getProducts(){
//     // لما عملت ريتيرن هينفتح معاي دوت ذين ودوت كاتش
//        return axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data)=>{
//           //  الاريه اوف اوبجكت
//           console.log(data.data.data);
//           setProduct(data.data.data)
//           setIsLoading(false)
             
//        }).catch((error)=>{
//               console.log(error);
//               setIsLoading(false)

//        })
//   }
//   // فهاي الفنكشن هعملها كولينج في الديد ماونت عن طريق اليوذ ايفيكت كدا كدا
//   useEffect(()=>{
//       //  هعمل هنا كولينج للاي بي اي 
//       // حطيتها هان عشان اضمن اللودر يضل شغال عبال ما تيجي الداتا بتاعتي 
//       getProducts()
//   })



  // React Query......................................................................

  //   بتعملي ستيت منجمنت من الداتا الي رجعالي من الاي بي اي مش طالما الفيتشر برودكت كمان موجوده بالهوم فلما اتنقل من البرودكت للهوم بديش يرجع يعملي فتشجينج ويعمل لودر ومن اول وجديد كأنه الداتا سارت موجوده لوكلي وهاد الي وفرلي ياه الرياكت كيوري
  //   فعشان ما اضل اعمل كول للاي بي اي ظهرتلي الستيت منجمنت الكيوري بتعمل تكيشش للداتا الي راجعه
  //   اهم ميزة ونا بتنقل بين الكمبوننت وبعضها ونفس الاكسيوس بعمله كولنج هيا بتروح بتكيشه 
  //   بتخليني انتقل بين الكمبوننت وبعضها وفش لودر اصلا بيشغل لامره وحده بيعمل فتشينج
  //   ط هل هوا بيسكت عن الفتيشنج طبعا لااا 
  //   انا دعمنله انترفيل تايم يقدر يروح للداتا ويرجع 
 //  الانتريفل الداتا بتبقى مترندره بالباك جراوند بيروح بيقارن الداتا الموجوده بالرامات الي متكيشه مع الي ترندرت بالباك جراوند
 // لو فيهم ابديت بيرندر عطول بدون ما يحسسنبي انو في لودر اتشال واتحط 
  
  //    الريدكس كمان بيعمل ستيت منجمنت لداتا جايه من الاي بي اي او جايه حتى من الفرونت
  //   بسس الي بيعمل ستيت منجمنت اكتر وتكيشش للداتا بشكل افضل هيا الرياااكت كيووري
  //    قبل عملنا ستيت منجمنت عن طريق الكونتيكس 

  //   (State mangment)  1.context(ستيت منجمنت لداتا موجوده عندي اصلا)   2.redux    3.react Query(اكتر واحد بيعمل ستيت منجمنت لداتا رجعالي من الاي بي اي )
  //    زمان هالبكيج كانت شغاله بس للرياكت كيوري هلقيت سارت الفيو والانجيولر كمان تستخدمها
  //    فساار اسمها ع اسم الشركه الي عملتها الي اسمها تان  ستاك كيوري 
  //     لازم الريااكت كيوري اباسها ع الموقع كله عندي فهنستخدم الرياكت كيوري بروفايدر
  //   بس زي ما احنا متعودين هنعملها راب عند اليمن دوت جي اس اكس
//   وعادي بأمكاننا نعملها جوا الاب هنعملها جولا الاب وخلاص


//     {/* موجوده باللديف دبندسي ما بتطلع معاي ع السيرفر */}
//     {/* 3. */}
//     {/* فريش انو الداتا لسا راح يجيبها وما حطها لسا بالرامات */}
//     {/* فيتشنج بيروح يجيب الداتا */}
//     {/* الداتا اصلا مترندره من الرامات فهتلاقي الستيت انو حطها في الرامات وسارت قديمه سارت مش فريش سارت ستيل بس لما بتنقل انا متلا بين الهوم والبرودكت بسير الفتيشنج في الباك جراوند واحنا بدنا نتحكم في هاد الوقت */}
//     {/* ان اكتف لو رحت لكمبوننت تاني خالص  */}



   
  //  بدي اعمل كول للاي بي اي عن طريق ؤياكت كيوري
  // اعمل الي انتا عايزة بتقلي المهم تعمل ميثود بتكول الاي بي اي
  // بنفعش اصلا استخدم الرياكت كيوري من غير الاكسيوس
  // فلازم استخدم الاكسيوس فيتش الي انا عيزاه
  // هوا عنده حاجه اسمها يوذ كيوري 
  // ممكن يكون عندي بالابلكيشن اكتر من كيوري 
  // لازم اعطي كل كيوري منهم نيم مختلف هجيب فيه البرودكت هسميه هان انا فيشتر برودكت
  // ولما اجيب البرودكت ديتيلز هسمي كيوري عندي اسمها برودكت ديتيلز
  function getFeatureProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}

let {data,isError,isLoading,isFetching,error}=useQuery({
 // الكيوري كي بتاخد اسم الكيوري الي عايزة اعمله
 // لكن هيا بتاخد الاسم في اريه
 queryKey:["featureProducts"],
 // دعمل فنكشن تكول الاي بي اي وترجع الداتا
 queryFn:getFeatureProducts,
 // بدي اتحكم في التايم الي هتكون فيه الداتا فريش 
 // لو لاحظتي كل فتره بيروح يعمل فتشينج بس ما بتكوني ماخده بالك
 // لما دخلت ع الكمبوننت عمل فتشينج ورجع الداتا
 // بدي اتجكم في الستيل تايم
 // الكونفقريشن اوبجكت الي هقدر من خلالها اغير اي حاجه جوا الرياكت كيوري
 // الستيل الوقت الي هتكون فيه الداتا فريش لحد ما الداتا تسير قديمه
 // بدي اقله خمس ثواني
 // بتقعد الداتا فريش خمس ثواني بعدين بتبدأ تسير ستيل 
 staleTime:5000, 
 // قديش يستنا ويطلع الايرور
 // الديفولت تلاته ثواني هلقيت سار 5
 // لو حطيت فولس مش هيطلعلي اصلا هيقلي عطول نت ورك ايرور مش هيستنا ولا دقيقه
 // ترو هيقد يحاول عدد لا نهائي من المحاولات عبال ما يرجع الداتا بتعتي
 // في ناس بتقله افضل ريتراي وبتحط فيه فنكشن معينه
 // متلا روح طلعلي اي بي اي بديله
 retry:5,
 // في عنا ريتراي ديلاي 
 // بين الرتراي والتانيه ثانيه وحده
 // انا ممكن اغير الديفولت تبعه واخليه يغير كل ثانيتين 
 retryDelay:2000,
 // عنا ريفيتش انتيرفل
 // هيعمل رفيرش للانتيرفل كل قد ايه
 // حتى لو انا وافقفه بالكمبوننت نفسه روح اعملي ريفيتش مش شرط يتنقل من كمبوننت للتاني
 // بعمل هاي الحركه تحسبا لو الاي بي اي سار عليه ابديت
 // بيعمل ريفيتش فالباك جراوند بس الداتا عندي ثابته ما بسير ولا تغيير
 
 refetchInterval:2000

})
   // x object موجود فيه كل حاجه بالدنيا 
   // بس بيرجعها مرتين اول مره الداتا بتكون ان ديفايند بتكون لسا الداتا مش راجعه ولسا ما كلمت الاي بي اي
   // وعنده جواته الاوبجكت حاجه اسمها اذ لودنج وبتكون قيمته بترو 
   // وفي كمان حاجه اسمها اذ فيتشنج بترو انا لسا ما جبت الداتا انا لسا بعملها فيتشنج
   // هوا لحاله مهندل الايرور ومهندل الفيتشنج ولحاله عامل ترنري اوبريتور
   // بعدين هيطبعلك الاوبجكت تاني بس الداتا فيها اوبجكت مش ان ديفايند
   // وهتلاقي داخل هاد الاوبجكت الي بالداتا اريه فيها 40 برودكت
   // فخلص هوا خلص فتشينج وخلص اللودنج فهيسيره قيمتهم بفولس
   // كل حاجه مهندلها لحاله لدرجه الاذ سكسيس اذا جبت الداتا ولا لا
   // الاكس فيها حجات كتيير انا دعمل ديستركت للحاجه الي احنا عايزينها من الاوبجكت
   // console.log(x);
   // console.log(isFetching,"isFetching");
   // console.log(isLoading,"isLoading");
   // true 'isFetching'
   // FeatureProducts.jsx:67 true 'isLoading'
   // FeatureProducts.jsx:66 true 'isFetching'
   // FeatureProducts.jsx:67 true 'isLoading'
   // بالاول هيك بعدين رجع طبعهم طلعه فولس لما جتاب الداتا
   // لانو بالاول بترجع الداتا بأن ديفايند لو عملت لوب اجيب الداتا اوف داتا هيجبيلي ايرور فعلامة الاستفهام حلتها انو لو كان ان ديفايند ما تطبعها
   // اذا الداتا رجعت اعمل اللوب وخلصنا
  // علامة الاستفهام بتضمنلي انو ما يجيبلي الان ديفايند لو اجا يوقف اصلا ما يعمل سلسله التوريث 
 //  لو لاحظتي لما انتقل من البرودكت للهوم بعملش عندي لودر كأنهم كمبوننت واحد
 // كأنه الداتا الي رجعالي من الاي بي اي كأنها موجوده لوكل عندي
 // بس الباث فوق اتغير هيا حلوه وبتسهل بس بستخدمها بشغلات معينه يعني متلا البرودكت موجوده بالهوم والبرودكت عشان ما احس انو في لودر اشتغل
 // في ديف تول بتخليني اعرف الداتا متى رجعت ومتى سارلها فتشينج
 // وعشان اتحكم بالداتا قديش تضل بالكاش 
 // في عندي حاجه اسمها كونفقريشن اوبجكت 
 // عشان اقدر اتفرج ع الكونفقريشن لازم انزل الديف تول تاعتها 
 //1. $ npm i @tanstack/react-query-devtools
 // هيستنى انو ترجع ويسير الصح تلات مرات
 // هوا استنا وقت بعدين رجعلي الايرور
 // استنا تلات ثواني بعدين طلعه عملنا بايندج للايرور تحت
//  console.log(error?.message);
 
 console.log(data?.data?.data, "feat");
   
   
   
return (
  
        <>
           <div className="mx-28 my-11">
              {isError?<p>{error?.message}</p>:null}
                {isLoading?<Loader/>:
                <div className="flex flex-wrap">
                             
                                  {data?.data?.data.map((product)=> <div key={product.id} className="w-1/4 hover:shadow-sm hover:shadow-green-400">
                                        <div className="product p-3">
                                             <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                                    <img src={product.imageCover} alt="" className='w-full' />
                                                    <h5 className='text-main mt-5 mb-2'>{product.category.name}</h5>
                                                    <p className='text-gray-400 text-sm'>{product.title.split(" ").splice(0,2).join(" ")}</p>
                                                    <div className='flex  items-center'>
                                                              <p className='w-1/2 text-black '>{product.price}EGB</p>
                                                              <div className='w-1/2 ms-20 text-black mt-4'>
                                                                    <i className='fa fa-star rating-color'></i>
                                                                    {product.ratingsQuantity}  
                                                              </div>  
                                                    </div>
                                                    
                                                   

                                             </Link>
                                             <div className='flex items-center justify-center text-center mt-4'>
                                              <div className="flex items-center justify-center">
                                                   <button  onClick={()=>addToCart(product.id) } className='me-3 text-center btn bg-main text-white px-12 py-2 rounded-md'>Add To cart</button>
                                                
                                                  <a onClick={()=>getWish(product.id)}>
                                                  <button
                                                          onClick={() => toggleWishlist(product.id)}
                                                          className="ml-3"
                                                        >
                                                          <i
                                                            className={`fa fa-heart text-2xl ${
                                                              wishlist.includes(product.id) ? 'text-red-600' : 'text-black'
                                                            }`}
                                                          ></i>
                                                  </button>
                                                 


                                           
                                                </a>
                                                    
                                              </div>
                                             
                                              
                                             </div>
                                        </div>
                                    </div>)}
             
             
             
             
                                    
                                   
                             </div>
                            
                
                }
              
            </div>
        
        </>
)
}
