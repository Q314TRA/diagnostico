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
import CalbackDownload from "./calbackDownload";

import {
    axisProcessData, aspectProcessData, getChallengeFromQuestions, prioritizationChallenges
} from "../constantsGlobal"

class ExportResume extends Component {


    constructor(props) {
        super(props);
        this.state = {
            "AMBIENTAL": {
                name: "Ambiental",
                color: "#3485b6"
            },
            "ECONOMICO": {
                name: "Económico",
                color: "#55ad84"
            },
            "SOCIAL": {
                name: "Social",
                color: "#eb8232"
            }
        }

        this.getCompileResume = this.getCompileResume.bind(this);
        this.generateReport = this.generateReport.bind(this);

    }

    componentWillMount() {
        const { company, history, getConsolidateDiagnosis } = this.props;
        if (!company.id) {
            history.push(`/`);
            return;
        }

        getConsolidateDiagnosis(company.id);
    }

    getCompileResume() {
        const { questions } = this.props;

        let resumeCompiled = Object.keys(this.state).reduce((a, b, i) => {
            a[b] = {
                capacity: aspectProcessData(questions, b),
                potentiality: getChallengeFromQuestions(questions, b),
                name: this.state[b].name,
                color: this.state[b].color
            };
            return a;
        }, {});

        return resumeCompiled;
    }

    generateReport(axis, aspects) {
        const { generateReport, base64Charts, company } = this.props;

        let _aspects = Object.keys(aspects)
            .map(_axis => ({ key: _axis, chart: base64Charts[_axis], value: aspects[_axis] }))
            .map(item => {
                
                // let potentiality = Object.keys(item.value.potentiality);
                let potentiality = prioritizationChallenges(item.value.potentiality, item.value.capacity);

                item.value.potentiality = potentiality.map((quest) => ({ key: quest.challenge, value: quest }));
                
                return item;
            })

        let dataReport = {
            aspects: _aspects,
            axis: base64Charts.AXIS,
            companyName: company.name
        };
        generateReport(dataReport);
    }

    render() {
        const { questions } = this.props;

        const { pathReport, allowDowunloadReport, close } = this.props

        //Chart
        const data = axisProcessData(questions);
        //achievement
        const compileResume = this.getCompileResume();
        
        return (
            <div className="resume-compile-content">
                <span onClick={close} className="close-calback" >X</span>

                {allowDowunloadReport &&
                    <CalbackDownload data={data}
                        compileResume={compileResume} generateReport={this.generateReport} />
                }

                {pathReport && <ReportResumeDownload />}

                <div>
                    {!allowDowunloadReport &&
                        <div className="content-spinner">
                            <span>Generando informe </span> <div class="lds-dual-ring"></div>
                        </div>
                    }

                    <div className="resume-compile-section resume-compile-section-h" >
                        <div style={{ minWidth: "400px", height: "200px" }} ref={ch => this.chartAxis = ch}>
                            <h2>Ejes</h2>
                            <AspectBarChart
                                base64Name="AXIS"
                                data={data}
                                datakey="name"
                                dataValue="realPercent"
                                indexColor={true}
                                styles={{
                                    width: 600,
                                    height: 400,
                                    margin: { top: 5, right: 30, left: 20, bottom: 5 }
                                }}
                                parentSyle={{ width: "100%", height: "100%" }}
                            />
                        </div>
                    </div>

                    {Object.keys(compileResume).map(_axis => (
                        <div className="resume-compile-section resume-compile-section-v">
                            <h2 style={{ backgroundColor: compileResume[_axis].color }} className="section-header">{compileResume[_axis].name}</h2>

                            <h3>Capacidad</h3>
                            <div style={{ minWidth: "600px", height: "300px" }}>
                                <AspectBarChart
                                    base64Name={_axis}
                                    data={compileResume[_axis].capacity}
                                    datakey="aspect"
                                    dataValue="realPercent"
                                    styles={{
                                        width: 600,
                                        height: 300,
                                        margin: { top: 5, right: 30, left: 20, bottom: 5 },
                                        ywidth: 200
                                    }}
                                    parentSyle={{ width: "100%", height: "100%" }}
                                />
                            </div>
                            <h3>Potencialidad</h3>
                            <Challenge isExport={true} macroChallenge={prioritizationChallenges(compileResume[_axis].potentiality, compileResume[_axis].capacity)} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => ({
    questions: Object.assign([], state.diagnosis.questions).map((quest) => {
        let selected = state.diagnosis.consolidateDiagnosis
            .filter((response) => response.questionId == quest.id).length > 0;
        return { ...quest, selected };
    }),
    currentAxis: state.diagnosis.currentAxis,
    company: state.diagnosis.company,
    currentAxisResume: state.diagnosis.currentAxisResume,
    currentAspectMerge: state.diagnosis.currentAspectMerge,
    pathReport: state.diagnosis.pathReport,
    base64Charts: state.diagnosis.base64Charts,
    allowDowunloadReport: state.diagnosis.allowDowunloadReport
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setResumeCurrentAxis,
        logOut,
        generateReport,
        getConsolidateDiagnosis
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ExportResume);