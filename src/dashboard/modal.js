import React, { Component } from 'react';
import { connect } from 'react-redux';

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interestGroupError: false,
            currentContactRole: ""
        }
        this.initDiagnostic = this.initDiagnostic.bind(this);

    }

    initDiagnostic() {
        const { setInterestGroup, history, initDiagnostic } = this.props;
        if (this.state.currentContactRole != "") {
            initDiagnostic(this.state.currentContactRole);
        } else {
            this.setState({
                interestGroupError: true
            });
        }
    }

    render() {
        const { company, history } = this.props;

        let statusThumbBottomClass = {
            "pendiente": "pendiente",
            "en proceso": "warning",
            "finalizado": "success"
        }


        return (

            <div className="modal">

                <div className="modalContent">

                    <div className="aside-left">
                        <h3>Hola {company.name}</h3>
                        <p>
                            Con el fin de identificar el estado actual de su empresa en términos ambientales, sociales y económicos es muy importante contestar las siguientes preguntas con total consciencia y con la transparencia necesaria, pues este será el insumo para avanzar con nuestro diagnóstico inicial.
                        <br /><br />
                            Debe seleccionar las preguntas para las cuales la respuesta sea SI, con total certeza.
                        </p>
                    </div>
                    <div className="aside-rigth">
                        <p className={this.state.interestGroupError ? "error" : ""}>Selecciona tu Rol.</p>
                        <div className="contact-status-content">
                            {company.contactCompanies.map(contact => (
                                <div className={this.state.currentContactRole == contact.role ? "active" : ""} onClick={() => this.setState({ currentContactRole: contact.role })}>
                                    <img src="resources/icono-aplica-activo.png"></img>
                                    <p>
                                        <strong>{contact.role}</strong> <br />
                                        <small>{contact.name}</small>
                                    </p>
                                    {contact.diagnosisCompanyStatus &&
                                        <div className={`bottom-section-status ${statusThumbBottomClass[contact.diagnosisCompanyStatus.status]}`}>
                                            <p>{contact.diagnosisCompanyStatus.status}</p>
                                        </div>
                                    }
                                    {!contact.diagnosisCompanyStatus &&
                                        <div className="bottom-section-status">
                                            <p>Pendiente</p>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                        {/* <div className="content-input">

                            <div className={this.state.interestGroupError ? "input-inline error" : "input-inline"} >
                                <label htmlFor="interestGroupTxt">Rol</label>
                                <select className="input" onChange={(element) => this.setState({ interestGroup: element.target.value })}
                                    name="interestGroupTxt" id="interestGroupTxt" placeholder="Director de la felicidad" >
                                    <option disabled selected value>Selecciona una opcion</option>
                                    {
                                        company.contactCompanies.map(contact => (
                                            <option value={contact.role} >{contact.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div> */}
                        {/* <input onChange={(element) => this.setState({ interestGroup: element.target.value })}
                name="interestGroupTxt" id="interestGroupTxt" placeholder="Director de la felicidad" /> */}
                        <button className="callback" onClick={this.initDiagnostic} >Continuar</button>
                        {/* <Link to="/diagnosis"> Acepto </Link> */}
                    </div>

                </div>




            </div>


        );
    }
}




const mapStateToProps = state => ({
    company: state.diagnosis.company
});

function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Modal);

