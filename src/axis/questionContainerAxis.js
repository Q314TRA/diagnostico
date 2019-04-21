import React, { Component } from 'react';
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

import { Scroller, scrollInitalState } from "react-skroll";

let unmount = false;
class QuestionContainerAxis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numItemsPerSection: 3,
            scroll: scrollInitalState,
            unmount: false
        }
        this.goToResume = this.goToResume.bind(this);

        this.myRef = React.createRef();

    }

    goToResume() {
        const { history } = this.props;
        this.setState({
            unmount: true
        })

        // this.scroll.deleteRef();

        

        // let mountNode = ReactDOM.findDOMNode(this.scroll);
        // let unmount = ReactDOM.unmountComponentAtNode(mountNode);


        // this.forceUpdate()
        // setTimeout(() => {
        //     history.push(`/resume`);
        // }, 100);
    }

    componentWillMount() {
        const { company, history } = this.props;
        if (!company.companyId) {
            history.push(`/`);
        }

    }



    render() {

        const { currentAxis, setCurrentAxis, currentQuests, company } = this.props;
        const { scroll } = this.state

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
                {company.companyId && !this.state.unmount &&
                    <Scroller
                        scrollRef={(ref) => {
                            this.scroll = ref
                        }}
                        autoScroll={true}
                        autoFrame={true}
                        onScrollChange={(scroll) => {
                            let newScroll = Object.assign({}, scroll);

                            let newChildens = newScroll.children.map((scl) => {
                                // scl.position = scl.position == 0? scl.position : scl.position - 30;
                                if (scl.start > 0) {
                                    let ofside = ((newScroll.viewHeight - scl.viewHeight) / 2);
                                    scl.start = scl.start - ofside;
                                }

                                return scl;
                            });
                            newScroll.children = newChildens;
                            console.log(newScroll);
                            this.setState({ scroll: newScroll })
                        }}
                    >
                        <TopSection />
                        {
                            _currentQuests.map((_quest) => (
                                <AspectSection quest={_quest} />
                            ))
                        }
                        <BottomSection goToResume={this.goToResume} gotScrollTop={() => this.scroll.scrollToPosition(scroll.start)} />
                    </Scroller>
                }
                <div className="navPanel">
                    {
                        scroll.children.map((child, i) =>
                            <img onClick={() => this.scroll.scrollToPosition(child.start)} src={`resources/${child.active ? 'dot-active' : 'dot'}.svg`} />
                        )
                    }
                </div>


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
