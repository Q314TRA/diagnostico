import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import App from './App';
import QuestionContainerAxis from   "./axis/questionContainerAxis";
import Home from   "./dashboard/home";
import ContentResume from   "./resume/contentResume";

const Root = ({ store }) => (
        <Router history={hashHistory} >
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="diagnosis" component={QuestionContainerAxis} />
                <Route path="resume" component={ContentResume} />
            </Route>
        </Router>
    
);



export default Root;