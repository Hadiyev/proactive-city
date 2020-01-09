import React, {useState, useEffect} from 'react'
import SkeletonLoader from "tiny-skeleton-loader-react";
import image from 'C:/xampp/proactive-city/src/files/undraw_posting_photo_v65l.svg'

function AddPostImageQuality() {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(false)
      });
      if (isLoading){
        return(
            <div>
                <SkeletonLoader height="14em" style={{marginTop: 50}}/>
            </div>
        )
      } else {
          return(
              <div>
                  <img className="image" src={image}></img>
                  <h4>Image Quality</h4>
                  <p>Please make sure your image is clear and helps people to understand the issue.</p>
              </div>        
          )
      }
}

export default AddPostImageQuality