

import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'

import '../styles/axis.css';
import { setCurrentAxis, getAllQuestios } from '../actions/actions';
import AspectSection from "./aspectSection";
import TopSection from "./topSection";
import BottomSection from "./bottomSection";
import question from './question';

// import { Scroller, scrollInitalState } from "react-skroll";

import ReactSnapScroll from 'react-snap-scroll';

let unmount = false;
class QuestionContainerAxis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numItemsPerSection: 3,
            unmount: false,
        }
        this.sections = {};

        this.goToResume = this.goToResume.bind(this);
        this.myRef = React.createRef();
        this.customProgresiveScroll = this.customProgresiveScroll.bind(this);
        this.pushRef = this.pushRef.bind(this);
        this.gotToSection = this.gotToSection.bind(this);

        this.pollContent = createRef();
    }

    componentDidMount() {
    }

    goToResume() {
        const { history } = this.props;
        history.push(`/resume`);

    }

    componentWillMount() {
        const { company, history } = this.props;
        if (!company.companyId) {
            history.push(`/`);
        }
    }

    customProgresiveScroll(event) {
        console.log(event);
        event.preventDefault();
        event.stopPropagation();
    }

    gotToSection(indexSection) {
        var elem = this.pollContent.current;
        var nameNodes = elem.children;
        console.log("referencia", nameNodes);
        

    }

    pushRef(ref, i) {
        this.sections[i] = ref;
    }


    render() {

        const { currentAxis, setCurrentAxis, currentQuests, company } = this.props;

        let nItems = this.state.numItemsPerSection;

        let _currentQuests = currentQuests
            .sort((a, b) => a.aspect - b.aspect)
            .map((question, index) => {
                question.questNumer = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
                return question;
            })
            .reduce((a, b, i, g) => !(i % nItems) ? a.concat([g.slice(i, i + nItems)]) : a, []);

        return (
            <div ref={this.pollContent} className={`poll-content ${currentAxis}`} onScrollCapture={this.customProgresiveScroll}>
                <TopSection />
                {_currentQuests.map((_quest, i) => (
                    <AspectSection quest={_quest} />
                ))}
                <BottomSection goToResume={this.goToResume} gotScrollTop={() => { }} />
{/* 
                <div className="navPanel">
                    {
                        _currentQuests.map((child, i) =>
                            <img onClick={() => this.gotToSection(this.sections[i])} src={`resources/${child.active ? 'dot-active' : 'dot'}.svg`} />
                        )
                    }
                </div> */}
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
