import { GET_ALL_QUESTIOS_SAGA, SET_CURRENT_AXIS  } from '../constantsGlobal'

export function getAllQuestios() {
    return { type: GET_ALL_QUESTIOS_SAGA }
}

export function setCurrentAxis(AXIS) {
    return { type: SET_CURRENT_AXIS, payload : AXIS }
}



