import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCalificationChallenge, setCalificationChallenge } from '../../../actions/actions'
import { LIMIT_ASPECTS_SELECTED } from '../../../constantsGlobal'

import FloatQuestion from "./floatQuestion"
import FloatQuestionsContentBody from "./floatQuestionsContentBody"


let timeOutQuestions = null;
let manualTimeOutQuestions = null;

class FloatQuestionsContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            intState: false
        };
        this.close = this.close.bind(this);

    }
    close(e) {
        const { close } = this.props;
        e.stopPropagation();
        close();
    }
    render() {
        const { questionsFactEst,
            challenge,
            typePriority,
            close,
            setCalification,
            califications } = this.props;



        return (

            <div className="modal main-content">
                <a className="btn-close" onClick={this.close} >X</a>
                <div className={`modal-header ${challenge.type}`} >
                    <h4>{`${challenge.type}  - ${typePriority}`} </h4>
                </div>

                {!this.state.intState &&
                    <div className="modal-body intro">
                        <p>
                            Califique qué tan factible y estratégico es para su empresa, implementar la solución para cada reto, teniendo en cuenta los siguientes conceptos:
                        <br />
                            <strong>Factible:</strong>  Capacidades y recursos económicos, humanos y materiales que posee la empresa para implementar la solución del reto.
                        <br />
                            <strong>Estratégico:</strong>  Alineación del reto versus el propósito, valores, objetivos y metas que se ha planteado la empresa en los próximos años.
                        <br />
                            Escala de valoración:
                        <br />
                            1:  <strong>No.  Ninguno.</strong>
                        <br />
                            3:  <strong>Medianamente.</strong>
                        <br />
                            5:  <strong>Sí, totalmente.</strong>
                    </p>
                        <button onClick={()=>this.setState({
                            intState: true
                        })}>
                            Continuar
                    </button>
                    </div>
                }
                {this.state.intState &&
                    <FloatQuestionsContentBody
                        questionsFactEst={questionsFactEst}
                        challenge={challenge}
                        typePriority={typePriority}
                        close={close}
                        setCalification={setCalification}
                        califications={califications}
                    />
                }
            </div>
        );
    }
}


const mapStateToProps = state => ({
    interestGroup: state.diagnosis.interestGroup
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCalificationChallenge,
        setCalificationChallenge
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(FloatQuestionsContent);
