import React, {useState, useEffect} from 'react'
import SkeletonLoader from "tiny-skeleton-loader-react";
import image from 'C:/xampp/proactive-city/src/files/undraw_source_code_xx2e.svg'

function AddPostDescriptionQuality() {
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
                <h4>Description Quality</h4>
                <p>Please make sure your post's title and description is constructive and do not offend others. The way you represent something represents you.</p>
            </div>        
        )
      }
}

export default AddPostDescriptionQuality