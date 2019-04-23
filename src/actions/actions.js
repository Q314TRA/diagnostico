import { GET_ALL_QUESTIOS_SAGA, SET_CURRENT_AXIS, GET_VALIDATE_COMPANY_SAGA, 
    PUT_ANSWER_SAGA, DELETE_ANSWER_SAGA, SET_RESUME_CURRENT_AXIS,
    SET_RESUME_CURRENT_ASPECT } from '../constantsGlobal'

export function getAllQuestios(idCompany) {
    return { type: GET_ALL_QUESTIOS_SAGA, payload: idCompany }
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



