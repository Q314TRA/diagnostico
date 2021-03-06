import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'

import '../styles/axis.css';
import { setCurrentAxis, getAllQuestios, updateStatusContact } from '../actions/actions';
import AspectSection from "./aspectSection";
import TopSection from "./topSection";
import BottomSection from "./bottomSection";
import question from './question';

import { Scroller, scrollInitalState } from "react-skroll-test";

class QuestionContainerAxis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numItemsPerSection: 3,
            scroll: scrollInitalState
        }
        this.goToResume = this.goToResume.bind(this);

        this.myRef = React.createRef();

    }

    goToResume() {
        const { history } = this.props;

        history.push(`/resume`);
        // history.push(`/aspects`);

    }

    componentWillMount() {
        const { company, history, getAllQuestios, interestGroup, updateStatusContact } = this.props;
        if (!company.id) {
            history.push(`/`);
            return;
        }
        // let contact = interestGroup;// company.colaborators.find((contact) => contact.role == interestGroup);

        getAllQuestios(company.id, interestGroup.id);
        // en proceso
        // finalizado

        updateStatusContact({
            colaboratorId: interestGroup.id,
            status: "en proceso"
        })
    }



    render() {

        const { currentAxis, setCurrentAxis, currentQuests, company } = this.props;
        const { scroll } = this.state

        let nItems = this.state.numItemsPerSection;

        let _currentQuests = currentQuests
        
            .sort((a, b) =>  (a.id < b.id) ? -1 :  (a.id > b.id) ? 1: 0)
            .map((question, index) => {
                question.questNumer = (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`;
                question.aspect = question.aspects.name;
                return question;
            })
            // .sort((a, b) => {
            //     var aAspect = a.aspect;
            //     var bAspect = b.aspect;
            //     var aId = a.id;
            //     var bId = b.id;

            //     if (aAspect == bAspect) {
            //         return (aId < bId) ? -1 : 0;
            //     }
            //     else {
            //         return (aAspect < bAspect) ? -1 : 1;
            //     }
            // })
            .reduce((a, b, i, g) => !(i % nItems) ? a.concat([g.slice(i, i + nItems)]) : a, []);

        return (


            <div className={`poll-content ${currentAxis}`} >
                {company.id &&
                    <Scroller
                        scrollRef={(ref) => this.scroll = ref}
                        autoScroll={true}
                        autoFrame={true}
                        onScrollChange={(scroll) => {
                            let newScroll = Object.assign({}, scroll);

                            let newChildens = newScroll.children.map((scl) => {
                                if (scl.start > 0) {
                                    let ofside = ((newScroll.viewHeight - scl.viewHeight) / 2);
                                    scl.start = scl.start - ofside;
                                }
                                return scl;
                            });

                            newScroll.children = newChildens;
                            this.setState({ scroll: newScroll })
                        }}>
                        <TopSection />
                        {_currentQuests.map((_quest) => (
                            <AspectSection quest={_quest} />
                        ))}
                        <BottomSection goToResume={this.goToResume} gotScrollTop={() => this.scroll.scrollToPosition(scroll.start)} />
                    </Scroller>
                }
                <div className="navPanel">
                    {scroll.children.map((child, i) =>
                        <img onClick={() => this.scroll.scrollToPosition(child.start)} src={`resources/${child.active ? 'dot-active' : 'dot'}.svg`} />
                    )}
                </div>


            </div>
        );
    }
}


const mapStateToProps = state => ({
    currentAxis: state.diagnosis.currentAxis,
    currentQuests: state.diagnosis.questions
        .filter(quest => quest.axis == state.diagnosis.currentAxis),
    company: state.diagnosis.company,
    interestGroup: state.diagnosis.interestGroup
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentAxis,
        getAllQuestios,
        updateStatusContact
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainerAxis);
