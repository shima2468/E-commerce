import React from 'react'
import styles from "./Product.module.css"
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import { Helmet } from 'react-helmet'
export default function Product() {
  return (
        <>  
            <Helmet>
                                <meta charSet="utf-8" />
                                <title>Product</title>
            </Helmet>
            <FeatureProduct/>
        </>
  )
}
