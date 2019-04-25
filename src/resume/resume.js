import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/resumev2.css';

import { setResumeCurrentAxis } from '../actions/actions';

import AspectChart from "./aspectChart";
import Achievement from "./achievement";
import Challenge from "./challenge";



class Resume extends Component {


    constructor(props) {
        super(props);

        this.compileData = this.compileData.bind(this);
        this.getAspectMerge = this.getAspectMerge.bind(this);
        this.getMergeAspects = this.getMergeAspects.bind(this);
    }

    componentWillMount() {
        const { company, history } = this.props;
        if (!company.companyId) {
            history.push(`/`);
        }
    }

    compileData() {
        const { questions } = this.props;

        let axis_resume = {};
        questions.forEach(question => {
            axis_resume[question.axis] = Object.assign({ numChecks: 0, sumChecks: 0 }, axis_resume[question.axis]);
            axis_resume[question.axis].numChecks += 1;
            axis_resume[question.axis].sumChecks += parseInt(question.weight ? question.weight : 0);
        });

        let axis = {};
        questions.filter(question => question.selected)
            .forEach(question => {
                axis[question.axis] = Object.assign({ numChecks: 0, sumChecks: 0 }, axis[question.axis]);
                axis[question.axis].numChecks += 1;
                axis[question.axis].sumChecks += parseInt(question.weight ? question.weight : 0);
            });

        let result = Object.keys(axis).map(_axis => {
            let percent = ((axis[_axis].sumChecks * 100) / axis_resume[_axis].sumChecks);
          
            let fragment = 100 / Object.keys(axis).length;
            let _percent = (fragment * percent) / 100;
          
            return {
                name: _axis,
                value: _percent,
                realPercent: percent
            }
        });

        return result;
    }

    getMergeAspects() {
        const { questions, currentAxisResume } = this.props;

        let axis = questions.filter(question => question.axis == currentAxisResume);

        let resume = axis.reduce((a, b, i, o) => {

            a[b.aspectMerge] = Object.assign({ numChecks: 0, sumChecks: 0 }, a[b.aspectMerge]);
            a[b.aspectMerge].numChecks += 1;
            a[b.aspectMerge].sumChecks += parseInt(b.weight);
            return a;
        }, {})

        let mergeAspects = axis.filter(question => question.selected)
            .reduce((a, b, i, o) => {
                a[b.aspectMerge] = Object.assign({ numChecks: 0, sumChecks: 0 }, a[b.aspectMerge]);
                a[b.aspectMerge].numChecks += 1;
                a[b.aspectMerge].sumChecks += parseInt(b.weight);
                return a;
            }, {})

        let compileMergeData = Object.keys(resume).map(aspect => {
            let sumChecks = (mergeAspects[aspect] ? mergeAspects[aspect].sumChecks : 0);
            let percent = ((sumChecks * 100) / resume[aspect].sumChecks);

            return {
                aspect,
                percent: Math.floor(percent)
            }
        }).map((result, index, object) => {
            let totalPercent = object.reduce((a, b, i, o) => {
                return a + b.percent
            }, 0);
            let percent = (result.percent * 100) / totalPercent;

            return {
                axis: currentAxisResume,
                aspect: result.aspect,
                percent: Math.round(percent * 10) / 10
            }
        });

        return compileMergeData;
    }

    getAspectMerge() {
        const { questions, currentAxisResume, currentAspectMerge } = this.props;

        let result = questions.filter(question => question.axis == currentAxisResume && question.aspectMerge == currentAspectMerge)
            .reduce((a, b) => {
                a[b.macroChallenge] = Object.assign([], a[b.macroChallenge]);
                if (a[b.macroChallenge].indexOf(b.challenge) == -1) {
                    a[b.macroChallenge].push(b.challenge)
                }
                return a;
            }, {});

        return result;

    }



    render() {

        //Chart
        const data = this.compileData();
        //achievement
        const mergeAspects = this.getMergeAspects();
        //challenge
        const aspectMerge = this.getAspectMerge();


        return (
            <div className="resume-content-v2">

                <div className="top-nav-content">
                    <img src="resources/logo-biotica-color.png" />
                </div>
                <div className="resume-section">
                    <div>
                        <AspectChart data={data} />
                        <div className="section-aspects">
                            <Achievement mergeAspects={mergeAspects} />
                            <Challenge macroChallenge={aspectMerge} />

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => ({
    questions: state.diagnosis.questions,
    currentAxis: state.diagnosis.currentAxis,
    company: state.diagnosis.company,
    currentAxisResume: state.diagnosis.currentAxisResume,
    currentAspectMerge: state.diagnosis.currentAspectMerge
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setResumeCurrentAxis
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Resume);