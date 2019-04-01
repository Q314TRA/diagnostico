import {GET_ALL_QUESTIOS_SAGA, SET_ALL_QUESTIOS,  GET_ALL_QUESTIOS_API} from '../constantsGlobal'

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import axios from 'axios'

function* getQuestios() {
      const questios = yield call(axios.get,  GET_ALL_QUESTIOS_API);
      yield put({type: SET_ALL_QUESTIOS, payload: questios});
}


function* getQuestiosSaga() {
  yield takeLatest(GET_ALL_QUESTIOS_SAGA, getQuestios);
}

export default getQuestiosSaga;