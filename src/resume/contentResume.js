import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/resume.css';

import ItemResume from './itemResume';

class ContentResume extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currentAxis: "SOCIAL"
        };

        this.gestStatusResume = this.gestStatusResume.bind(this);
        this.getResourceBatery = this.getResourceBatery.bind(this);
    }


    gestStatusResume() {
        const { questions } = this.props;

        let resumeStatusAxis = questions.reduce((a, b, i) => {
            if (a[b.eje] == undefined || a[b.eje] == null)
                a[b.eje] = { count: 0, checked: 0 };

            if (b.selected)
                a[b.eje].checked += 1;

            a[b.eje].count += 1;
            return a;
        }, {});


        let resumeStatusAxisAspectChart = questions.reduce((a, b, i) => {
            if (a[b.eje] == undefined || a[b.eje] == null)
                a[b.eje] = {};

            if (b.selected) {
                if (a[b.eje][b.aspect] == undefined || a[b.eje][b.aspect] == null)
                    a[b.eje][b.aspect] = 0;

                a[b.eje][b.aspect] += 1;
            }
            return a;
        }, {});


        // let resumeStatusAxisAspectChartPendings = questions.reduce((a, b, i) => {
        //     if (a[b.eje] == undefined || a[b.eje] == null)
        //         a[b.eje] = {};

        //     let _aspects = Object.keys(resumeStatusAxisAspectChart[b.eje]);

        //     if (_aspects.indexOf(b.aspect) == -1)
        //         a[b.eje][b.aspect] = true;
        //     return a;
        // }, {});
        let resumeStatusAxisAspectChartPendings = questions.reduce((a, b, i) => {
            if (a[b.eje] == undefined || a[b.eje] == null)
                a[b.eje] = {};

            if (b.selected) {
                if (a[b.eje][b.macroChallenge] == undefined || a[b.eje][b.macroChallenge] == null)
                    a[b.eje][b.macroChallenge] = []

                if (a[b.eje][b.macroChallenge].indexOf(b.challenge) == -1 )
                    a[b.eje][b.macroChallenge].push(b.challenge);

            }
            return a;
        }, {});

        let currentDAta = Object.keys(resumeStatusAxis).map((axisName) => {
            return {
                axisName,
                statusPercent: Math.round((resumeStatusAxis[axisName].checked * 100) / resumeStatusAxis[axisName].count),
                resource: this.getResourceBatery(resumeStatusAxis[axisName]),
                aspects: Object.keys(resumeStatusAxisAspectChart[axisName]).map(key => ({ name: key, value: resumeStatusAxisAspectChart[axisName][key] })),
                aspectsPendings: resumeStatusAxisAspectChartPendings[axisName]
            }
        });

        return currentDAta;
    }

    getResourceBatery(resource) {
        let checked = resource.checked;
        let count = resource.count;

        let _media = count / 6;

        let resourceNum = Math.floor(checked / _media);

        return `batery_${resourceNum == 0 ? 1 : resourceNum}.png`
    }

    render() {
        const _resume = this.gestStatusResume();
        return (
            <div className="resume-content">
                {/* <h1>Resumen diagnostico</h1> */}
                {/* {this.gestStatusResume().map((item) => <ItemResume resumeAxis={item} />)} */}

                <div className="main-content">
                    <div>
                        {_resume.filter((item) => item.axisName == this.state.currentAxis)
                            .map((item) => <ItemResume resumeAxis={item} />)}
                    </div>
                </div>

                <div className="bottom-content-nav">
                    {_resume.map((item) => (
                        <div onClick={() => this.setState({ currentAxis: item.axisName })}>
                            <span>{String(item.axisName).toLowerCase()}</span>
                        </div>
                    ))}

                </div>
            </div>
        )
    }

}


const mapStateToProps = state => ({
    questions: state.diagnosis.questions
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentResume);