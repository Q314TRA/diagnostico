import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList, Cell, ResponsiveContainer } from 'recharts';

import { setResumeCurrentAxis } from '../actions/actions';
import ActiveShape from './activeShape';

const COLORS = {
    SOCIAL: "#eb8228",
    ECONOMICO: "#4bad84",
    AMBIENTAL: "#3385b6"
}

// ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class AspectBarChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        }

        this.onPieEnter = this.onPieEnter.bind(this);
        this.selectPie = this.selectPie.bind(this);
        this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
        this.callbackChart = this.callbackChart.bind(this);
    }

    onPieEnter(data, index) {
        this.setState({
            activeIndex: index,
        });
    }

    selectPie(params) {
        const { setResumeCurrentAxis } = this.props;
        setResumeCurrentAxis(params.name);
    }


    renderCustomizedLabel(props) {
        const { x, y, width, height, value } = props;
        const radius = 10;

        console.log(props);
        return (
            <g>
                <circle cx={x + width + radius} cy={y + height / 2} r={radius} fill="#8884d8" />
                <text x={x + width + radius} y={y + height / 2} fill="#fff" textAnchor="middle" dominantBaseline="middle">
                    {value}
                </text>
            </g>
        );
    };

    callbackChart(params) {
        const { data, datakey, dataValue, callback, indexColor, styles } = this.props;
        if (callback && params && params.activePayload && params.activePayload.length > 0) {
            callback(params.activePayload[0].payload)
        }
    }
    // onClick={callback}
    render() {
        const { data, datakey, dataValue, indexColor, styles, parentSyle } = this.props;

        return (
            <div className="content-chart" style={parentSyle ? parentSyle : {}}>
                <ResponsiveContainer>
                    <BarChart
                        layout='vertical'
                        width={styles.width}
                        height={styles.height}
                        data={data}
                        margin={styles.margin}
                        onClick={this.callbackChart}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis domain={[0, 100]} type="number" dataKey={dataValue} />
                        <YAxis width={styles.ywidth ? styles.ywidth : 100} type="category" dataKey={datakey} />
                        <Tooltip />
                        <Bar dataKey={dataValue} fill="#8884d8" minPointSize={5}>
                            {data.map((entry, index) => (
                                <Cell fill={indexColor ? COLORS[entry.name] : "#8884d8"} />
                            ))}
                            {/* <LabelList dataKey="value" content={this.renderCustomizedLabel} /> */}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }


}


const mapStateToProps = state => ({
    currentAxisResume: state.diagnosis.currentAxisResume
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setResumeCurrentAxis
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AspectBarChart);
