import {
    GET_ALL_QUESTIOS_SAGA, SET_CURRENT_AXIS, GET_VALIDATE_COMPANY_SAGA,
    PUT_ANSWER_SAGA, DELETE_ANSWER_SAGA, SET_RESUME_CURRENT_AXIS,
    SET_RESUME_CURRENT_ASPECT, SET_INTEREST_GROUP, LOG_OUT, GENERATE_REPORT, PUT_REPORT_STATUS,
    GENERATE_BASE64, PUT_BASE_64, GET_CONSOLIDATE, UPDATE_STATUS_CONSOLIDATE,
    TOOGLE_SELECT_ASPECT, PUT_ALL_SELECT_ASPECT, GET_PRIORITAZATION_CHALLENGES,
    GET_EXTERNAL_CHALLENGES, GET_CALIFICATION_COLABORATOR_CHALLENGE, PUT_CURRENT_CHALLENGE_CALIFICATION,
    SET_CALIFICATION_COLABORATOR_CHALLENGE, GET_QUESTIONS_FACT_EST
} from '../constantsGlobal'

export function getAllQuestios(companyId, colaboratorId) {
    return {
        type: GET_ALL_QUESTIOS_SAGA, payload: {
            companyId,
            colaboratorId
        }
    }
}

export function setCurrentAxis(AXIS) {
    return { type: SET_CURRENT_AXIS, payload: AXIS }
}

export function validateCompany(hash) {
    return { type: GET_VALIDATE_COMPANY_SAGA, payload: hash }
}

export function putAnswer(answer) {
    return { type: PUT_ANSWER_SAGA, payload: answer }
}

export function deleteAnswer(answer) {
    return { type: DELETE_ANSWER_SAGA, payload: answer }
}

export function setResumeCurrentAxis(axis) {
    return { type: SET_RESUME_CURRENT_AXIS, payload: axis }
}

export function setResumeCurrentAspect(axis) {
    return { type: SET_RESUME_CURRENT_ASPECT, payload: axis }
}

export function setInterestGroup(interestGroup) {
    return { type: SET_INTEREST_GROUP, payload: interestGroup }
}

export function logOut() {
    return { type: LOG_OUT }
}

export function generateReport(data) {
    return { type: GENERATE_REPORT, payload: data }
}

export function clearReportStatus() {
    return { type: PUT_REPORT_STATUS }
}


export function generateBase64(dataSVG) {
    return { type: GENERATE_BASE64, payload: dataSVG }
}

export function initBase64(dataSVG) {
    return { type: PUT_BASE_64, payload: dataSVG }
}


export function getConsolidateDiagnosis(idCompany) {
    return { type: GET_CONSOLIDATE, payload: idCompany }
}

export function updateStatusContact(contact) {
    return { type: UPDATE_STATUS_CONSOLIDATE, payload: contact }
}


export function toogleSelectAspect(aspect) {
    return { type: TOOGLE_SELECT_ASPECT, payload: aspect }
}

export function setAllSelectAspect(aspects) {
    return { type: PUT_ALL_SELECT_ASPECT, payload: aspects }
}


export function getPrioritizationChallenge(colaboratorId) {
    return { type: GET_PRIORITAZATION_CHALLENGES, payload: colaboratorId }
}

export function getExternalChallengesSaga(payload) {
    return { type: GET_EXTERNAL_CHALLENGES, payload: payload }
}

export function getCalificationChallenge(challege) {
    return { type: GET_CALIFICATION_COLABORATOR_CHALLENGE, payload: challege }
}

export function setCalificationChallenge(challege) {
    return { type: PUT_CURRENT_CHALLENGE_CALIFICATION, payload: challege }
}

export function clearCalificationChallenge() {
    return { type: PUT_CURRENT_CHALLENGE_CALIFICATION, payload: {} }
}


export function saveCalificationChallenge(challege) {
    return { type: SET_CALIFICATION_COLABORATOR_CHALLENGE, payload: challege }
}

export function getQuestionsFactEst() {
    return { type: GET_QUESTIONS_FACT_EST }
}



