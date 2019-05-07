import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AspectBarChart from "./aspectBarChart";


import { setResumeCurrentAxis, setResumeCurrentAspect } from '../actions/actions';

class Achievement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            axis: {
                "SOCIAL": {
                    text: "Social",
                    icon: "resources/icono-social.png",
                    color: "#8884d8"
                },
                "AMBIENTAL": {
                    text: "Ambiental",
                    icon: "resources/icono-ambiental.png",
                    color: "#8884d8"
                },
                "ECONOMICO": {
                    text: "Económico",
                    icon: "resources/icono-economico.png",
                    color: "#8884d8"
                }
            }
        }

        this.selectAxis = this.selectAxis.bind(this);
        this.selectAspectMerge = this.selectAspectMerge.bind(this);

    }

    selectAxis(axis) {
        const { setResumeCurrentAxis } = this.props;
        setResumeCurrentAxis(axis);
    }

    selectAspectMerge(aspect) {
        const { setResumeCurrentAspect } = this.props;
        setResumeCurrentAspect(aspect.aspect);
    }

    render() {
        const { mergeAspects, currentAxisResume } = this.props;

        return (
            <div className="content-aspects">
                <div className="content-nav">
                    {
                        Object.keys(this.state.axis).map((ax) => (
                            <span className={`${ax} ${ax == currentAxisResume ? "active" : ""}`} onClick={() => this.selectAxis(ax)}>
                                {this.state.axis[ax].text}
                            </span>
                        ))
                    }
                </div>

                <div className={currentAxisResume}>
                    <h3>Capacidad</h3>
                    <AspectBarChart
                        data={mergeAspects}
                        datakey="aspect"
                        dataValue="percent"
                        callback={(params) => this.selectAspectMerge(params)}
                        styles={{
                            width: 600,
                            height: 300,
                            margin: { top: 5, right: 30, left: 20, bottom: 5 },
                            ywidth: 200

                        }}
                    />

                    {/* <ul className={currentAxisResume}>
                        {mergeAspects.map(aspect => (
                            <li onClick={() => this.selectAspectMerge(aspect.aspect)}>{`${aspect.aspect ? String(aspect.aspect).toLowerCase() : ""} ${aspect.percent}%`}
                            </li>
                        ))}
                    </ul> */}

                </div>
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
        setResumeCurrentAspect
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Achievement);



