import { SET_ALL_QUESTIOS, SET_CURRENT_AXIS, GET_VALIDATE_COMPANY } from '../constantsGlobal';

const initialState = {
    company: {},
    questions: [],
    currentAxis: "AMBIENTAL"
}

function diagnosis(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_QUESTIOS:
            return Object.assign({}, state, {
                questions: action.payload
            });
        case SET_CURRENT_AXIS:
            return Object.assign({}, state, {
                currentAxis: action.payload
            });
        case GET_VALIDATE_COMPANY:
            return Object.assign({}, state, {
                company: action.payload
            });
        default:
            return state
    }
}

export default diagnosis;