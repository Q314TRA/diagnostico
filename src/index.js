import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import diagnosis from './reducers'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import getQuestiosSaga from './sagas/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(diagnosis,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(getQuestiosSaga)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
