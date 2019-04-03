import { SET_ALL_QUESTIOS, SET_CURRENT_AXIS } from '../constantsGlobal';

const initialState = {
    questions: [],
    currentAxis: ""
}

function diagnosis(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_QUESTIOS:
            return Object.assign({}, state, {
                questions: action.payload.data
            });
        case SET_CURRENT_AXIS:
            return Object.assign({}, state, {
                currentAxis: action.payload
            });
        default:
            return state
    }
}

export default diagnosis;