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
                icon: ""
            },
            "SOCIAL": {
                text: "aocial",
                icon: ""
            },
            "ECONOMICO": {
                text: "económico",
                icon: ""
            },
        };

        this.goToAxis = this.goToAxis.bind(this);

    }

    componentDidMount() { }

    goToAxis(axis) {
        const { setCurrentAxis } = this.props;
        setCurrentAxis(axis);
    }

    render() {
        const { currentAxis } = this.props;
        let axies = Object.keys(this.state);
        let currentItem = Object.keys(this.state).map((item, index) => ({ index, item }))
            .find(item => item.item == currentAxis)

        return (
            <section className="content-bottom">
                <div className="doots-content" >
                    <div>
                        <img src="resources/icono-ambiental.png" />
                    </div>
                    <div>
                        <img src="resources/icono-social.png" />
                    </div>
                    <div>
                        <img src="resources/icono-economico.png" />
                    </div>
                </div>
                <div className="nav-content-bottom" >

                    {axies[currentItem.index - 1] != undefined &&
                        <span onClick={() => this.goToAxis(axies[currentItem.index - 1])}>Atras</span>
                    }

                    <div >
                        <h4>felicitaciones</h4>
                        <p>Has terminado con el formulario {this.state[currentAxis].text}, <br/>
                        continua con la siguqiente categoría haciendo <br/> click en la flecha</p>
                    </div>

                    {axies[currentItem.index + 1] != undefined &&
                        <span onClick={() => this.goToAxis(axies[currentItem.index + 1])}>
                            <img src="resources/icono-aplica.png"/>
                        </span>
                    }

                    {axies[currentItem.index + 1] == undefined &&
                        <Link to="/resume"> Finalizar </Link>
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
