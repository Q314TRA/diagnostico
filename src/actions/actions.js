import {
    GET_ALL_QUESTIOS_SAGA, SET_CURRENT_AXIS, GET_VALIDATE_COMPANY_SAGA,
    PUT_ANSWER_SAGA, DELETE_ANSWER_SAGA, SET_RESUME_CURRENT_AXIS,
    SET_RESUME_CURRENT_ASPECT, SET_INTEREST_GROUP, LOG_OUT, GENERATE_REPORT, PUT_REPORT_STATUS,
    GENERATE_BASE64, PUT_BASE_64, GET_CONSOLIDATE, UPDATE_STATUS_CONSOLIDATE
} from '../constantsGlobal'

export function getAllQuestios(idCompany, interestGroup, industrialSector) {
    return {
        type: GET_ALL_QUESTIOS_SAGA, payload: {
            idCompany,
            interestGroup,
            industrialSector
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



