import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/axis.css';

import { setCurrentAxis, getAllQuestios } from '../actions/actions';

import Panel from './panel';
import QuestionContainer from './questionContainer';


import Loading from '../dashboard/loading';


class QuestionContainerAxis extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { getAllQuestios } = this.props;
        getAllQuestios();   
    }

    render() {

        const { currentAxis, setCurrentAxis } = this.props;
        return (
            <div className="poll-content"  >
                <Loading />
                <div className={`axis-container ${currentAxis ? 'active' : ''}`} >
                    <Panel axis="AMBIENTAL" />
                    <Panel axis="SOCIAL" />
                    <Panel axis="ECONOMICO" />
                </div>
                <div className="poll-content-body">
                    <span className={`close-content-body ${currentAxis ? currentAxis : ""}`} onClick={() => setCurrentAxis("")}>X</span>
                    {currentAxis && <QuestionContainer /> }
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    currentAxis: state.diagnosis.currentAxis
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentAxis,
        getAllQuestios
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainerAxis);
