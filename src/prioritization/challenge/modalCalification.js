import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCalificationChallenge, setCalificationChallenge, getQuestionsFactEst } from '../../actions/actions'

import { LIMIT_ASPECTS_SELECTED } from '../../constantsGlobal'

import FloatQuestionsContent from './floatQuestions/floatQuestionsContent'


class ModalCalification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrioritizantionType: null,

        }
        this.setCalification = this.setCalification.bind(this);
        this.saveCalification = this.saveCalification.bind(this);
        this.getDootClass = this.getDootClass.bind(this);
        this.closeFloatQuestiosModal = this.closeFloatQuestiosModal.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        const { getCalificationChallenge, challenge, interestGroup, getQuestionsFactEst } = this.props;
        getCalificationChallenge(challenge);
        getQuestionsFactEst();
    }

    setCalification(type, value) {

        const { setCalificationChallenge, challenge, calification } = this.props;


        this.closeFloatQuestiosModal();
        // console.log(type, value);

        setCalificationChallenge({
            challengeId: challenge.id,
            factible: type == "factible" ? value : calification.factible,
            estrategico: type == "estrategico" ? value : calification.estrategico
        })

    }

    closeFloatQuestiosModal() {
        this.setState({
            currentPrioritizantionType: null
        })
    }

    saveCalification(e) {
        const { saveCalification, challenge, calification } = this.props;
        e.stopPropagation();

        console.log("saveCalification", challenge, calification)

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
        const { challenge, calification, questionsFactEst } = this.props;

        let _questionsFactEst = questionsFactEst.reduce((a, b, i) => {
            a[b.type] = Object.assign([], a[b.type]);
            a[b.type].push(b);
            return a;
        }, {});

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

                            {Object.keys(_questionsFactEst).map(prioritizationType =>
                                <div className="prioritization-item" onClick={() => this.setState({
                                    currentPrioritizantionType: prioritizationType
                                })}>
                                    <h4>{prioritizationType}</h4>
                                    <small>Click aqui!</small>

                                    {calification[prioritizationType] &&
                                        <img src="resources/icono-aplica.svg" />
                                    }


                                    {this.state.currentPrioritizantionType == prioritizationType &&
                                        <FloatQuestionsContent
                                            questionsFactEst={_questionsFactEst[prioritizationType]}
                                            challenge={challenge}
                                            typePriority={prioritizationType}
                                            close={this.closeFloatQuestiosModal}
                                            setCalification={(value) => this.setCalification(prioritizationType, value)}
                                            califications={calification[prioritizationType]}
                                        />
                                    }
                                </div>

                            )}


                            {/* <div className="prioritization-item">
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
                            </div> */}

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
    calification: state.diagnosis.currentChallengeCalification,
    questionsFactEst: state.diagnosis.questionsFactEst
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCalificationChallenge,
        setCalificationChallenge,
        getQuestionsFactEst
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalCalification);
