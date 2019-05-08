import React, { Component } from 'react';
import ActiveShape from './activeShape';
import { PieChart, Pie, Sector } from 'recharts';

class Challenge extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { macroChallenge, isExport } = this.props;
        return (
            <div className="section-challenge">
                {!isExport &&
                    <h3>Potencialidad</h3>
                }

                {Object.keys(macroChallenge).length == 0 &&
                    <p>Selecciona alguno de tus logros.</p>
                }

                <div className="section-content-table">
                    <div> <span style={{ backgroundColor: "#F44336" }} ></span> <span>Problemas</span> </div>
                    <div> <span style={{ backgroundColor: "#FFA000" }}></span> <span>Necesidades</span> </div>
                    <div> <span style={{ backgroundColor: "#4CAF50" }}></span> <span>Oportunidades</span> </div>
                </div>

                <div className="content-goals">
                    {Object.keys(macroChallenge).map((macroCh) => (
                        <div className={`goal-type type-${macroChallenge[macroCh].type}`}>
                            <h4>{macroCh}</h4>

                            {isExport &&
                                <span>
                                    <strong>Grupos</strong> <br />
                                    <small>{macroChallenge[macroCh].aspectMerge}</small>
                                </span>
                            }

                            <span>
                                <strong>Grupos de interes</strong> <br />
                                <small>{macroChallenge[macroCh].interestGroup}</small>
                            </span>
                            <p>
                                <strong>Beneficios: </strong><br /> {macroChallenge[macroCh].profit}
                            </p>

                            <div>
                                <span>{macroChallenge[macroCh].ODS}</span>
                                <img src="ODS/goal_1.png" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    }


}

export default Challenge;