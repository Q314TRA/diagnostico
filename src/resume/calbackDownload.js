import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import buildSvg from 'svg-to-dataurl';

import '../styles/resumev2.css';

import { setResumeCurrentAxis, logOut, generateReport, getConsolidateDiagnosis } from '../actions/actions';

// import AspectChart from "./aspectChart";
import AspectBarChart from "./aspectBarChart";
import Achievement from "./achievement";
import Challenge from "./challenge";
import ReportResumeDownload from "./reportResumeDownload";

import {
    axisProcessData, aspectProcessData, getChallengeFromQuestions, prioritizationChallenges
} from "../constantsGlobal"

class CalbackDownload extends Component {


    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { data, compileResume, generateReport } = this.props;
        generateReport(data, compileResume);
    }

    render() {


        return (
            <span ></span>
        )
    }

}


const mapStateToProps = state => ({});

function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(CalbackDownload);