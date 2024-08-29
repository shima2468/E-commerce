import React from 'react'
import styles from "./IndexHome.module.css"
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
export default function IndexHome() {
  return (
    <> 
        <MainSlider/>
        <CategorySlider/>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Home</title>                                    
        </Helmet>
        <FeatureProduct/>
    
    </>
  )
}
