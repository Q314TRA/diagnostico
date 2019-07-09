import {
    PROFILE_LAB,
    SET_ALL_QUESTIOS, SET_CURRENT_AXIS, GET_VALIDATE_COMPANY,
    SET_RESUME_CURRENT_AXIS, SET_RESUME_CURRENT_ASPECT, SET_INTEREST_GROUP,
    LOG_OUT, PUT_REPORT_STATUS, PUT_BASE_64,
    PUT_CONSOLIDATE_DIAGNOSIS, SET_SELECT_ASPECT, CLEAR_SELECT_ASPECT,
    SET_ALL_SELECTED_ASPECT, SET_PRIPORITAZATION_CHALLENGES, PUT_EXTERNAL_CHALLENGES,
    PUT_CURRENT_CHALLENGE_CALIFICATION
} from '../constantsGlobal';

const initialState = {
    company: {},
    interestGroup: {},
    questions: [],
    currentAxis: "AMBIENTAL",
    currentAxisResume: "SOCIAL",
    currentAspectMerge: "",
    pathReport: null,
    isGeneratingReport: false,
    base64Charts: {},
    allowDowunloadReport: false,
    consolidateDiagnosis: [],
    aspectSelected: [],
    challengesCalification: [],
    profile: PROFILE_LAB,
    challenges: [],
    externalChallenges: [],
    currentChallengeCalification: []
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
                return a && !!b;
            }, true);

            return Object.assign({}, state, { base64Charts, allowDowunloadReport });
        case PUT_CONSOLIDATE_DIAGNOSIS:
            return Object.assign({}, state, {
                consolidateDiagnosis: action.payload
            });

        case SET_ALL_SELECTED_ASPECT:
            return Object.assign({}, state, {
                aspectSelected: action.payload
            });

        case SET_SELECT_ASPECT:
            let setAspects = Object.assign([], state.aspectSelected);
            setAspects.push(action.payload);
            return Object.assign({}, state, {
                aspectSelected: setAspects
            });

        case CLEAR_SELECT_ASPECT:
            let clearAspects = Object.assign([], state.aspectSelected)
                .filter(aspet => action.payload && aspet.id != action.payload.id);
            return Object.assign({}, state, {
                aspectSelected: clearAspects

            });

        case SET_PRIPORITAZATION_CHALLENGES:
            return Object.assign({}, state, {
                challengesCalification: action.payload
            });

        case PUT_EXTERNAL_CHALLENGES:
            return Object.assign({}, state, {
                externalChallenges: action.payload
            });

        case PUT_CURRENT_CHALLENGE_CALIFICATION:
            return Object.assign({}, state, {
                currentChallengeCalification: action.payload
            });
            
        default:
            return state
    }
}

export default diagnosis;