import React, {useState, useEffect} from 'react'
import SkeletonLoader from "tiny-skeleton-loader-react";
import imageAdd from 'C:/xampp/proactive-city/src/files/undraw_directions_x53j.svg'

function AddPostInformation() {
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
                <img className="image" src={imageAdd}></img>
                <h4>Adding an Issue</h4>
                <p>It only takes a minute! Your identity does not matter. Check the tips and use the form to submit an issue.</p>
            </div>        
        )
      }
}

export default AddPostInformation