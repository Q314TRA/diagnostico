import React, { Component } from 'react';

import '../styles/load.css';


class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load_ing: true
        }
        this.awaitFn = this.awaitFn.bind(this);
        this.confirmStep = this.confirmStep.bind(this);
    }

    awaitFn(time) {
        return new Promise((resolve) => setTimeout(resolve, time))
    }

    confirmStep(){
        this.setState({ load_class: "fade-out" })
        this.awaitFn(700).then(() => {
            this.setState({ load_class: "remove" })
        })
    }

    render() {
        return (
            <div className={`load-content ${this.state.load_class}`}>

                <div>
                    {/* <div className="top-content">
                        <h2>Hola, Biotica!</h2>
                    </div> */}
                    <div className="content">
                        <div className="item-step">
                            <img src="treesFlat.png" />
                            <p>Selecciona la columna que deseas validar</p>
                        </div>
                        <span></span>
                        <div className="item-step">
                            <img src="oilFlat.png" />
                            <p>
                                Utiliza el mouse para navegar a travez de la preguntas
                                <img src="drag-flick.svg" />
                            </p>
                        </div>
                        <span></span>
                        <div className="item-step">
                            <img src="fligthFlat.png" />
                            <p>Regresa, y seelcciona la opcion resultado para viasualizar tu estado</p>
                        </div>

                    </div>
                    <div className="bottom-content"></div>
                </div>
                <span onClick={this.confirmStep} className="callback-continue" >Continuar</span>
            </div>
        );
    }
}

export default Loading;
