import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FloatQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentQuest: null,
            animationEnable: false
        }
        this.setCalification = this.setCalification.bind(this);
        this.testLine = this.testLine.bind(this);
    }
    setCalification(value) {
        const { questionFloat, setCalification } = this.props;
        setCalification(value, questionFloat);
    }

    testLine(){
        console.log("time-line-indicator");
        return <hr className="time-line-indicator"/>
    }

    render() {
        const { selectedValue, questionFloat } = this.props;

        if(this.state.currentQuest != questionFloat.id){
            this.setState({
                currentQuest:questionFloat.id,
                animationEnable: false
            });
            window.setTimeout(()=>this.setState({
                animationEnable: true
            }), 500)
        }

        console.log("selectedValue", selectedValue)

        // yo del futuro perdoname por este collins
        return (
            <div className="content-doot-quest">
                {questionFloat.description}
                <div>
                    <span className={selectedValue == 1 ? "active" : ""}
                        onClick={(e) => { e.stopPropagation(); this.setCalification(1) }}>1</span>
                    <span className={selectedValue == 3 ? "active" : ""}
                        onClick={(e) => { e.stopPropagation(); this.setCalification(3) }}>3</span>
                    <span className={selectedValue == 5 ? "active" : ""}
                        onClick={(e) => { e.stopPropagation(); this.setCalification(5) }}>5</span>
                </div>

                <hr className={this.state.animationEnable? "time-line-indicator": ""}/>

            </div>
        );
    }
}


const mapStateToProps = state => ({
    calification: state.diagnosis.currentChallengeCalification,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(FloatQuestion);
