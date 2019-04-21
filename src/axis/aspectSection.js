import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Question from './question';


class aspectSection extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { quest, aspect } = this.props;
        return (
            <section className="section-quest" >
                {/* <h3>{aspect}</h3> */}
                {quest.map((_quest, i) => (
                    <Question index={i} quest={_quest} />
                ))}
                <div className="scroll-gide">
                    <span>SCROLL</span>
                    <img  src="resources/icono-scroll.png" />
                </div>

            </section>
        );
    }
}

const mapStateToProps = state => ({});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(aspectSection);
