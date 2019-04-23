import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setResumeCurrentAxis, setResumeCurrentAspect } from '../actions/actions';

class Achievement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            axis: {
                "AMBIENTAL": {
                    text: "ambiental",
                    icon: "resources/icono-ambiental.png",
                    color: "#8884d8"
                },
                "SOCIAL": {
                    text: "social",
                    icon: "resources/icono-social.png",
                    color: "#8884d8"
                },
                "ECONOMICO": {
                    text: "económico",
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
        setResumeCurrentAspect(aspect);
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

                <div>
                    <h3>Logros</h3>
                    <ul className={currentAxisResume}>
                        {mergeAspects.map(aspect => (
                            <li onClick={() => this.selectAspectMerge(aspect.aspect)}>{`${aspect.aspect ? String(aspect.aspect).toLowerCase() : ""} ${aspect.percent}%`}
                            </li>
                        ))}
                    </ul>

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



