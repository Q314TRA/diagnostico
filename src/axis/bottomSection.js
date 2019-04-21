import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCurrentAxis } from "../actions/actions";

import { Link } from 'react-router-dom'

class bottomSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "AMBIENTAL": {
                text: "ambiental",
                icon: "resources/icono-ambiental.png"
            },
            "SOCIAL": {
                text: "aocial",
                icon: "resources/icono-social.png"
            },
            "ECONOMICO": {
                text: "económico",
                icon: "resources/icono-economico.png"
            },
        };

        this.goToAxis = this.goToAxis.bind(this);

    }

    componentDidMount() { }

    goToAxis(axis) {
        const { setCurrentAxis, gotScrollTop } = this.props;
        setCurrentAxis(axis);
        gotScrollTop();
    }


    render() {
        const { currentAxis, goToResume } = this.props;
        let axies = Object.keys(this.state);
        let currentItem = Object.keys(this.state).map((item, index) => ({ index, item }))
            .find(item => item.item == currentAxis)

        return (
            <section className="content-bottom">
                <div className="doots-content" >
                    {
                        axies.map((axis) => (
                            <div className={currentAxis == axis ? "image-doot-active" : ""}>
                                <img title={this.state[axis].text} onClick={() => this.goToAxis(axis)} src={this.state[axis].icon} />
                            </div>
                        ))
                    }

                </div>
                <div className="nav-content-bottom" >


                    <div >
                        <h4>felicitaciones</h4>
                        <p>Has terminado con el formulario {this.state[currentAxis].text}, <br />
                            continua con la siguqiente categoría haciendo <br /> click en la flecha</p>
                    </div>


                    {axies[currentItem.index + 1] != undefined &&
                        <span onClick={() => this.goToAxis(axies[currentItem.index + 1])}>
                            <img src="resources/icono-siguiente.png" />
                        </span>
                    }
                    {axies[currentItem.index + 1] == undefined &&
                        <span onClick={goToResume}>
                            <img src="resources/icono-siguiente.png" />
                        </span>
                    }


                </div>
            </section>
        );
    }
}


const mapStateToProps = state => ({
    currentAxis: state.diagnosis.currentAxis
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentAxis
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(bottomSection);
