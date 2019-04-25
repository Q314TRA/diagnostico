import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Sector } from 'recharts';


import { setResumeCurrentAxis } from '../actions/actions';



class ActiveShape extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "AMBIENTAL": {
                text: "ambiental",
                icon: "resources/icono-ambiental.png",
                color: "#0097c2"
            },
            "SOCIAL": {
                text: "social",
                icon: "resources/icono-social.png",
                color: "#fe9601"
            },
            "ECONOMICO": {
                text: "económico",
                icon: "resources/icono-economico.png",
                color: "#00b796"
            }
        }
    }

    componentDidMount(){
        const { setResumeCurrentAxis, context: { name } } = this.props;
        setResumeCurrentAxis(name);
    }

    render() {
        const {
            context: { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
                fill, payload, percent, value, name, realPercent }
        } = this.props;

        const RADIAN = Math.PI / 180;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        let _percent = (percent * 100).toFixed(2);
        let textStatus = "Alto"

        if (realPercent < 30) {
            textStatus = "Bajo"
        } else if (realPercent < 70) {
            textStatus = "Medio"
        } else {
            textStatus = "Alto"
        }

        let _fill = this.state[name].color;
        console.log(realPercent);

        return (
            <g>
                <text x={cx} y={cy} dy={8} style={{
                    transform: "translateY(-45%)",
                    fontSize: "5vmin"
                }}
                    textAnchor="middle" fill={_fill}>{payload.name}</text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={_fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={_fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={_fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={_fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`# Nivel: ${textStatus}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Pct ${_percent}%)`}
                </text>
            </g>
        );

    }
}


const mapStateToProps = state => ({ });

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setResumeCurrentAxis
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ActiveShape);