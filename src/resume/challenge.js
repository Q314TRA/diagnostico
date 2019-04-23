import React, { Component } from 'react';
import ActiveShape from './activeShape';
import { PieChart, Pie, Sector } from 'recharts';

class Challenge extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { macroChallenge } = this.props;
        return (
            <div className="content-goals">
                <h3>Retos</h3>

                {Object.keys(macroChallenge).length == 0 &&
                    <p>Selecciona alguno de tus logros.</p>
                }

                {Object.keys(macroChallenge).map((macroCh) => (
                    <div>
                        <h4>{macroCh}</h4>
                        <ul>
                            {macroChallenge[macroCh].map((ch) => (
                                <li>{ch}</li>
                            ))}
                        </ul>

                    </div>
                ))}

            </div>
        );
    }


}

export default Challenge;