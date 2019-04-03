import React, { Component } from 'react';
import ActiveShape from './activeShape';
import { PieChart, Pie, Sector } from 'recharts';

class ItemResume extends Component {

    constructor(props) {
        super(props);

        this.state = {
            axisData: {
                AMBIENTAL: {
                    name: "Ambiental",
                    color: "#8884d8"
                },
                ECONOMICO: {
                    name: "Economico",
                    color: "#8884d8"
                },
                SOCIAL: {
                    name: "Social",
                    color: "#8884d8"
                }
            },
            activeIndex: 0
        };

        this.getInitialState = this.getInitialState.bind(this);
        this.onPieEnter = this.onPieEnter.bind(this);
    }

    getInitialState() {
        return {
            activeIndex: 0,
        };
    }

    onPieEnter(data, index) {
        this.setState({
            activeIndex: index,
        });
    }
    render() {
        const { resumeAxis } = this.props;

        return (
            <div className="item-resume">
                {/* <h2 className={resumeAxis.axisName}>{this.state.axisData[resumeAxis.axisName].name}</h2>
                    <div className="item-status">
                        <img src={resumeAxis.resource}></img>
                        <span>{resumeAxis.statusPercent}%</span>
                    </div> */}

                <h2 className={resumeAxis.axisName}>{this.state.axisData[resumeAxis.axisName].name}</h2>

                <div className="batery-status">
                    <span className="percent-status">{resumeAxis.statusPercent}%</span>
                    <div style={{ height: `${resumeAxis.statusPercent}%` }} className="status-level"></div>
                </div>
                
                <div className="item-status-info" >
                    <div className="item-chat-aspects">
                        <PieChart width={500} height={400}>
                            <Pie
                                activeIndex={this.state.activeIndex}
                                activeShape={(props) => <ActiveShape context={{ ...props }} />}
                                data={resumeAxis.aspects}
                                cx={250}
                                cy={200}
                                innerRadius={50}
                                outerRadius={80}
                                fill={this.state.axisData[resumeAxis.axisName].color}
                                onMouseEnter={this.onPieEnter}
                            />
                        </PieChart>
                    </div>
                    <div className="item-aspects-reveal">
                        <h3>Aspectos faltantes</h3>
                        <div className="item-aspects-content">
                            <ul>
                                {resumeAxis.aspectsPendings.map((_aspect) => (
                                    <li className="item-aspects-item">{String(_aspect).toLowerCase()}</li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default ItemResume;