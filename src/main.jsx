import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import  '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import TokanContextProvider from '../Context/TokanContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from '../Context/CartContext.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/store.js'
import WishContextProvider from '../Context/wishListContext.jsx'


createRoot(document.getElementById('root')).render(
  //   (2)
  //   عملت للبروفايدر راب
  <Provider store={store}>
  <WishContextProvider>
  <CartContextProvider>
  <TokanContextProvider>
        <StrictMode>
              <App />
        </StrictMode>
  </TokanContextProvider>
  </CartContextProvider>
  </WishContextProvider>
  </Provider>
 

)
