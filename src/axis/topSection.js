import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class topSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "AMBIENTAL": {
                text: "Ambiental",
                icon: "resources/categoria-ambiental.png"
            },
            "SOCIAL": {
                text: "Social",
                icon: "resources/categoria-social.png"
            },
            "ECONOMICO": {
                text: "Económico",
                icon: "resources/categoria-economico.png"
            },
        }
    }

    componentDidMount() { }

    render() {
        const { currentAxis } = this.props;
        return (
            <section className="content-top">

                <div className="content-image">
                    <img src={this.state[currentAxis].icon}/>
                </div>
                <h2>{this.state[currentAxis].text}</h2>

                    <img className="top-icon" src="resources/logo-biotica-blanco.png"/>
            </section>
        );
    }
}


const mapStateToProps = state => ({
    currentAxis: state.diagnosis.currentAxis
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(topSection);
