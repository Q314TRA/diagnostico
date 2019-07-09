import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Aspect from './aspect';
import FooterContent from './footerContent';
import '../styles/aspect.css';

import { LIMIT_ASPECTS_SELECTED } from '../constantsGlobal';
import { setAllSelectAspect } from '../actions/actions';



class AspectContent extends Component {
    constructor(props) {
        super(props);
        this.siguiente = this.siguiente.bind(this);
    }

    siguiente() {
        const { setAllSelectAspect, aspectSelected } = this.props;
        setAllSelectAspect(aspectSelected);
    }

    render() {
        const { aspects, aspectSelected } = this.props;
        return (
            <div className="aspect-content">
                <div className="main-content">
                    <h1>Selecciona los aspectos sobre los que deseas trabajar</h1>

                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>

                    <div className="aspect_section_content">
                        {aspectSelected.length >= LIMIT_ASPECTS_SELECTED &&
                            <div>
                                <p style={{ color: "red" }}>solo puedes escoger tres aspectos</p>
                            </div>
                        }
                        {Object.keys(aspects).map(_aspects => (
                            <div >
                                <h3>{_aspects}</h3>
                                <div className="aspect_section">
                                    {_aspects && Object.keys(aspects[_aspects]).map(asp =>
                                        (<Aspect aspect={aspects[_aspects][asp]} />)
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <FooterContent callback={this.siguiente} />

            </div>
        );
    }
}


const mapStateToProps = state => ({

    aspectSelected: state.diagnosis.aspectSelected,
    aspects: state.diagnosis.questions
        .filter(quest => quest.selected)
        .reduce((a, b, i, o) => {
            let _aspect = Object.assign([], b.aspects).pop();
            let aspectName = Object.assign({}, _aspect).name;

            a[b.axis] = Object.assign({}, a[b.axis]);
            a[b.axis][aspectName] = _aspect;

            return a;
        }, {})


});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setAllSelectAspect
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AspectContent);
