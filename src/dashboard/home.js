import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom'

import { validateCompany, setInterestGroup } from "../actions/actions";
import Modal from "./modal";

import '../styles/home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: "",
            interestGroup: "",
            interestGroupError: false,
            submitValidate: false
        }
        this.validate = this.validate.bind(this);
        this.initDiagnostic = this.initDiagnostic.bind(this);

    }

    validate() {
        const { validateCompany, history } = this.props;
        validateCompany(this.state.hash);
        setTimeout(() => this.setState({
            submitValidate: true
        }), 5000);
    }

    initDiagnostic(interestGroup) {
        const { setInterestGroup, history, profile } = this.props;
        setInterestGroup(interestGroup);

        if (profile == "LAB") {
            history.push(`/challenges`);
        } else {
            history.push(`/diagnosis`);
        }
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
                    {this.state.submitValidate && !(company && company.id) &&
                        <small style={{
                            color: "#F44336",
                            marginLeft: "1rem",
                            marginTop: "-0.5rem"
                        }}>Código incorrecto, por favor verifique e intente de nuevo.</small>
                    }
                </div>
                <div className="content_globe">
                    <img className="globle" src="MUNDO.png" />

                    <div className="road-content">
                        <img className="car-animate" src="CAR.png" />
                    </div>
                </div>
                {
                    company && company.id &&
                    <Modal initDiagnostic={this.initDiagnostic} />
                }

            </div>
        );
    }
}




const mapStateToProps = state => ({
    company: state.diagnosis.company,
    profile: state.diagnosis.profile,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        validateCompany,
        setInterestGroup
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

