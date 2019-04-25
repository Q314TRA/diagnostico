import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom'

import { validateCompany, setInterestGroup } from "../actions/actions";

import '../styles/home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: "",
            interestGroup: "",
            interestGroupError: false
        }
        this.validate = this.validate.bind(this);
        this.initDiagnostic = this.initDiagnostic.bind(this);

    }

    validate() {
        const { validateCompany, history } = this.props;
        validateCompany(this.state.hash);
    }

    initDiagnostic() {
        const { setInterestGroup, history } = this.props;
        if (this.state.interestGroup != "") {
            setInterestGroup(this.state.interestGroup);
            history.push(`/diagnosis`);
        } else {
            this.setState({
                interestGroupError: true
            });
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
                            <p>
                                Con el fin de identificar el estado actual de su empresa en términos ambientales, sociales y
    económicos es muy importante contestar las siguientes preguntas con total consciencia y con
    la transparencia necesaria, pues este será el insumo para avanzar con nuestro diagnóstico
    inicial.
    <br /><br />
                                Debe seleccionar las preguntas para las cuales la respuesta sea SI, con total certeza.
                            </p>
                            <div className={this.state.interestGroupError ? "input-inline error" : "input-inline"} >
                                <label htmlFor="interestGroupTxt">Rol</label>
                                <input onChange={(element) => this.setState({ interestGroup: element.target.value })}
                                    name="interestGroupTxt" id="interestGroupTxt" placeholder="Director de la felicidad" />
                            </div>

                        </div>
                        <button className="callback" onClick={this.initDiagnostic} >Acepto</button>
                        {/* <Link to="/diagnosis"> Acepto </Link> */}
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
        validateCompany,
        setInterestGroup
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

