import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom'

import { validateCompany, setInterestGroup } from "../actions/actions";
import Modal from "./modal";

import '../styles/home.css';

class Congratulations extends Component {

    constructor(props) {
        super(props);

    }
    render() {

        return (
            <div className="congratulations-content">
                <img src="resources/logo-biotica-blanco.png" />
                <div>
                    <h2>Felicitaciones!!</h2>
                    <p>
                        Desde <strong>Biotica</strong>, agradecemos el tiempo invertido para responder este diagnóstico.  <br />
                        Esperamos que la información entregada en el informe consolidado le haya brindado algunas ideas para implementar en su empresa.
                    <br /> <br />
                        Antes de finalizar, agradecemos nos responda las siguientes preguntas, las cuales nos ayudarán a conocer su experiencia y mejorar nuestra propuesta, 
<a href="https://www.survio.com/survey/d/J8I8D9T8O6S9T8Q5Z" target="_blank" className="callback"> Has click Aqui!!</a>.
<br /> <br />
                        Muchas gracias!
                    </p>



                </div>
            </div>
        );
    }
}




const mapStateToProps = state => ({
    company: state.diagnosis.company
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        validateCompany,
        setInterestGroup
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Congratulations);

