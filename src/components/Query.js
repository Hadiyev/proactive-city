import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import QueryInformation from './QueryInformation'
import firebase from "firebase"
import SkeletonLoader from "tiny-skeleton-loader-react";
import imageApproved from 'C:/xampp/proactive-city/src/files/undraw_order_confirmed_1m3v.svg'
import imageNotApproved from 'C:/xampp/proactive-city/src/files/undraw_cancel_u1it.svg'
import imageNotReviewed from 'C:/xampp/proactive-city/src/files/undraw_in_progress_ql66.svg'
import imageNotFound from 'C:/xampp/proactive-city/src/files/undraw_not_found_60pq.svg'


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

class Query extends React.Component {
    constructor() {
        super()
        this.state = {
            postId:'',
            postStatus: '',
            status: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        var docRef = db.collection("posts").doc(this.state.postId);
        docRef.get().then(doc => {
            if (doc.exists) {
                if(doc.data().isReviewed) {
                    console.log("Document data:", doc.data())
                    this.setState({postStatus: doc.data().isApproved})
                    this.setState({status: 'reviewed'})
                } else {
                    this.setState({status: 'notReviewed'})
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                this.setState({status: 'notFound'})
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            this.setState({status: 'error'})
        });
        
    }

    render() {
        switch(this.state.status){
            case 'loading':
                return(
                    <div>
                        <SkeletonLoader height="25em"  />
                    </div>
                )
            case 'reviewed':
                if(this.state.postStatus){
                    return(
                        <div>
                            <img className="image" src={imageApproved}></img>
                            <h1>Approved</h1>
                            <p>Your post has been approved.</p>
                            <hr/>
                        </div>
                    )
                } else {
                    return(
                        <div>
                            <img className="image" src={imageNotApproved}></img>
                            <h1>Not Approved</h1>
                            <p>Your post has been rejected.</p>
                            <hr/>
                        </div>
                    )
                }
            case 'notReviewed':
                return(
                    <div>
                        <img className="image" src={imageNotReviewed}></img>
                        <h1>Your post will be reviewed soon..</h1>
                        <p>Your post has not been reviewed yet.</p>
                        <hr/>
                    </div>
                )
            case 'notFound':
                return(
                    <div>
                        <img className="image" src={imageNotFound}></img>
                        <h1>No post with this ID</h1>
                        <p>Please make sure your POST ID is entered correctly.</p>
                        <hr/>
                    </div>
                )
            default:
                return(
                    <div>
                        <QueryInformation />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                {/* controlid? */}
                                <Form.Label>Your Post ID</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="postId"
                                    value={this.state.postId} 
                                    placeholder="Enter your Post ID"
                                    onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                Enter your Post ID to query your post's status.
                                </Form.Text>
                            </Form.Group>
        
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="I verify the information." />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Check Status
                            </Button>
                        </Form>
                        <br/>
                    </div>
                )
        }
    }
}

export default Query