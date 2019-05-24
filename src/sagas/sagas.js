import {
  GET_ALL_QUESTIOS_SAGA, SET_ALL_QUESTIOS, GET_ALL_QUESTIOS_API,
  GET_VALIDATE_COMPANY_API, GET_VALIDATE_COMPANY_SAGA, GET_VALIDATE_COMPANY,
  PUT_ANSWER_SAGA, PUT_ANSWER_API,
  DELETE_ANSWER_SAGA, DELETE_ANSWER_API,
  GENERATE_REPORT, PUT_REPORT_STATUS, PUT_DATA_REPORT,
  GENERATE_BASE64, GET_BASE64_SVG, PUT_BASE_64,
  PUT_CONSOLIDATE_DIAGNOSIS, GET_CONSOLIDATE_DIAGNOSIS, GET_CONSOLIDATE,
  UPDATE_STATUS_CONTACT_CONSOLIDATE, UPDATE_STATUS_CONSOLIDATE, SET_INTEREST_GROUP
} from '../constantsGlobal'

import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'

import axios from 'axios'

function* getQuestios(action) {
  const questios = yield call(axios.post, GET_ALL_QUESTIOS_API, {
    idCompany: action.payload.idCompany,
    interestGroup: action.payload.interestGroup,
    industrialSector: action.payload.industrialSector
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

  let _company = Object.assign([], company.data).pop();
  yield put({ type: GET_VALIDATE_COMPANY, payload: _company });
  // yield put({ type: GET_ALL_QUESTIOS_SAGA, payload: company.data.companyId });
}

function* putAnswer(action) {
  const company = yield call(axios.put, PUT_ANSWER_API, action.payload);

  if (company.data.idCompany != undefined && company.data.idQuestion != undefined) {
    yield put({
      type: GET_ALL_QUESTIOS_SAGA, payload: {
        idCompany: action.payload.idCompany,
        industrialSector: action.payload.industrialSector,
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
      interestGroup: action.payload.interestGroup,
      industrialSector: action.payload.industrialSector,
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
  const consolidate = yield call(axios.post, UPDATE_STATUS_CONTACT_CONSOLIDATE, {
    "idContact": action.payload.idContact,
    "companyId": action.payload.companyId
  });

  yield put({ type: GET_VALIDATE_COMPANY_SAGA, payload: action.payload.nit });
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

function* getConsolidateDiagnosisSaga() {
  yield takeEvery(GET_CONSOLIDATE, getConsolidateDiagnosis);
}

function* updateStatusContactSaga() {
  yield takeEvery(UPDATE_STATUS_CONSOLIDATE, updateStatusContact);
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
    fork(updateStatusContactSaga)
  ]);
}
