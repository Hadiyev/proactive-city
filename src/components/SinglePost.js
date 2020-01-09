import React from 'react'

function SinglePost(props) {
    return (
        <div className="post">
            {/* <div style={{backgroundImage: props.imgUrl}} className="imageExample"></div> */}
            <img className="imageExample" src={ props.imgUrl } />
            <p style={{float:"right", color: "#6c63ff"}} className="upVote">{props.votes}</p>
            <h5>{props.title}</h5>
    <p className="postDetails">Post ID: {props.user} Added at {props.date.toDate().toLocaleString()}</p>
            <p className="postDescription">{props.description}</p>
            <p className="text-right readMore">Read more</p>
            <hr/>
            <br/>
        </div>
    )
}

export default SinglePost