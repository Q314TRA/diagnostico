import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/resumev2.css';
import { Link } from 'react-router-dom';


import { setResumeCurrentAxis, logOut, updateStatusContact } from '../actions/actions';

// import AspectChart from "./aspectChart";
import AspectBarChart from "./aspectBarChart";
import Achievement from "./achievement";
import Challenge from "./challenge";
import ExportResume from "./exportResume";
import ModalContacts from "./modalContacts";

import {
    axisProcessData, aspectProcessData, getChallengeFromQuestions
} from "../constantsGlobal"


class Resume extends Component {


    constructor(props) {
        super(props);

        this.state = {
            exportOpen: false,
            modalContactOpen: false
        }

        this.logOut = this.logOut.bind(this);
        this.selectPie = this.selectPie.bind(this);
        this.closeModalContacts = this.closeModalContacts.bind(this);
    }

    componentWillMount() {
        const { company, history, interestGroup, updateStatusContact } = this.props;
        if (!company.id) {
            history.push(`/`);
            return;
        }
        
        updateStatusContact({
            colaboratorId: interestGroup.id,
            status: "finalizado"
        })
    }

    logOut() {
        const { logOut, history } = this.props;
        logOut();
        history.push(`/congratulations`);
    }

    selectPie(params) {
        const { setResumeCurrentAxis } = this.props;
        setResumeCurrentAxis(params.name);
    }


    closeModalContacts() {
        this.setState({
            exportOpen: true,
            modalContactOpen: false
        })
    }

    render() {
        const { questions, currentAxisResume, currentAspectMerge } = this.props;

        //Chart
        const data = axisProcessData(questions);
        //achievement
        const mergeAspects = aspectProcessData(questions, currentAxisResume);
        //challenge
        const aspectMerge = getChallengeFromQuestions(questions, currentAxisResume, currentAspectMerge);
        return (
            <div className="resume-content-v2">
                {this.state.exportOpen &&
                    <ExportResume close={() => this.setState({ exportOpen: false })} />}

                {this.state.modalContactOpen &&
                    <ModalContacts closeModal={() => this.setState({ modalContactOpen: false })}
                        continueModal={this.closeModalContacts} />

                }

                <div className="top-nav-content">
                    <img src="resources/logo-biotica-color.png" />

                    <div>
                        <span onClick={() => this.setState({ modalContactOpen: true })}>Descarga tu informe</span>
                        <span onClick={this.logOut}>Salir</span>
                    </div>
                </div>
                <div className="resume-section">
                    <div>

                        <AspectBarChart
                            data={data}
                            datakey="name"
                            dataValue="realPercent"
                            callback={(params) => this.selectPie(params)}
                            indexColor={true}
                            styles={{
                                width: 600,
                                height: 400,
                                margin: { top: 5, right: 30, left: 20, bottom: 5 }

                            }}
                        />

                        <div className="section-aspects">
                            <Achievement mergeAspects={mergeAspects} />
                        </div>
                        <Challenge macroChallenge={aspectMerge} />

                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => ({
    questions: state.diagnosis.questions,
    currentAxis: state.diagnosis.currentAxis,
    company: state.diagnosis.company,
    currentAxisResume: state.diagnosis.currentAxisResume,
    currentAspectMerge: state.diagnosis.currentAspectMerge,
    interestGroup: state.diagnosis.interestGroup
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setResumeCurrentAxis,
        logOut,
        updateStatusContact
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Resume);