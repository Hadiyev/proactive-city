import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import imagePlaceholder from 'C:/xampp/proactive-city/src/files/placeholder.jpg'
import imageSubmitted from 'C:/xampp/proactive-city/src/files/undraw_settings_ii2j.svg'
import firebase from "firebase";
import Jumbotron from 'react-bootstrap/Jumbotron'
import SkeletonLoader from "tiny-skeleton-loader-react";
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

const db = firebase.firestore();
const storage = firebase.storage();
var storageRef = firebase.storage().ref();

class AddPost extends React.Component {
    constructor() {
        super()
        this.state = {
            id: "",
            title: "",
            description: "",
            postId: "",
            imgUrl: "",
            isActive: true,
            isApproved: false,
            votes: 0,
            selectedFile: '',
            imagePreviewUrl: '',
            status: 'loading'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        
    }

    componentDidMount() {
        this.setState({status: ''})
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({status: 'loading'})
        var uploadTask = storageRef.child('images/' + this.state.selectedFile.name).put(this.state.selectedFile).then((snapshot) => {
            // Upload completed successfully, now we can get the download URL
            snapshot.ref.getDownloadURL().then(downloadURL => {
                db.collection('posts').add({
                    title: this.state.title, 
                    description: this.state.description,
                    imgUrl: downloadURL,
                    isActive: false,
                    isApproved: false,
                    votes: 0,
                    isReviewed: false,
                    date: firebase.firestore.FieldValue.serverTimestamp()
                }).then(docRef => {
                    db.collection('posts').doc(docRef.id).update({postId: docRef.id})
                    this.setState({status: 'submitted',postId: docRef.id})
                })
            })})


        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        //     // Upload completed successfully, now we can get the download URL
        //     uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        //         db.collection('posts').add({
        //             title: this.state.title, 
        //             description: this.state.description,
        //             imgUrl: downloadURL,
        //             isActive: false,
        //             isApproved: false,
        //             votes: 0,
        //             isReviewed: false,
        //             date: firebase.firestore.FieldValue.serverTimestamp()
        //         }).then(docRef => {
        //             db.collection('posts').doc(docRef.id).update({postId: docRef.id})
        //             this.setState({status: 'submitted',postId: docRef.id})
        //         })
        //     })})
    }

    fileChangedHandler = event => {
        this.setState({
          selectedFile: event.target.files[0]
        })
     
        let reader = new FileReader();
         
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result
          })
        }
     
        reader.readAsDataURL(event.target.files[0])
     
      }

    render() {
        switch(this.state.status){
            case 'loading':
                return(
                    <div>
                        <SkeletonLoader height="25em"  />
                    </div>
                )
            case 'submitted':
                return(
                    <div>
                        <img className="image" src={imageSubmitted}></img>
                        <h1>Submitted!</h1>
                        <p>Your issue has been submitted successfully. Take screenshot of the post ID to query the approvement later.</p>
                        <Jumbotron>{this.state.postId}</Jumbotron>
                        <hr/>
                    </div>
                )
            default:
                return (
                    <div>
                        <h4>Form</h4>
                        <p>Great! You've made it so far. Looks like you're ready to submit an issue. Thanks for making things better.</p>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                {/* controlid? */}
                                <Form.Label>Issue Title</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="title"
                                    value={this.state.title} 
                                    placeholder="Enter title"
                                    onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                Some worth-mentioning message.
                                </Form.Text>
                            </Form.Group>
        
                            <Form.Group> 
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea" 
                                    rows="3"
                                    name="description"
                                    value={this.state.description} 
                                    placeholder="Enter description"
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <div className="upload-btn-wrapper">
                                <Button className="addImage" variant="light">
                                    +
                                </Button>Upload an Image
                                <input
                                    style={{backgroundColor: "red"}}
                                    type="file" 
                                    name="avatar" 
                                    onChange={this.fileChangedHandler} />
                            </div>
                            <hr/>              
                            <h4> {this.state.imgUrl} This is how your post will look like</h4>
                            {this.state.imagePreviewUrl == '' ? <img className="imageExample" src={imagePlaceholder} /> : <img className="imageExample" src={this.state.imagePreviewUrl} />}
                            {/* <img className="imageExample" src={this.state.imagePreviewUrl} /> */}
                            <h5>{this.state.title}</h5>
                            <p className="postDescription">{this.state.description}</p>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="I agree to the terms and stuff.." />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <hr/>
                    </div>
                )
        }
    }
}

export default AddPost