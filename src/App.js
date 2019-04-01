import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import logo from './logo.svg';
import './App.css';
// import questions from "./questions.json";
import { PieChart, Pie, Sector } from 'recharts';

import Dashboard from "./dashboard/home";
import Resume from "./resume/contentResume";
import Axis from "./axis/questionContainerAxis";

import { getAllQuestios } from './actions/actions'


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App extends Component {


  componentWillMount() {
    const { getAllQuestios } = this.props;
    getAllQuestios();
  }

  render() {

    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Dashboard}></Route>
          <Route exact path='/resume' component={Resume}></Route>
          <Route exact path='/diagnosis' component={Axis}></Route>
        </Router>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllQuestios
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
