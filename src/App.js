import React from 'react';
import './App.css';
import Posts from './components/Posts'
import HomePageLeftside from './components/HomePageLeftside'
import AddPost from './components/AddPost'
import AddPostInformation from './components/AddPostInformation'
import AddPostImageQuality from './components/AddPostImageQuality'
import AddPostDescriptionQuality from './components/AddPostDescriptionQuality'
import AddPostJumbotron from './components/AddPostJumbotron'
import Header from './components/Header'
import Footer from './components/Footer'
import MyNav from './components/MyNav'
import Query from './components/Query'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap';

class App extends React.Component {
  constructor(){
    super()
  }

  render() {
    return (
      <Router>
        <MyNav/>
        {/* <Route path="/" exact component={Header}/>     */}
        <Header/>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Route path="/add" exact component={AddPostInformation}/>
            </div>
            <div className="col-md-4">
              <Route path="/add" exact component={AddPostImageQuality}/> 
            </div>
            <div className="col-md-4">
              <Route path="/add" exact component={AddPostDescriptionQuality}/>
            </div>
          </div>
          <div className="row">
            <Route path="/add" exact component={AddPostJumbotron}/> 
            <div class="col-md-3">
              <Route path="/" exact component={HomePageLeftside}/>
            </div>
            <div class="col-md-6">
              <Route path="/" exact component={Posts}/>   
              <Route path="/add" exact component={AddPost}/>    
              <Route path="/query" exact component={Query}/> 
            </div>
            <div class="col-md-3">

            </div>
          </div>
        </div>
        <Footer/>    
      </Router>
    )
  }
}

export default App;
