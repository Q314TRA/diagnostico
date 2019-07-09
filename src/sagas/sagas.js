import {
  PROFILE_LAB, CHALLENGE_TYPE_EXTERNO, CHALLENGE_TYPE_INTERNO,
  GET_ALL_QUESTIOS_SAGA, SET_ALL_QUESTIOS, GET_ALL_QUESTIOS_API,
  GET_VALIDATE_COMPANY_API, GET_VALIDATE_COMPANY_SAGA, GET_VALIDATE_COMPANY,
  PUT_ANSWER_SAGA, PUT_ANSWER_API,
  DELETE_ANSWER_SAGA, DELETE_ANSWER_API,
  GENERATE_REPORT, PUT_REPORT_STATUS, PUT_DATA_REPORT,
  GENERATE_BASE64, GET_BASE64_SVG, PUT_BASE_64,
  PUT_CONSOLIDATE_DIAGNOSIS, GET_CONSOLIDATE_DIAGNOSIS, GET_CONSOLIDATE,
  UPDATE_STATUS_CONTACT_CONSOLIDATE, UPDATE_STATUS_CONSOLIDATE,
  TOOGLE_SELECT_ASPECT, SET_SELECT_ASPECT, CLEAR_SELECT_ASPECT,
  PUT_ALL_SELECT_ASPECT, GET_ALL_SELECT_ASPECT, GET_SELECT_ASEPECTS, SET_SELECT_ASEPECTS,
  SET_ALL_SELECTED_ASPECT, GET_PRIORITAZATION_CHALLENGES,
  GET_EXTERNAL_CHALLENGES, PUT_EXTERNAL_CHALLENGES, GET_ALL_EXTERNAL_CHALLENGES,
  GET_CALIFICATION_CHALLENGE,
  PUT_CURRENT_CHALLENGE_CALIFICATION,
  GET_CALIFICATION_COLABORATOR_CHALLENGE,
  SET_CALIFICATION_CHALLENGE,
  SET_CALIFICATION_COLABORATOR_CHALLENGE
} from '../constantsGlobal'

import { call, put, takeEvery, takeLatest, fork, all, select } from 'redux-saga/effects'

import axios from 'axios'

function* getQuestios(action) {
  const questios = yield call(axios.post, GET_ALL_QUESTIOS_API, {
    companyId: action.payload.companyId,
    colaboratorId: action.payload.colaboratorId
  });

  yield put({
    type: SET_ALL_QUESTIOS, payload: questios.data.map((item) => {
      item.selected = !!item.answers && item.answers.length > 0;
      return item;
    })
  });
}

function* getvalidateCompany(action) {
  const company = yield call(axios.post, GET_VALIDATE_COMPANY_API, {
    hash: action.payload
  });

  let _company = Object.assign({}, company.data);
  console.log(_company)
  yield put({ type: GET_VALIDATE_COMPANY, payload: _company });
  // yield put({ type: GET_ALL_QUESTIOS_SAGA, payload: company.data.companyId });
}

function* putAnswer(action) {
  const company = yield call(axios.put, PUT_ANSWER_API, action.payload);

  if (company.data.companyId != undefined && company.data.questionId != undefined) {
    yield put({
      type: GET_ALL_QUESTIOS_SAGA, payload: {
        companyId: action.payload.companyId,
        colaboratorId: action.payload.colaboratorId
      }
    });
  }

}

function* deleteAnswer(action) {
  yield call(axios.post, DELETE_ANSWER_API, action.payload);

  yield put({
    type: GET_ALL_QUESTIOS_SAGA, payload: {
      companyId: action.payload.companyId,
      colaboratorId: action.payload.colaboratorId
    }
  });
}

function* generateReport(action) {
  const guid = yield call(axios.post, PUT_DATA_REPORT, action.payload);
  yield put({ type: PUT_REPORT_STATUS, payload: PUT_DATA_REPORT + "/" + guid.data });
}



function* generateBase64(action) {

  const base64png = yield call(axios.post,
    GET_BASE64_SVG, action.payload.svg, { headers: { "Content-Type": "text/html", "charset": "utf-8" } });

  yield put({
    type: PUT_BASE_64, payload: {
      key: action.payload.key,
      base64: base64png.data
    }
  });
}


function* getConsolidateDiagnosis(action) {
  const consolidate = yield call(axios.post, GET_CONSOLIDATE_DIAGNOSIS, {
    idCompany: action.payload
  });

  yield put({ type: PUT_CONSOLIDATE_DIAGNOSIS, payload: consolidate.data });
}

function* updateStatusContact(action) {
  const state = yield select();

  const consolidate = yield call(axios.post, UPDATE_STATUS_CONTACT_CONSOLIDATE, {
    "colaboratorId": action.payload.colaboratorId,
    "status": action.payload.status
  });

  yield put({ type: GET_VALIDATE_COMPANY_SAGA, payload: state.diagnosis.company.nit });
}

function* toogleAspectSelected(action) {
  if (!action.payload.select) {
    yield put({ type: SET_SELECT_ASPECT, payload: action.payload.aspect });
  } else {
    yield put({ type: CLEAR_SELECT_ASPECT, payload: action.payload.aspect });
  }
}


function* putAllSelectAspect(action) {
  const state = yield select();

  let data = {
    colaboratorId: state.diagnosis.interestGroup.id,
    aspects: action.payload.map((aspect) => ({
      aspectId: aspect.id,
      colaboratorId: state.diagnosis.interestGroup.id
    }))
  };

  const consolidate = yield call(axios.put, SET_SELECT_ASEPECTS, data);

  yield put({ type: GET_ALL_SELECT_ASPECT, payload: state.diagnosis.interestGroup.id });

}

