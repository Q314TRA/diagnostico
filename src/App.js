import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import questions from "./questions.json";

import QuestionContainerAxis from './axis/questionContainerAxis.js';
import Home from './dashboard/home.js';
import ContentResume from './resume/contentResume.js';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
     <Router>
      <div>
        {/* <Header /> */}

        <Route exact path="/" component={Home} />
        <Route path="/about" component={QuestionContainerAxis} />
        <Route path="/topics" component={ContentResume} />
      </div>
    </Router>
    );
  }
}

export default App;
