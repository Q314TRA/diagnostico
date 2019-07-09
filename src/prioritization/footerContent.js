import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FooterContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { callback } = this.props;
        return (
            <div className="footer-content">
                <button onClick={callback} >Siguente</button>
            </div>
        );
    }
}


const mapStateToProps = state => ({});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(FooterContent);
