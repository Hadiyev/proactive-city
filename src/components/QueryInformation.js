import React, {useState, useEffect} from 'react'
import SkeletonLoader from "tiny-skeleton-loader-react";
import Jumbotron from 'react-bootstrap/Jumbotron'
import image from 'C:/xampp/proactive-city/src/files/undraw_quiz_nlyh.svg'

function QueryInformation() {
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
                <h1>Check the Status of Your Post</h1>
                <p>If you have submitted a post before, 
                    use the unique post ID given to you and fill in the form below in order to check your post's status.</p>
                <hr/>
            </div>        
        )
      }
}

export default QueryInformation