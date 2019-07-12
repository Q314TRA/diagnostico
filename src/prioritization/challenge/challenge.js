import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCalificationChallenge, clearCalificationChallenge } from '../../actions/actions'

import ModalCalification from "./modalCalification";

import { LIMIT_ASPECTS_SELECTED } from '../../constantsGlobal'

class Challenge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalCalificationOpen: false
        }

        this.toogleModal = this.toogleModal.bind(this);
        this.saveCalification = this.saveCalification.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    toogleModal(isOpen) {
        this.setState({ modalCalificationOpen: isOpen });
    }

    saveCalification(challenge, calification) {
        const { saveCalificationChallenge, interestGroup } = this.props;

        saveCalificationChallenge({
            colaboratorId: interestGroup.id,
            challengeId: challenge.id,
            factible: calification.factible,
            estrategico: calification.estrategico
        })

        this.toogleModal(false);
    }

    closeModal() {
        const { clearCalificationChallenge } = this.props;

        this.toogleModal(false)
        clearCalificationChallenge();
    }


    render() {
        const { challenge } = this.props;

        return (
            <div className={`challenge_item ${
                challenge.challengesColaborators && challenge.challengesColaborators.length > 0 ? "chek-calification" : ""}`} onClick={() => this.toogleModal(true)}>
                <p>{challenge.description}</p>
                {this.state.modalCalificationOpen &&
                    <ModalCalification close={() => this.closeModal()}
                        saveCalification={this.saveCalification}
                        challenge={challenge}
                    />
                }

                <div className={"item-footer-check"}>
                    <img src="resources/icono-aplica.svg" />
                </div>

            </div>
        );
    }
}


const mapStateToProps = state => ({
    interestGroup: state.diagnosis.interestGroup,
    aspects: state.diagnosis.questions,
    aspectSelected: state.diagnosis.aspectSelected,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveCalificationChallenge,
        clearCalificationChallenge
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
