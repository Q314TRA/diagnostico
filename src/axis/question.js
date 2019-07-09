import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { putAnswer, deleteAnswer } from "../actions/actions";

class Question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            btnCheck: {
                checked: "resources/icono-aplica-activo.png",
                unChecked: "resources/icono-aplica.png"
            },
            btnUnCheck: {
                checked: "resources/icono-noaplica-activo.png",
                unChecked: "resources/icono-noaplica.png"
            }
        }

        this.putAnswer = this.putAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);

    }

    componentDidMount() {
        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, (Math.random() * 100) + 700);
        }).then(() => {
            this.setState({ show: true });
        })
    }

    putAnswer(questionId ) {
        const { putAnswer, company, interestGroup } = this.props;
        putAnswer({
            "companyId": company.id,
            "colaboratorId": interestGroup.id,
            "questionId": questionId
        });

    }

    deleteAnswer(questionId ) {
        const { deleteAnswer, company, interestGroup } = this.props;

        deleteAnswer({
            "companyId": company.id,
            "colaboratorId": interestGroup.id,
            "questionId": questionId
        })
    }



    render() {
        const { quest } = this.props;
        return (
            <div className={`quest ${this.state.show ? "show" : ""} ${quest.selected ? "selected" : ""}`}  >
                <div className="quest-text">
                    <span>{quest.questNumer}</span>
                    <p>{quest.question}</p>
                </div>
                <div className="quest-callback">
                    {quest.selected &&
                        <img onClick={() => this.deleteAnswer(quest.id)} src={this.state.btnUnCheck.unChecked}></img>
                    }
                    <img onClick={() => this.putAnswer(quest.id)}
                        src={quest.selected ? this.state.btnCheck.checked : this.state.btnCheck.unChecked}></img>
                </div>

            </div>
        );
    }
}


const mapStateToProps = state => ({
    company: state.diagnosis.company,
    interestGroup: state.diagnosis.interestGroup
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        putAnswer,
        deleteAnswer
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Question);
