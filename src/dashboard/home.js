import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import '../styles/home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-message">
                <div className="content_text">
                    <h1>BIOTICA</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div className="content-callback">
                        <Link to="/diagnosis"> Iniciar </Link>
                    </div>
                </div>
                <div className="content_globe">
                    <img className="globle" src="MUNDO.png" />

                    <div className="road-content">
                        <img className="car-animate" src="CAR.png" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
