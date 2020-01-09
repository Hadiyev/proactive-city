import React from 'react'
import SinglePost from './SinglePost'
import SkeletonLoader from "tiny-skeleton-loader-react";
import firebase from "firebase"
// import {Pagination} from 'react-laravel-paginex'
// import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyAOomOeVmDyoVH6N8_k9wLj7Rd2DlTmVBY",
    authDomain: "makebetter-86b6f.firebaseapp.com",
    databaseURL: "https://makebetter-86b6f.firebaseio.com",
    projectId: "makebetter-86b6f",
    storageBucket: "makebetter-86b6f.appspot.com",
    messagingSenderId: "234798222381",
    appId: "1:234798222381:web:4e3763663778d4b0ff7ca4",
    measurementId: "G-JB8NT8XR0E"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class Posts extends React.Component {
    constructor() {
        super()
        // this.state = {
        //     data: {
        //             data: [],
        //             links: {},
        //             meta: {}
        //     }
        // }
        this.state = {
            data: [],
            isLoading: true
        }
    }

    // getData=(data, page)=>{
    //     axios.get('http://10.110.16.17/proactivecity/public/api/posts?page=' + (data ? data.page : page)).then(response => {
    //         this.setState({data:response.data});
    //     })
    // }

    componentDidMount() {
        // firebase.database().ref('/posts/sL8MVDptlihBhBqn218S').once('value').then(function(snapshot) {
        //     console.log(snapshot.val());
        //     // ...
        //   })
        db.collection('posts').onSnapshot(snapshot => {
            console.log(snapshot.docs)
            const allPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({
                data: allPosts,
                isLoading: false
            })
        })
        // this.getData(false, 1)
    }
    
    render(){
        if(!this.state.isLoading){
            return(
                <div>
                    {this.state.data.map(post => {
                        if (post.isApproved && post.isActive) {
                            return(
                                <SinglePost 
                                    key={post.id} 
                                    title={post.title} 
                                    description={post.description}
                                    imgUrl={post.imgUrl}
                                    votes={post.votes}
                                    user={post.postId}
                                    date={post.date}
                                />)
                        }
                    })}  
                    {/* {this.state.data.data.map(post => {
                    return(
                    <SinglePost 
                        key={post.id} 
                        title={post.title} 
                        description={post.description}
                        user={post.nickname}
                        date={post.created_at}
                    />)
                    })}   
                    <Pagination changePage={this.getData} data={this.state.data}/> */}
                </div>
            )
        }
        else {
            return(
                <div>
                    <SkeletonLoader height="25em"  />
                </div>
            )
        }
    }
}

export default Posts