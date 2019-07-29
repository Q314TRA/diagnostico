import React, { Component } from 'react';
import ActiveShape from './activeShape';
import { PieChart, Pie, Sector } from 'recharts';

class Challenge extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { macroChallenge, isExport } = this.props;

        let odsImg = {
            "SALUD Y BIENESTAR": "ODS/goal_3.png",
            "TRABAJO DECENTE Y CRECIMIENTO ECONÓMICO": "ODS/goal_8.png",
            "EDUCACIÓN DE CALIDAD": "ODS/goal_4.png",
            "IGUALDAD DE GÉNERO": "ODS/goal_5.png",
            "FIN DE LA POBREZA": "ODS/goal_1.png",
            "CIUDADES Y COMUNIDADES SOSTENIBLES": "ODS/goal_11.png",
            "PRODUCCIÓN Y CONSUMO RESPONSABLE": "ODS/goal_12.png",
            "AGUA LIMPIA Y SANAMIENTO": "ODS/goal_6.png",
            "INDUSTRIA, INNOVACIÓN E INFRASTRUCTURA": "ODS/goal_9.png",
            "ENERGIA ASEQUIBLE Y NO CONTAMINANTE": "ODS/goal_7.png",
            "ZERO HAMBRE": "ODS/goal_2.png",
            "PAZ, JUSTICIA E INSTITUCIONES SOLIDAS": "ODS/goal_16.png",
        }

        return (
            <div className="section-challenge">
                {!isExport &&
                    <h3>Potencialidad</h3>
                }

                {Object.keys(macroChallenge).length == 0 &&
                    <p>Selecciona alguna de tus <span style={{ color: "#D32F2F" }}>capacidades</span>.</p>
                }

                <div className="section-content-table">
                    <div> <span style={{ backgroundColor: "#F44336" }} ></span> <span>Problemas</span> </div>
                    <div> <span style={{ backgroundColor: "#FFA000" }}></span> <span>Necesidades</span> </div>
                    <div> <span style={{ backgroundColor: "#4CAF50" }}></span> <span>Oportunidades</span> </div>
                </div>

                <div className="content-goals">
                    {Object.keys(macroChallenge).map((macroCh) => (
                        <div className={`goal-type type-${macroChallenge[macroCh].type}`}>
                            <h4>{macroChallenge[macroCh].description}</h4>

                            {isExport &&
                                <span>
                                    <strong>Grupos</strong> <br />
                                    <small>{macroChallenge[macroCh].aspect}</small>
                                </span>
                            }

                            <span>
                                <strong>Grupos de interes</strong> <br />
                                <small>{macroChallenge[macroCh].interestGroup}</small>
                            </span>
                            <p>
                                <strong>Beneficios: </strong>
                                {macroChallenge[macroCh].profits && macroChallenge[macroCh].profits.map((profit) =>
                                    <span><br /> {profit.smallDescription}</span>
                                )}
                            </p>

                            <div>
                                <span>{macroChallenge[macroCh].ODS}</span>
                                <img src={odsImg[macroChallenge[macroCh].ODS]} />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    }


}

export default Challenge;