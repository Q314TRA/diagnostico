import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCalificationChallenge, setCalificationChallenge } from '../../../actions/actions'
import { LIMIT_ASPECTS_SELECTED } from '../../../constantsGlobal'

import FloatQuestion from "./floatQuestion"


let timeOutQuestions = null;
let manualTimeOutQuestions = null;

class FloatQuestionsContentBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentQuestionFloat: {},
            stepsQuestionFloat: 0,
            califications: {},
            intevalQuestios: 8000
        };

        this.setCalification = this.setCalification.bind(this);
        this.recursiveWizard = this.recursiveWizard.bind(this);
        this.setQuestion = this.setQuestion.bind(this);
        this.finallySteps = this.finallySteps.bind(this);
        this.close = this.close.bind(this);

    }

    componentDidMount() {

        const { califications } = this.props;
        this.setState({ califications: Object.assign({}, califications) });

        this.setQuestion(this.state.stepsQuestionFloat);
        this.recursiveWizard();

    }

    recursiveWizard() {
        const { questionsFactEst } = this.props;

        timeOutQuestions = window.setTimeout(() => {

            window.clearTimeout(manualTimeOutQuestions);

            let step = this.state.stepsQuestionFloat;
            let prevQeust = questionsFactEst[step++];

            if (!this.state.califications[prevQeust.id])
                this.setCalification(null, prevQeust)

            if (!questionsFactEst[step]) {
                this.finallySteps();
            } else {
                this.setQuestion(step);
                this.recursiveWizard();
            }

        }, this.state.intevalQuestios);
    }



    setQuestion(step) {
        const { questionsFactEst } = this.props;

        // if (!questionsFactEst[step]) {
        //     this.finallySteps();
        //     return;
        // }
        console.log("setQuestion", step, timeOutQuestions);
        this.setState({
            currentQuestionFloat: questionsFactEst[step],
            stepsQuestionFloat: step
        })
    }

    finallySteps() {
        const { setCalification } = this.props;
        setCalification(this.state.califications);
        console.log("finallySteps", timeOutQuestions)
        window.clearTimeout(timeOutQuestions);
    }

    setCalification(value, question) {
        const { questionsFactEst } = this.props;


        let calification = Object.assign({}, this.state.califications);
        calification[question.id] = value;
        this.setState({ califications: calification });

        if (value) {
            window.clearTimeout(timeOutQuestions);
            manualTimeOutQuestions = window.setTimeout(() => {
                let newStep = this.state.stepsQuestionFloat + 1;
                if (!questionsFactEst[newStep]) {
                    this.finallySteps();
                } else {
                    this.setQuestion(newStep);
                    this.recursiveWizard();
                }
            }, 1000)
        }

    }

    close(e) {
        const { close } = this.props;
        e.stopPropagation();
        close();
    }

    componentWillUnmount() {
        window.clearTimeout(timeOutQuestions);
        window.clearTimeout(manualTimeOutQuestions);
    }

    render() {
        const { challenge, typePriority } = this.props;

        let _value = 0;

        if (this.state.currentQuestionFloat && this.state.califications) {
            _value = this.state.califications[this.state.currentQuestionFloat.id];
        }

        return (
            <div className="modal-body">
                <small className="md-up">{challenge.description}</small>

                {this.state.currentQuestionFloat &&
                    <FloatQuestion
                        questionFloat={this.state.currentQuestionFloat}
                        setCalification={this.setCalification}
                        selectedValue={_value}
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


export default connect(mapStateToProps, mapDispatchToProps)(FloatQuestionsContentBody);
