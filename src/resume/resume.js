import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/resumev2.css';

import ItemResume from './itemResume';

import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';


const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



class Resume extends Component {


    constructor(props) {
        super(props);

        this.state = {
            mergeAspects: [],
            macroChallenge: {}
        }

        this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
        this.compileData = this.compileData.bind(this);
        this.CustomTooltip = this.CustomTooltip.bind(this);
        this.selectPie = this.selectPie.bind(this);
        this.selectAspectMerge = this.selectAspectMerge.bind(this);
    }


    selectAspectMerge(axis, aspect) {
        const { questions } = this.props;

        
        let result = questions.filter(question => question.eje == axis && question.aspectMerge == aspect)
            .reduce((a, b) => {
                a[b.macroChallenge] = Object.assign([], a[b.macroChallenge]);

                if (a[b.macroChallenge].indexOf(b.challenge) == -1) {
                    a[b.macroChallenge].push(b.challenge)
                }
                return a;
            }, {});


        this.setState({
            macroChallenge: result
        })

    }



    selectPie(params) {
        const { questions } = this.props;

        let axis = questions.filter(question => question.eje == params.name);

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

        // let mergeData = Object.assign(resume, mergeAspects);

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
                axis: params.name,
                aspect: result.aspect,
                percent: Math.round(percent * 10) / 10
            }
        })


        this.setState({
            mergeAspects: compileMergeData
        })


    }

    renderCustomizedLabel(params) {

        let { cx, cy, midAngle, innerRadius, outerRadius, percent, index, name } = params;

        console.log(params);

        let RADIAN = Math.PI / 180;


        let radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        let x = cx + radius * Math.cos(-midAngle * RADIAN);
        let y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <g>
                <text x={x > cx ? (x - 20) : (x + 20)} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                <text x={x > cx ? (x - 20) : (x + 20)} y={y + 20} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {/* {`${(percent * 100).toFixed(0)}%`} */}
                    {name}
                </text>
            </g>
        );
    };

    compileData() {
        const { questions } = this.props;

        let axis_resume = {};
        questions.forEach(question => {
            axis_resume[question.eje] = Object.assign({ numChecks: 0, sumChecks: 0 }, axis_resume[question.eje]);
            axis_resume[question.eje].numChecks += 1;
            axis_resume[question.eje].sumChecks += parseInt(question.weight ? question.weight : 0);
        });

        let axis = {};
        questions.filter(question => question.selected)
            .forEach(question => {
                axis[question.eje] = Object.assign({ numChecks: 0, sumChecks: 0 }, axis[question.eje]);
                axis[question.eje].numChecks += 1;
                axis[question.eje].sumChecks += parseInt(question.weight ? question.weight : 0);
            });

        let result = Object.keys(axis).map(_axis => {
            let percent = ((axis[_axis].sumChecks * 100) / axis_resume[_axis].sumChecks);
            let fragment = 100 / Object.keys(axis).length;
            let _percent = (fragment * percent) / 100;
            return {
                name: _axis,
                value: _percent
            }
        });
        console.log(result);
        return result;
    }
    CustomTooltip({ active, payload, label }) {
        if (active) {
            return (
                <div className="custom-tooltip">
                    {/* <p className="label">{`${label} : ${payload[0].value}`}</p>
              <p className="intro">{getIntroOfPage(label)}</p> */}
                    <p className="desc">Anything you want can be displayed here.</p>
                </div>
            );
        }

        return null;
    };


    render() {

        const data = this.compileData();

        return (
            <div className="resume-content-v2">
                <div className="resume-section">
                    <div className="content-chart">
                        <h3>Ejes</h3>
                        <div>
                            <PieChart width={400} height={400}>
                                <Pie
                                    onClick={this.selectPie}
                                    data={data}
                                    cx={200}
                                    cy={200}
                                    labelLine={false}
                                    label={this.renderCustomizedLabel}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {
                                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                </Pie>
                                <Tooltip content={this.CustomTooltip} />
                            </PieChart>
                        </div>
                    </div>
                    <div className="content-chart">
                        <h3>Capacidad</h3>
                        <div>
                            {this.state.mergeAspects.map(aspect => (
                                <p onClick={() => this.selectAspectMerge(aspect.axis, aspect.aspect)}>{`${aspect.aspect} ${aspect.percent}%`}</p>
                            ))}
                        </div>
                    </div>
                    <div className="content-chart">
                        <h3>Potencialidad</h3>
                        
                        {Object.keys(this.state.macroChallenge).map((macroCh) => (
                            <div>
                                <h4>{macroCh}</h4>
                                <ul>
                                    {this.state.macroChallenge[macroCh].map((ch) => (
                                        <li>{ch}</li>
                                    ))}
                                </ul>

                            </div>
                        ))}
                        <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</div>
                    </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Resume);