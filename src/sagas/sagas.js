import {
  GET_ALL_QUESTIOS_SAGA, SET_ALL_QUESTIOS, GET_ALL_QUESTIOS_API,
  GET_VALIDATE_COMPANY_API, GET_VALIDATE_COMPANY_SAGA, GET_VALIDATE_COMPANY,
  PUT_ANSWER_SAGA, PUT_ANSWER_API,
  DELETE_ANSWER_SAGA, DELETE_ANSWER_API,
  GENERATE_REPORT, PUT_REPORT_STATUS, PUT_DATA_REPORT,
  GENERATE_BASE64, GET_BASE64_SVG, PUT_BASE_64
} from '../constantsGlobal'

import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'

import axios from 'axios'

function* getQuestios(action) {
  const questios = yield call(axios.post, GET_ALL_QUESTIOS_API, {
    idCompany: action.payload.idCompany,
    interestGroup: action.payload.interestGroup
  });
  yield put({
    type: SET_ALL_QUESTIOS, payload: questios.data.map((item) => {
      item.selected = !!item.companyDiagnosis;
      return item;
    })
  });
}

function* getvalidateCompany(action) {
  const company = yield call(axios.post, GET_VALIDATE_COMPANY_API, {
    hash: action.payload
  });
  yield put({ type: GET_VALIDATE_COMPANY, payload: company.data });
  // yield put({ type: GET_ALL_QUESTIOS_SAGA, payload: company.data.companyId });
}

function* putAnswer(action) {
  const company = yield call(axios.put, PUT_ANSWER_API, action.payload);

  if (company.data.idCompany != undefined && company.data.idQuestion != undefined) {
    yield put({
      type: GET_ALL_QUESTIOS_SAGA, payload: {
        idCompany: action.payload.idCompany,
        interestGroup: action.payload.interestGroup
      }
    });
  }

}

function* deleteAnswer(action) {
  yield call(axios.post, DELETE_ANSWER_API, action.payload);

  yield put({
    type: GET_ALL_QUESTIOS_SAGA, payload: {
      idCompany: action.payload.idCompany,
      interestGroup: action.payload.interestGroup
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



export default function* rootSaga() {
  yield all([
    fork(getQuestiosSaga),
    fork(getvalidateCompanySaga),
    fork(putAnswerSaga),
    fork(deleteAnswerSaga),
    fork(genetareReportSaga),
    fork(generateBase64Saga),
  ]);
}
