import {
    SET_ALL_QUESTIOS, SET_CURRENT_AXIS, GET_VALIDATE_COMPANY,
    SET_RESUME_CURRENT_AXIS, SET_RESUME_CURRENT_ASPECT, SET_INTEREST_GROUP, 
    LOG_OUT, PUT_REPORT_STATUS, PUT_BASE_64,
    PUT_CONSOLIDATE_DIAGNOSIS
} from '../constantsGlobal';

const initialState = {
    company: {},
    interestGroup: "",
    questions: [],
    currentAxis: "AMBIENTAL",
    currentAxisResume: "SOCIAL",
    currentAspectMerge: "",
    pathReport: null,
    isGeneratingReport: false,
    base64Charts: {},
    allowDowunloadReport: false,
    consolidateDiagnosis: []
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
        case SET_INTEREST_GROUP:
            return Object.assign({}, state, {
                interestGroup: action.payload
            });
        case LOG_OUT:
            return Object.assign({}, state, {
                company: {},
                interestGroup: "",
                questions: [],
                currentAxis: "AMBIENTAL",
                currentAxisResume: "",
                currentAspectMerge: ""
            });
        case PUT_REPORT_STATUS:
            return Object.assign({}, state, {
                pathReport: action.payload,
                isGeneratingReport: !!action.payload
            });
        case PUT_BASE_64:

            let base64Charts = state.base64Charts;
            base64Charts[action.payload.key] = action.payload.base64;
            
            let allowDowunloadReport = Object.keys(base64Charts).map(bName => {
                return base64Charts[bName];
            }).reduce((a, b, i) => {
                return a && !!b ;
            }, true);

            return Object.assign({}, state, { base64Charts, allowDowunloadReport });
        case PUT_CONSOLIDATE_DIAGNOSIS:
            return Object.assign({}, state, {
                consolidateDiagnosis: action.payload
            });
        default:
            return state
    }
}

export default diagnosis;