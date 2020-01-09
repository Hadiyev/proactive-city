import React from 'react'
import {Link} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function MyNav() {
    return(
        <Navbar bg="light" variant="light">
        <Navbar.Brand href="">makebetter.city</Navbar.Brand>
        <Nav className="mr-auto">
        <Link to="/" className="nav-link">Posts</Link>
        <Link to="/add" className="nav-link">Add a Post</Link>
        <Link to="/query" className="nav-link">Query</Link>
        </Nav>
      </Navbar>
    )
}

export default MyNav