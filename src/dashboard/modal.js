import React, { Component } from 'react';
import { connect } from 'react-redux';

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interestGroupError: false,
            currentContactRole: null
        }
        this.initDiagnostic = this.initDiagnostic.bind(this);

    }

    initDiagnostic() {
        const { initDiagnostic } = this.props;

        if (this.state.currentContact) {
            initDiagnostic(this.state.currentContact);
        } else {
            this.setState({
                interestGroupError: true
            });
        }
    }

    render() {
        const { company } = this.props;

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
                        A continuación, se le presentarán los retos que fueron elegidos por el Laboratorio de BIOTICA con el conocimiento que hemos adquirido de la empresa, del sector y con el conocimiento que tenemos en temas de sostenibilidad.
                        <br /><br />
                        El resto de retos se les entregará en un documento de trabajo para que sea su guía de trabajo posteriormente.
                        </p>
                    </div>
                    <div className="aside-rigth">
                        <p className={this.state.interestGroupError ? "error" : ""}>Selecciona tu Rol.</p>
                        <div className="contact-status-content">
                            {company.colaborators.map(contact => (
                                <div className={
                                    this.state.currentContact && this.state.currentContact.id == contact.id ? "active" : ""} onClick={() => this.setState({ currentContact: contact })}>
                                    <img src="resources/icono-aplica-activo.png"></img>
                                    <p>
                                        <strong>{contact.role}</strong> <br />
                                        <small>{contact.name}</small>
                                    </p>
                                    {contact.status &&
                                        <div className={`bottom-section-status ${statusThumbBottomClass[contact.status.status]}`}>
                                            <p>{contact.status.status}</p>
                                        </div>
                                    }
                                    {!contact.status &&
                                        <div className="bottom-section-status">
                                            <p>Pendiente</p>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>

                        <button className="callback" onClick={this.initDiagnostic} >Continuar</button>

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

