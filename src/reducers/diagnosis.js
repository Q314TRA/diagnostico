import { SET_ALL_QUESTIOS, SET_CURRENT_AXIS, GET_VALIDATE_COMPANY, 
    SET_RESUME_CURRENT_AXIS, SET_RESUME_CURRENT_ASPECT } from '../constantsGlobal';

const initialState = {
    company: {},
    questions: [],
    currentAxis: "AMBIENTAL",
    currentAxisResume: "",
    currentAspectMerge: ""
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
        case SET_RESUME_CURRENT_AXIS:
            return Object.assign({}, state, {
                currentAxisResume: action.payload,
                currentAspectMerge: ""
            });
        case SET_RESUME_CURRENT_ASPECT:
            return Object.assign({}, state, {
                currentAspectMerge: action.payload
            });
        default:
            return state
    }
}

export default diagnosis;