// export const API_SERVER = process.env.HOST_API ? process.env.HOST_API : "http://localhost:3000";
export const API_SERVER = "http://138.68.41.196:3000";


//CONFIGURATION
export const LIMIT_ASPECTS_SELECTED = 3;

export const PROFILE_LAB = "LAB";
export const PROFILE_GENERIC = "GENERIC";


export const CHALLENGE_TYPE_EXTERNO = "EXTERNO";
export const CHALLENGE_TYPE_INTERNO = "INTERNO";




// API
export const GET_ALL_QUESTIOS_API = API_SERVER + "/diagnosis/";
export const GET_VALIDATE_COMPANY_API = API_SERVER + "/diagnosis/validateCompany";
export const PUT_ANSWER_API = API_SERVER + "/diagnosis/";
export const DELETE_ANSWER_API = API_SERVER + "/diagnosis/removeAnswer";
export const PUT_DATA_REPORT = API_SERVER + "/diagnosis/generateReport";
export const GET_BASE64_SVG = API_SERVER + "/diagnosis/getBase64SVG";
export const GET_CONSOLIDATE_DIAGNOSIS = API_SERVER + "/diagnosis/getConsolidateCompanyDiagnosis";
export const UPDATE_STATUS_CONTACT_CONSOLIDATE = API_SERVER + "/diagnosis/updateStatusContact";
export const SET_SELECT_ASEPECTS = API_SERVER + "/diagnosis/selectAspects";
export const GET_SELECT_ASEPECTS = API_SERVER + "/diagnosis/getSelectAspects";
export const GET_ALL_EXTERNAL_CHALLENGES = API_SERVER + "/diagnosis/getExternalChallenges";
export const GET_CALIFICATION_CHALLENGE = API_SERVER + "/diagnosis/getPrioritizationChallenges";
export const SET_CALIFICATION_CHALLENGE = API_SERVER + "/diagnosis/setPrioritizationChallenge";
export const GET_QUESTIONS_FACTIBLE_ESTRATEGICO = API_SERVER + "/diagnosis/getQuestionsFactEst";


// {
// 	"idCompany": 2
// }




// export const GET_ALL_QUESTIOS_API = "http://138.68.41.196:3000" + "/diagnosis/";
// export const GET_VALIDATE_COMPANY_API = "http://138.68.41.196:3000" + "/diagnosis/validateCompany";
// export const PUT_ANSWER_API = "http://138.68.41.196:3000" + "/diagnosis/";
// export const DELETE_ANSWER_API = "http://138.68.41.196:3000" + "/diagnosis/removeAnswer";
// export const PUT_DATA_REPORT = "http://138.68.41.196:3000" + "/diagnosis/generateReport";
// export const GET_BASE64_SVG = "http://138.68.41.196:3000" + "/diagnosis/getBase64SVG";
// export const GET_CONSOLIDATE_DIAGNOSIS = "http://138.68.41.196:3000" + "/diagnosis/getConsolidateCompanyDiagnosis";
// export const UPDATE_STATUS_CONTACT_CONSOLIDATE = "http://138.68.41.196:3000" + "/diagnosis/updateStatusContact";
// export const SET_SELECT_ASEPECTS = "http://138.68.41.196:3000" + "/diagnosis/selectAspects";
// export const GET_SELECT_ASEPECTS = "http://138.68.41.196:3000" + "/diagnosis/getSelectAspects";
// export const GET_ALL_EXTERNAL_CHALLENGES = "http://138.68.41.196:3000" + "/diagnosis/getExternalChallenges";
// export const GET_CALIFICATION_CHALLENGE = "http://138.68.41.196:3000" + "/diagnosis/getPrioritizationChallenges";
// export const SET_CALIFICATION_CHALLENGE = "http://138.68.41.196:3000" + "/diagnosis/setPrioritizationChallenge";

// export const GET_ALL_QUESTIOS_API = "http://138.68.41.196:3000/diagnosis/";
// export const GET_VALIDATE_COMPANY_API = "http://138.68.41.196:3000/diagnosis/validateCompany";
// export const PUT_ANSWER_API = "http://138.68.41.196:3000/diagnosis/";
// export const DELETE_ANSWER_API = "http://138.68.41.196:3000/diagnosis/removeAnswer";
// export const PUT_DATA_REPORT = "http://138.68.41.196:3000/diagnosis/generateReport";
// export const GET_BASE64_SVG = "http://138.68.41.196:3000/diagnosis/getBase64SVG";
// export const GET_CONSOLIDATE_DIAGNOSIS = "http://138.68.41.196:3000/diagnosis/getConsolidateCompanyDiagnosis";
// export const UPDATE_STATUS_CONTACT_CONSOLIDATE = "http://138.68.41.196:3000/diagnosis/updateStatusContact";


