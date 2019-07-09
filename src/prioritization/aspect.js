import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toogleSelectAspect } from '../actions/actions'

import { LIMIT_ASPECTS_SELECTED } from '../constantsGlobal'

class Aspect extends Component {
    constructor(props) {
        super(props);
        this.selectAspect = this.selectAspect.bind(this);
    }

    selectAspect(aspect, selected) {
        const { toogleSelectAspect, aspectSelected } = this.props;
        if (aspectSelected.length >= LIMIT_ASPECTS_SELECTED && !selected)
            return;

        toogleSelectAspect({ aspect: { ...aspect }, select: selected });
    }

    render() {
        const { aspect, aspectSelected } = this.props;

        let isSelected = Object.assign([], aspectSelected)
            .filter(_aspect => _aspect.id == aspect.id)
            .reduce(() => true, false);

        return (
            <div className={`aspect_item ${isSelected ? 'selected' : ''}`}
                onClick={() => this.selectAspect(aspect, isSelected)}>
                {aspect.name}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    aspects: state.diagnosis.questions,
    aspectSelected: state.diagnosis.aspectSelected,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toogleSelectAspect
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Aspect);
