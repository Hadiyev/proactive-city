import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

function Header() {
    return (
        <div>
            <Jumbotron className="intro">
                <h1 >Better City Everyday? Let's make it.</h1>
                <p >makebetter.city tries to fix small problems that affects the level of daily life by bringing people's struggles to light. Thinking proactively instead of being reactive.</p>
                <Button variant="light">Learn more</Button>
            </Jumbotron>
        </div>
    )
}

export default Header