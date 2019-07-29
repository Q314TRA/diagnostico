import React, { Component } from 'react';
import { connect } from 'react-redux';

class ModalContacts extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { company, closeModal , continueModal }  = this.props;

        let statusThumbBottomClass = {
            "pendiente": "pendiente",
            "en proceso": "warning",
            "finalizado": "success"
        }

        return (

            <div className="modal modal-small">
                <span onClick={closeModal} className="close">X</span>
                <div className="modalContent modalContent-column">
                    <p>
                        <strong>Felicidades</strong>,
                        el informe que se generar a continuación, contiene el análisis de las
                        respuestas que cada unos de tus colaboradores diligencio.
                    </p>

                    <div className="contact-status-content">
                        {company.colaborators.map(contact => (
                            <div>
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

                    <button className="callback" onClick={continueModal} >Continuar</button>


            </div>


            </div >


        );
    }
}




const mapStateToProps = state => ({
    company: state.diagnosis.company
});

function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalContacts);

