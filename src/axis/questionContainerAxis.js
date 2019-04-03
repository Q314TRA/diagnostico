import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'

import '../styles/axis.css';

import { setCurrentAxis, getAllQuestios } from '../actions/actions';
import Panel from './panel';
import QuestionContainer from './questionContainer';
import Loading from '../dashboard/loading';



class QuestionContainerAxis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadign: true
        }
        this.loadingCallback = this.loadingCallback.bind(this);
    }

    componentWillMount() {
        const { getAllQuestios } = this.props;
        getAllQuestios();
    }

    loadingCallback() {
        this.setState({ loadign: false })
    }

    render() {

        const { currentAxis, setCurrentAxis } = this.props;
        return (
            <div className="poll-content"  >
                {this.state.loadign &&
                    <Loading callback={this.loadingCallback} />
                }
                <div className={`axis-container ${currentAxis ? 'active' : ''}`} >
                    <Panel axis="AMBIENTAL" />
                    <Panel axis="SOCIAL" />
                    <Panel axis="ECONOMICO" />
                    <span className="callback-resume" >
                        <Link to="/resume"> Resultado </Link>
                    </span>
                </div>
                <div className="poll-content-body">
                    <span className={`close-content-body ${currentAxis ? currentAxis : ""}`} onClick={() => setCurrentAxis("")}>X</span>
                    {currentAxis && <QuestionContainer />}
                </div>

            </div>
        );
    }
}


const mapStateToProps = state => ({
    currentAxis: state.diagnosis.currentAxis
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentAxis,
        getAllQuestios
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainerAxis);
