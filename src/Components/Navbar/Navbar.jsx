import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "./../../assets/loading-3-shopping-cart-48.png";
import { Link, useNavigate } from "react-router-dom";
import { TokanContext } from "../../../Context/TokanContext";
import { CartContext } from "../../../Context/CartContext";
import { useSelector } from "react-redux";
import { } from "flowbite-react";
import Extra from "../Extra/Extra";

export default function Navbar() {
  let {token,setToken} = useContext(TokanContext)
  let navigate =useNavigate()
  let{numOfCartItem,getCartProducts}=useContext(CartContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);}



  // (14)......................
  // كدا عملنا لايد للداتا 
  let{counter}=useSelector((state)=>state.productReducer)
  function getCart(){
    getCartProducts()
  }

  useEffect(()=>{
    getCart()
  },[])

  function logOut(){
    // اللوق اوت هتعمل تلات حاجات 
    // 1.
    localStorage.removeItem("userToken");
    // 2.
    setToken(null);
    // 3.
    navigate("/login")


  }
  
  return (
    <>

      {/* <Extra/> */}
      <nav className="ms-2 me-4 bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="home" className=" text-black flex items-center space-x-3 rtl:space-x-reverse text-2xl">
            <i className=" me-2 fa-sharp fa-solid fa-cart-shopping text-main "></i>
            FreashCart
          </Link>
          <div className="me-5 flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {token?<li> <a onClick={()=>logOut()}  href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        LogOut
                   </a>
              </li>
            :<> 
                  <li>
                    {/* الايه بتعمل ريفيرش  */}
                    <Link to="login"  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
                  </li>
                  <li>
                    <Link  to="register"   className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</Link>
                  </li>
                 
            
            </> }
                
            </ul>

            <button  onClick={toggleMenu}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
               aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className=" items-center justify-between  w-full md:flex md:w-auto md:order-1 sm:hidden"
            id="navbar-sticky"
          >
            {token? <ul className="flex flex-col p-4  md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
              <li>
                <Link to="home"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                   Home  {/*//{counter} */}
                </Link>
              </li>
              <li>
                <Link to="cart" className="relative  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Cart
  
                  <span className="absolute top-[0] bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{numOfCartItem}</span>

                </Link>
              </li>
              <li>
                <Link to="wishlist" className=" ms-2 relative  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                     
  
                   wish List

                </Link>
              </li>
              <li>
                <Link to="product" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Product
                </Link>
              </li>
              <li>
                <Link to="categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Brands
                </Link>
              </li>
            </ul>:null}
          </div>
          {isMenuOpen && (
          <div
            className=" items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            {token? <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="home"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                   Home  {/*//{counter} */}
                </Link>
              </li>
              <li>
                <Link to="cart" className="relative  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Cart
  
                  <span className="absolute top-[0] bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{numOfCartItem}</span>

                </Link>
              </li>
              <li>
                <Link to="wishlist" className=" ms-2 relative  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                     
  
                   wish List

                </Link>
              </li>
              <li>
                <Link to="product" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Product
                </Link>
              </li>
              <li>
                <Link to="categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Brands
                </Link>
              </li>
            </ul>:null}
          </div>)}
        </div>
      </nav>
    </>
  );
}
