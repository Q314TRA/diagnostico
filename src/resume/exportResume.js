import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/resumev2.css';

import { setResumeCurrentAxis, logOut } from '../actions/actions';

// import AspectChart from "./aspectChart";
import AspectBarChart from "./aspectBarChart";
import Achievement from "./achievement";
import Challenge from "./challenge";



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


        this.compileData = this.compileData.bind(this);
        this.getAspectMerge = this.getAspectMerge.bind(this);
        this.getMergeAspects = this.getMergeAspects.bind(this);
        this.getCompileResume = this.getCompileResume.bind(this);

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
                value: Math.round(_percent),
                realPercent: percent
            }
        });

        return result;
    }

    getMergeAspects(currentAxisResume) {
        const { questions } = this.props;

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

    getAspectMerge(currentAxisResume) {
        const { questions } = this.props;

        let result = questions.filter(question => question.axis == currentAxisResume)
            .reduce((a, b) => {
                if (b.challenge) {
                    a[b.challenge] = Object.assign({}, a[b.challenge]);
                    if (a[b.challenge].aspectMerge && a[b.challenge].aspectMerge.indexOf(b.aspectMerge.toLowerCase()) == -1 ) {
                        a[b.challenge].aspectMerge +=  ", " + b.aspectMerge;
                    } else {
                        a[b.challenge] = b;
                    }
                    a[b.challenge].aspectMerge = String(a[b.challenge].aspectMerge).toLowerCase();
                }
                return a;
            }, {});

        return result;

    }

    getCompileResume() {

        let resumeCompiled = Object.keys(this.state).reduce((a, b, i) => {
            a[b] = {
                capacity: this.getMergeAspects(b),
                potentiality: this.getAspectMerge(b),
                name: this.state[b].name,
                color: this.state[b].color
            };
            return a;
        }, {});

        return resumeCompiled;
    }

    render() {

        //Chart
        const data = this.compileData();
        //achievement
        const compileResume = this.getCompileResume();


        return (
            <div className="resume-compile-content">
                <div>
                    <div className="resume-compile-section resume-compile-section-h" >
                        <div style={{ minWidth: "400px", height: "200px" }}>
                            <h2>Ejes</h2>
                            <AspectBarChart
                                data={data}
                                datakey="name"
                                dataValue="value"
                                indexColor={true}
                                styles={{
                                    width: 600,
                                    height: 400,
                                    margin: { top: 5, right: 30, left: 20, bottom: 5 }
                                }}
                                parentSyle={{ width: "100%", height: "100%" }}
                            />
                        </div>
                        <div>
                            <p>
                                <strong>Biotica</strong> <br /> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500
                            </p>
                        </div>
                    </div>

                    {Object.keys(compileResume).map(_axis => (
                        <div className="resume-compile-section resume-compile-section-v">
                            <h2 style={{ backgroundColor: compileResume[_axis].color }} className="section-header">{compileResume[_axis].name}</h2>

                            <h3>Capacidad</h3>
                            <div style={{ minWidth: "600px", height: "300px" }}>
                                <AspectBarChart
                                    data={compileResume[_axis].capacity}
                                    datakey="aspect"
                                    dataValue="percent"
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
                            <Challenge isExport={true} macroChallenge={compileResume[_axis].potentiality} />
                        </div>
                    ))}
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
        setResumeCurrentAxis,
        logOut
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ExportResume);