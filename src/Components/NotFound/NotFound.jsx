import React from 'react'
import styles from "./NotFound.module.css"
import notFoundPic from "./../../assets/a5f61829918791.560b4718dfa29.png"
export default function NotFound() {
  return (
      <>
         <Helmet>
                                <meta charSet="utf-8" />
                                <title>Not Found</title>
        </Helmet>
        <div className="flex items-center justify-center my-52">
                  <img src={notFoundPic} alt=""   />
        </div>
          
      </>
  )
}
