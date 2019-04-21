import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'

import '../styles/axis.css';
import { setCurrentAxis, getAllQuestios } from '../actions/actions';
import AspectSection from "./aspectSection";
import TopSection from "./topSection";
import BottomSection from "./bottomSection";
import question from './question';



class QuestionContainerAxis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numItemsPerSection: 3
        }

    }

    componentWillMount() {
        const { company, history } = this.props;
        if (!company.companyId) {
            history.push(`/`);
        }

    }

    render() {

        const { currentAxis, setCurrentAxis, currentQuests } = this.props;

        let nItems = this.state.numItemsPerSection;

        let _currentQuests = currentQuests
            .sort((a, b) => a.aspect - b.aspect)
            .map((question, index) => {
                question.questNumer = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
                return question;
            })
            .reduce((a, b, i, g) => !(i % nItems) ? a.concat([g.slice(i, i + nItems)]) : a, []);

        return (
            <div className="poll-content" >
                <TopSection />

                {
                    _currentQuests.map((_quest) => (
                        <AspectSection quest={_quest} />
                    ))
                }
                <BottomSection />

            </div>
        );
    }
}


const mapStateToProps = state => ({
    currentAxis: state.diagnosis.currentAxis,
    currentQuests: state.diagnosis.questions
        .filter(quest => quest.axis == state.diagnosis.currentAxis),
    company: state.diagnosis.company
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentAxis,
        getAllQuestios
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainerAxis);
