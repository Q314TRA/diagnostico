import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Challenge from './challenge';
import FooterContent from '../footerContent';
import '../../styles/challenge.css';

import { LIMIT_ASPECTS_SELECTED } from '../../constantsGlobal';
import { setAllSelectAspect, getPrioritizationChallenge, getExternalChallengesSaga, updateStatusContact } from '../../actions/actions';



class ChallengeContent extends Component {
    constructor(props) {
        super(props);
        this.siguiente = this.siguiente.bind(this);
    }


    componentWillMount() {
        const { interestGroup, company, history, getExternalChallengesSaga, updateStatusContact } = this.props;

        if (!interestGroup.id) {
            history.push(`/`);
            return;
        }

        getExternalChallengesSaga({
            companyId: company.id, 
            colaboratorId: interestGroup.id
        });

        updateStatusContact({
            colaboratorId: interestGroup.id,
            status: "en proceso"
        })
    }

    siguiente() {
        const { history, updateStatusContact, interestGroup, company } = this.props;

        updateStatusContact({
            colaboratorId: interestGroup.id,
            status: "finalizado"
        })

        history.push(`/endPrioritization`);
    }

    render() {
        const { challenges, aspectSelected } = this.props;
        // dictionary challenge type
        let challengeType = challenges.reduce((a,b,i)=>{
            a[b.type] = Object.assign([], a[b.type]);
            a[b.type].push(b);
            return a;
        }, {});


        return (
            <div className="challenge-content">
                <div className="main-content">
                    <h1>Califica tus Retos</h1>

                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>

                    <div className="challenge-section-content">
                        {Object.keys(challengeType).map(_challengeType => (
                            <div className={`item-section-challenge ${_challengeType}`} >
                                <h3>{_challengeType}</h3>
                                <div className="challenge_section">
                                    {_challengeType && Object.keys(challengeType[_challengeType]).map(chll =>
                                        (<Challenge challenge={challengeType[_challengeType][chll]} />)
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
    interestGroup: state.diagnosis.interestGroup,
    company: state.diagnosis.company,
    challenges: (state.diagnosis.profile == 'LAB' ?
        Object.assign([], state.diagnosis.externalChallenges) :
        Object.assign([], state.diagnosis.challenges)) 
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setAllSelectAspect,
        getPrioritizationChallenge,
        getExternalChallengesSaga, 
        updateStatusContact
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ChallengeContent);
