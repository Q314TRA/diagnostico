import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut } from '../actions/actions'

import { LIMIT_ASPECTS_SELECTED } from '../constantsGlobal'

class PrioritizationFinal extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        const { logOut, history } = this.props;
        logOut();
        history.push(`/`);
    }


    render() {

        return (

            <div className="congratulations-content">
                <img src="resources/logo-biotica-blanco.png" />
                <div>
                    <h2>Felicitaciones!!</h2>
                    <p>Has finalizado el proceso de priorización, nuestro equipo analizara los resultados y te contactaremos para la siguiente etapa.</p>
                    <button onClick={this.logOut} >Regresar al inicio</button>
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => ({});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logOut
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PrioritizationFinal);