//SAGA -> REDUCERS
export const GET_ALL_QUESTIOS_SAGA = "GET_ALL_QUESTIOS_SAGA";
export const GET_VALIDATE_COMPANY_SAGA = "GET_VALIDATE_COMPANY_SAGA";
export const PUT_ANSWER_SAGA = "PUT_ANSWER_SAGA";
export const DELETE_ANSWER_SAGA = "DETELE_ANSWER_SAGA";
export const PUT_REPORT_STATUS = "PUT_REPORT_STATUS";
export const PUT_BASE_64 = "PUT_BASE_64";
export const PUT_CONSOLIDATE_DIAGNOSIS = "PUT_CONSOLIDATE_DIAGNOSIS";
export const UPDATE_STATUS_CONSOLIDATE = "UPDATE_STATUS_CONSOLIDATE";
export const SET_SELECT_ASPECT = "SET_SELECT_ASPECT";
export const CLEAR_SELECT_ASPECT = "CLEAR_SELECT_ASPECT";
export const SET_ALL_SELECTED_ASPECT = "SET_ALL_SELECTED_ASPECT";
export const SET_PRIPORITAZATION_CHALLENGES = "SET_PRIPORITAZATION_CHALLENGES";
export const PUT_EXTERNAL_CHALLENGES = "PUT_EXTERNAL_CHALLENGES";
export const PUT_CURRENT_CHALLENGE_CALIFICATION = "PUT_CURRENT_CHALLENGE_CALIFICATION";
export const PUT_QUESTIONS_FACT_EST = "PUT_QUESTIONS_FACT_EST";

// ACTIONS
export const SET_ALL_QUESTIOS = "SET_ALL_QUESTIOS";
export const SET_CURRENT_AXIS = "SET_CURRENT_AXIS";
export const GET_VALIDATE_COMPANY = "GET_VALIDATE_COMPANY";
export const PUT_ANSWER = "PUT_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";
export const SET_RESUME_CURRENT_AXIS = "SET_RESUME_CURRENT_AXIS";
export const SET_RESUME_CURRENT_ASPECT = "SET_RESUME_CURRENT_ASPECT";
export const SET_INTEREST_GROUP = "SET_INTEREST_GROUP";
export const LOG_OUT = "LOG_OUT";
export const GENERATE_REPORT = "GENERATE_REPORT";
export const GENERATE_BASE64 = "GENERATE_BASE64";
export const GET_CONSOLIDATE = "GET_CONSOLIDATE";
export const UPDATE_STATUS_CONTACT = "UPDATE_STATUS_CONTACT";
export const TOOGLE_SELECT_ASPECT = "TOOGLE_SELECT_ASPECT";

export const PUT_ALL_SELECT_ASPECT = "PUT_ALL_SELECT_ASPECT";
export const GET_ALL_SELECT_ASPECT = "GET_ALL_SELECT_ASPECT";
export const GET_PRIORITAZATION_CHALLENGES = "GET_PRIORITAZATION_CHALLENGES";
export const GET_EXTERNAL_CHALLENGES = "GET_EXTERNAL_CHALLENGES";

export const GET_CALIFICATION_COLABORATOR_CHALLENGE = "GET_CALIFICATION_COLABORATOR_CHALLENGE";
export const SET_CALIFICATION_COLABORATOR_CHALLENGE = "SET_CALIFICATION_COLABORATOR_CHALLENGE";
export const GET_QUESTIONS_FACT_EST = "GET_QUESTIONS_FACT_EST";





export const axisProcessData = (questions) => {
    // cuento la totalidad del cada eje
    let axis_resume = {};
    questions.forEach(question => {
        axis_resume[question.axis] = Object.assign({ numChecks: 0, sumChecks: 0 }, axis_resume[question.axis]);
        axis_resume[question.axis].numChecks += 1;
        axis_resume[question.axis].sumChecks += parseInt(question.weight ? question.weight : 0);
    });

    // cuento solo las seleccionadas de cada eje
    let axis = {};
    questions.filter(question => question.selected)
        .forEach(question => {
            axis[question.axis] = Object.assign({ numChecks: 0, sumChecks: 0 }, axis[question.axis]);
            axis[question.axis].numChecks += 1;
            axis[question.axis].sumChecks += parseInt(question.weight ? question.weight : 0);
        });

    let result = Object.keys(axis).map(_axis => {
        let percent = ((axis[_axis].sumChecks * 100) / axis_resume[_axis].sumChecks);

        let fragment = 100 / Object.keys(axis).length;

        let _percent = (fragment * percent) / 100;

        return {
            name: _axis,
            value: Math.round(_percent),
            realPercent: Math.round(percent)
        }
    });

    return result;
}

