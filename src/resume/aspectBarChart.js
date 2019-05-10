import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList, Cell, ResponsiveContainer } from 'recharts';

import { setResumeCurrentAxis, generateBase64, initBase64 } from '../actions/actions';
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
        this.getSvgElement = this.getSvgElement.bind(this);

        this.chartReport = React.createRef();
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

    getSvgElement() {
        if (!this.chartReport.current)
            return "";

        let svgElement = this.chartReport.current.getElementsByTagName("svg");
        let htmlContent = "";

        if (svgElement.length > 0 && svgElement[0]) {
            svgElement[0].setAttribute("xmlns", "http://www.w3.org/2000/svg");
            htmlContent = svgElement[0].outerHTML;
        }
        return htmlContent;
    }


    componentDidMount() {
        const { base64Name, generateBase64, initBase64 } = this.props;
        if (base64Name) {
            initBase64({
                base64: "",
                key: base64Name
            });
            new Promise((resolve) => setTimeout(resolve, 2000))
                .then(() => {
                    let svgElement = this.getSvgElement();
                    generateBase64({
                        svg: svgElement,
                        key: base64Name
                    });
                })

        }
    }

    // xmlns="http://www.w3.org/2000/svg"

    // onClick={callback}
    render() {
        const { data, datakey, dataValue, indexColor, styles, parentSyle } = this.props;

        return (
            <div className="content-chart" style={parentSyle ? parentSyle : {}} ref={this.chartReport}>
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
        setResumeCurrentAxis,
        generateBase64, 
        initBase64
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AspectBarChart);
