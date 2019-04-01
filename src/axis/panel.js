import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentAxis } from '../actions/actions';

const enumIcons = {
    AMBIENTAL: "./leaf.svg",
    SOCIAL: "./user.svg",
    ECONOMICO: "./coin.svg"
}

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.getCurrentClassAxis = this.getCurrentClassAxis.bind(this);
    }
    getCurrentClassAxis(axis) {
        const { currentAxis } = this.props;
        return `axis axis-${axis} ${currentAxis == axis ? 'open' : ''}`;
    }

    render() {
        const { axis, setCurrentPanelOpen, setCurrentAxis } = this.props;
        return (
            <div className={this.getCurrentClassAxis(axis)} onClick={() => setCurrentAxis(axis)} >
                <img src={enumIcons[axis]} />
                <span>{axis}</span>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentAxis: state.diagnosis.currentAxis
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setCurrentAxis }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
