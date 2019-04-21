import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom'

import { validateCompany } from "../actions/actions";

import '../styles/home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: ""
        }
        this.validate = this.validate.bind(this);
    }

    validate() {
        const { validateCompany, history } = this.props;
        validateCompany(this.state.hash);


        // history.push(`/diagnosis`);
    }

    render() {
        const { company, history } = this.props;

        return (
            <div className="home-message">
                <div className="content_text">
                    <img className="brand-logo" src="resources/logo-biotica-color.svg" />
                    {/* <h1>BIOTICA</h1> */}
                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                    <div className="content-callback">
                        <input placeholder="Insert su código" onChange={(element) => this.setState({ hash: element.target.value })} />
                        <button onClick={() => this.validate()}>Iniciar</button>
                        {/* <Link to="/diagnosis"> Iniciar </Link> */}
                    </div>
                </div>
                <div className="content_globe">
                    <img className="globle" src="MUNDO.png" />

                    <div className="road-content">
                        <img className="car-animate" src="CAR.png" />
                    </div>
                </div>
                {
                    company.companyId &&
                    <div className="modal">
                        <h3>Hola {company.name}</h3>
                        <div>
                            <p>Juras decir la verdad solo la verdad y nada mas que la verdad</p>
                        </div>
                        <Link to="/diagnosis"> Acepto </Link>
                    </div>
                }

            </div>
        );
    }
}




const mapStateToProps = state => ({
    company: state.diagnosis.company
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        validateCompany
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

