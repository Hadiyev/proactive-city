import React from 'react'
import image from 'C:/xampp/proactive-city/src/files/undraw_wind_turbine_x2k4.svg'

class HomePageLeftside extends React.Component {
    constructor() {
        super()
        this.state={
            test: ''
        }
    }

    render() {
        return(
            <div>
                {/* <img style={{width:"65%"}}src={image}></img>
                <br/>
                <br/> */}
                <h6>share us</h6>
                <p style={{margin:'0'}}className="text-muted">#makebetter</p>
            </div>
        )
    }
}

export default HomePageLeftside