export const aspectProcessData = (questions, currentAxisResume) => {

    let axis = questions.filter(question => question.axis == currentAxisResume);

    //conteo y sumatoria para extraer porcentaje total
    let resume = axis.reduce((a, b, i, o) => {
        a[b.aspectMerge] = Object.assign({ numChecks: 0, sumChecks: 0 }, a[b.aspectMerge]);
        a[b.aspectMerge].numChecks += 1;
        a[b.aspectMerge].sumChecks += parseInt(b.weight);
        return a;
    }, {})

    //conteo y sumatoria para extraer porcentaje seleccionados
    let mergeAspects = axis.filter(question => question.selected)
        .reduce((a, b, i, o) => {
            a[b.aspectMerge] = Object.assign({ numChecks: 0, sumChecks: 0 }, a[b.aspectMerge]);
            a[b.aspectMerge].numChecks += 1;
            a[b.aspectMerge].sumChecks += parseInt(b.weight);
            return a;
        }, {})

    //equivalencia a cuanto equivale lo que se selecciono
    let compileMergeData = Object.keys(resume).map(aspect => {
        // porcentaje macro
        let sumChecks = (mergeAspects[aspect] ? mergeAspects[aspect].sumChecks : 0);
        let percent = ((sumChecks * 100) / resume[aspect].sumChecks);

        return {
            aspect,
            percent: Math.floor(percent)
        }
    }).map((result, index, object) => {
        // porcentaje global entre todos los aspectos del eje actual
        let totalPercent = object.reduce((a, b, i, o) => {
            return a + b.percent
        }, 0);
        let percent = (result.percent * 100) / totalPercent;

        return {
            axis: currentAxisResume,
            aspect: result.aspect,
            percent: Math.round(percent * 10) / 10,
            realPercent: Math.round(result.percent * 10) / 10
        }
    });

    return compileMergeData;

}

export const getChallengeFromQuestions = (questions, currentAxisResume, currentAspectMerge) => {

    let result = questions.filter(question => {
        let criteriaAxis = currentAxisResume ? question.axis == currentAxisResume : true;
        let criteriaAspect = currentAspectMerge ? question.aspectMerge == currentAspectMerge : true;
        return criteriaAxis && criteriaAspect
    }).reduce((a, b) => {
        if (b.challenge) {
            a[b.challenge] = Object.assign({}, a[b.challenge]);
            a[b.challenge] = b;
        }
        return a;
    }, {});

    return result;
}

export const prioritizationChallenges = (challenges, aspectData, axisData) => {
    //extraemos el maximo peso para hacer la parrilla de pesos
    let maxWeight = Object.keys(challenges).map((challenge) => challenges[challenge].weight)
        .reduce((a, b, i, o) => (a < b ? b : a), 0)
    //configuramos los escalafomes de pesos
    let grill = {
        PROBLEMA: maxWeight * 3,
        NECESIDAD: maxWeight * 2,
        OPORTUNIDAD: maxWeight
    }
    //calculamos el porcentaje inverso para aplicar la parrilla
    let _aspectData = aspectData.map((item) => {
        return {
            aspect: item.aspect,
            percent: 100 - item.realPercent
        }
    })
    console.log("GRILL", grill, _aspectData);

    let rankedChallenges = Object.keys(challenges)
        .map((challenge) => challenges[challenge])
        .map((challenge) => {
            let aspectPercent = _aspectData
                .filter((asp) => asp.aspect == challenge.aspectMerge)
                .reduce((a, b) => {
                    return b.percent
                }, 0);

            let ranck = ((challenge.weight + grill[challenge.type]) * aspectPercent) / 100;
            return {
                ...challenge,
                ranck
            }
        })

    console.log(rankedChallenges);

    rankedChallenges = rankedChallenges.sort((challenge_a, challenge_b) => {
        return challenge_a.ranck > challenge_b.ranck
    })


    return rankedChallenges.slice(0, 2);


}
