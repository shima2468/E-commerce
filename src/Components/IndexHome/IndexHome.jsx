import React from 'react'
import styles from "./IndexHome.module.css"
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

export default function IndexHome() {
  return (
    <> 
        <MainSlider/>
        <CategorySlider/>
        <FeatureProduct/>
    
    </>
  )
}