function* getAllSelectAspect(action) {
  const _aspectsSelected = yield call(axios.post, GET_SELECT_ASEPECTS, {
    colaboratorId: action.payload
  });

  let _aspects = _aspectsSelected.data.map(aspect => aspect.aspect);

  yield put({ type: SET_ALL_SELECTED_ASPECT, payload: _aspects });

}


function* getPrioritizationChallenges(action) {
  const _aspectsSelected = yield call(axios.post, GET_SELECT_ASEPECTS, {
    colaboratorId: action.payload
  });

  let _aspects = _aspectsSelected.data.map(aspect => aspect.aspect);

  yield put({ type: SET_ALL_SELECTED_ASPECT, payload: _aspects });

}

function* getExternalChallenges(action) {
  const _externalChalleges = yield call(axios.post, GET_ALL_EXTERNAL_CHALLENGES, {
    companyId: action.payload.companyId,
    colaboratorId: action.payload.colaboratorId
  });

  // let _challenges = _externalChalleges.data;

  yield put({ type: PUT_EXTERNAL_CHALLENGES, payload: _externalChalleges.data });

}

function* getCalificationChallenge(action) {

  const _calificationChalleges = yield call(axios.post, GET_CALIFICATION_CHALLENGE, {
    colaboratorId: action.payload.colaboratorId,
    challengeId: action.payload.challengeId
  });

  let calificationChalleges = {
    challengeId: action.payload.challengeId
  }

  if (_calificationChalleges.data && _calificationChalleges.data.prioritization) {
    try {
      calificationChalleges = Object.assign(calificationChalleges,
        JSON.parse(_calificationChalleges.data.prioritization))

    } catch (e) {
      calificationChalleges["unset"] = true;
    }
  }
  yield put({ type: PUT_CURRENT_CHALLENGE_CALIFICATION, payload: calificationChalleges });
}

function* setCalificationChallenge(action) {
  const state = yield select();

  const _calificationChalleges = yield call(axios.post, SET_CALIFICATION_CHALLENGE, {
    colaboratorId: action.payload.colaboratorId,
    challengeId: action.payload.challengeId,
    prioritization: JSON.stringify({
      fact: action.payload.fact,
      est: action.payload.est
    }),
    type: state.diagnosis.profile == PROFILE_LAB ? CHALLENGE_TYPE_EXTERNO : CHALLENGE_TYPE_INTERNO
  });

  if (_calificationChalleges.data) {
    if (state.diagnosis.profile == PROFILE_LAB && state.diagnosis.company) {
      yield put({
        type: GET_EXTERNAL_CHALLENGES, payload: {
          companyId: state.diagnosis.company.id,
          colaboratorId: action.payload.colaboratorId
        }
      });
    }

    yield put({ type: PUT_CURRENT_CHALLENGE_CALIFICATION, payload: {} });
  }


}


// challengeId
// colaboratorId
// prioritization
// type


// SET_CALIFICATION_CHALLENGE
// SET_CALIFICATION_COLABORATOR_CHALLENGE


function* getQuestiosSaga() {
  yield takeLatest(GET_ALL_QUESTIOS_SAGA, getQuestios);
}

function* getvalidateCompanySaga() {
  yield takeLatest(GET_VALIDATE_COMPANY_SAGA, getvalidateCompany);
}

function* putAnswerSaga() {
  yield takeLatest(PUT_ANSWER_SAGA, putAnswer);
}

function* deleteAnswerSaga() {
  yield takeLatest(DELETE_ANSWER_SAGA, deleteAnswer);
}

function* genetareReportSaga() {
  yield takeLatest(GENERATE_REPORT, generateReport);
}

function* generateBase64Saga() {
  yield takeEvery(GENERATE_BASE64, generateBase64);
}

function* getConsolidateDiagnosisSaga() {
  yield takeEvery(GET_CONSOLIDATE, getConsolidateDiagnosis);
}

function* updateStatusContactSaga() {
  yield takeEvery(UPDATE_STATUS_CONSOLIDATE, updateStatusContact);
}

function* toogleAspectSelectedSaga() {
  yield takeEvery(TOOGLE_SELECT_ASPECT, toogleAspectSelected);
}




function* putAllSelectAspectSaga() {
  yield takeEvery(PUT_ALL_SELECT_ASPECT, putAllSelectAspect);
}


function* getAllSelectAspectSaga() {
  yield takeEvery(GET_ALL_SELECT_ASPECT, getAllSelectAspect);
}


function* getPrioritizationChallengesSaga() {
  yield takeEvery(GET_PRIORITAZATION_CHALLENGES, getPrioritizationChallenges);
}

function* getExternalChallengesSaga() {
  yield takeEvery(GET_EXTERNAL_CHALLENGES, getExternalChallenges);
}

function* getCalificationChallengeSaga() {
  yield takeEvery(GET_CALIFICATION_COLABORATOR_CHALLENGE, getCalificationChallenge);
}

function* setCalificationChallengeSaga() {
  yield takeEvery(SET_CALIFICATION_COLABORATOR_CHALLENGE, setCalificationChallenge);
}



export default function* rootSaga() {
  yield all([
    fork(getQuestiosSaga),
    fork(getvalidateCompanySaga),
    fork(putAnswerSaga),
    fork(deleteAnswerSaga),
    fork(genetareReportSaga),
    fork(generateBase64Saga),
    fork(getConsolidateDiagnosisSaga),
    fork(updateStatusContactSaga),
    fork(toogleAspectSelectedSaga),
    fork(putAllSelectAspectSaga),
    fork(getAllSelectAspectSaga),
    fork(getPrioritizationChallengesSaga),
    fork(getExternalChallengesSaga),
    fork(getCalificationChallengeSaga),
    fork(setCalificationChallengeSaga)
  ]);
}
