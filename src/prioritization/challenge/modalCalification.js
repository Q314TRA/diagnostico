import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCalificationChallenge, setCalificationChallenge } from '../../actions/actions'

import { LIMIT_ASPECTS_SELECTED } from '../../constantsGlobal'

class ModalCalification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EST: null,
            FACT: null
        }
        this.setCalification = this.setCalification.bind(this);
        this.saveCalification = this.saveCalification.bind(this);
        this.getDootClass = this.getDootClass.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        const { getCalificationChallenge, challenge, interestGroup } = this.props;
        getCalificationChallenge({
            colaboratorId: challenge.id,
            challengeId: interestGroup.id
        })
    }

    setCalification(type, value) {

        const { setCalificationChallenge, challenge, calification } = this.props;

        setCalificationChallenge({
            challengeId: challenge.id,
            fact: type == "fact" ? value : calification.fact,
            est: type == "est" ? value : calification.est
        })

    }

    saveCalification(e) {
        const { saveCalification, challenge, calification } = this.props;
        e.stopPropagation();
        saveCalification(challenge, calification);
    }

    getDootClass(type, value) {
        const { calification } = this.props;
        return `${calification[type] == value ? "active" : ""}`
    }

    close(e) {
        const { close } = this.props;
        e.stopPropagation();
        close();
    }

    render() {
        const { challenge, calification } = this.props;
        return (
            <div className="main-modal-content">
                <div className="modal-fade" ></div>
                <div className="modal main-content">
                    {/* <a className="btn-close" onClick={this.close} >X</a> */}
                    <div className={`modal-header ${challenge.type}`} >
                        <p>{challenge.type}</p>
                    </div>
                    <div className="modal-body">
                        <p>{challenge.description}</p>
                        <div className="prioritizantion-content">
                            <div className="prioritization-item">
                                <div>
                                    <h4>Factible <small>Califique considerando que!</small></h4>
                                    <p>
                                        ¿Destinaría la empresa recursos financieros y humanos?<br />
                                        ¿Tiene capacidades internas?<br />
                                        ¿Qué grado de interés tiene este reto?<br />
                                        ¿Hay autonomía no requiere autorización de Junta?
                                    </p>

                                </div>
                                <div className="doot-calification">
                                    <span className={this.getDootClass("fact", 1)} onClick={() => this.setCalification("fact", 1)} >1</span>
                                    <span className={this.getDootClass("fact", 3)} onClick={() => this.setCalification("fact", 3)} >3</span>
                                    <span className={this.getDootClass("fact", 5)} onClick={() => this.setCalification("fact", 5)} >5</span>
                                </div>
                            </div>
                            <div className="prioritization-item">
                                <div>
                                    <h4>Estrategico <small>Califique considerando que!</small></h4>
                                    <p>
                                        ¿Está alineado con el Propósito de la empresa?<br />
                                        ¿Genera valor a los grupos de Interés?<br />
                                        ¿Impacta positivamente sobre el negocio?<br />
                                        ¿Crea ventaja competitiva?
                                    </p>
                                </div>
                                <div className="doot-calification">
                                    <span className={this.getDootClass("est", 1)} onClick={() => this.setCalification("est", 1)} >1</span>
                                    <span className={this.getDootClass("est", 3)} onClick={() => this.setCalification("est", 3)} >3</span>
                                    <span className={this.getDootClass("est", 5)} onClick={() => this.setCalification("est", 5)} >5</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="cancel" onClick={this.close} >Cancelar</button>
                        <button className="success" onClick={this.saveCalification}>Guardar</button>

                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    interestGroup: state.diagnosis.interestGroup,
    calification: state.diagnosis.currentChallengeCalification
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCalificationChallenge,
        setCalificationChallenge
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalCalification);
