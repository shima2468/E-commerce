import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../../Context/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
export default function Cart() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);}
  let {
    totalPrice,
    getCartProducts,
    deletProduct,
    updateCartItem,
    numOfCartItem,
    clearCart,
  } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  // هعمل كول لالها لما الكمبوننت تترندر معاي  يعني في مرحلة الديد ماونت
  async function getCart() {
    let respones = await getCartProducts();
    // هتيجي الكارت داتا من الكونتيكس لانو عملالها لوق هناك ومن هنا
    console.log(respones.data.data.products, "cart Data");
    setCartItems(respones.data.data.products);
  }
  // هعمل برضو فنكشن وسيطه للديليت
  async function deletItems(productId) {
    let respones = await deletProduct(productId);
    console.log(respones);
    // بعد الديليت هست في الكارت الداتا بعد التعديل
    // هيك غيرت الكارت ايتم فهيعمل ري ريندر
    setCartItems(respones.data?.data.products);
  }
  // فنكشن وسيطه للابديت
  async function updateProduct(productId, count) {
    let respones = await updateCartItem(productId, count);
    console.log(respones);
    // رجعت عمل اعادة رندره
    // قصة انو التوتل بيتغير هوا لانو انا عملاله يعمل ابديت بالداتا الجديده فبيرجع لحاله الاي بي اي يحسبلي الكاونت مع التوتل
    setCartItems(respones.data.data.products);
  }
  async function clearCartItems() {
    let respones = await clearCart();
    // هتلاقي الي راج انو مش مرجع الاريه تاعت البرودكت لو عملتي رفيرش هتلاقيها فضيت
    console.log(respones, "cart Data");
    setCartItems([]);
  }

  useEffect(() => {
    // هيا هترجعلي داتا هاخد الي راجع منها بأي حاجه
    // getCartProducts()
    // لما الاريه تكون فاضيه يعني انا بقلب كمبوننت الديد ماونت
    // بس لا عشان هيرجع بروميس لازمنا اسينك واويت فهعمل فنكشن وسيطه
    getCart();
  }, []);

  return (
    <>
      <Helmet>
                            <meta charSet="utf-8" />
                            <title>Cart</title>
      </Helmet>

      <div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg mb-44">
        <div className="text-right">
          <button
            onClick={() => clearCartItems()}
            className="bg-red-600 text-white px-2 py-3 rounded-md mb-3"
          >
            Clear Cart
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item) => 
              <tr
                key={item.product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={item.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateProduct(
                          item.product.id,
                          item.count - 1 <= 0
                            ? deletItems(item.product.id)
                            : item.count - 1
                        )
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{item.count}</span>
                    </div>
                    <button
                      onClick={() =>
                        updateProduct(item.product.id, item.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price} EGB
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price * item.count} EGB
                </td>
                <td className="px-6 py-4">
                  <a
                    onClick={() => deletItems(item.product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            )}
            <tr className="text-black text-center text-lg font-bold bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">Total Price</td>
              <td className="p-4" colSpan="4">
                {totalPrice}
              </td>
              {/* <td className="p-4"><Link to="/checkout" className='px-3 py-2 bg-main text-white rounded-md hover:text-gray-100'>Checkout</Link></td> */}
              <td className="p-4">
                <button onClick={toggleMenu}
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-white bg-main  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  CheckOut
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                
                <div 
                  id="dropdown"
                  className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  {isMenuOpen && (
                  <ul
                    className="py-2 text-sm text-black font-extrabold dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        to="/checkout"
                        state={{ type: "online Payment" }}
                        className="text-black block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Online
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/checkout"
                        state={{ type: "cash on delivery" }}
                        className="text-black  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Cash
                      </Link>
                    </li>
                  </ul>)}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
