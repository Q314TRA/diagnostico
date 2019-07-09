import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles/App.css';

import Dashboard from "./dashboard/home";
import Congratulations from "./dashboard/congratulations";
// import Resume from "./resume/contentResume";
import Resume from "./resume/resume";
import ExportResume from "./resume/exportResume";
import Axis from "./axis/questionContainerAxis";

// import { getAllQuestios } from './actions/actions'

import { AnimatedSwitch } from 'react-router-transition';
// import TransitionSwitch from 'react-router-dom-transition';

import AspectContent from './prioritization/aspectContent';
import ChallengeContent from './prioritization/challenge/challengeContent';
import PrioritizationFinal from './information/prioritizationFinal';



// HashRouter as Router,
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App extends Component {


  componentWillMount() {
    // const { getAllQuestios } = this.props;
    // getAllQuestios();
  }

  render() {

    return (
      <div className="App">
        <Router>
          {/* <TransitionSwitch className="example2" duration={200}> */}
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route exact path='/' component={Dashboard}></Route>
            <Route exact path='/resume' component={Resume}></Route>
            <Route exact path='/exportResume' component={ExportResume}></Route>
            <Route exact path='/diagnosis' component={Axis}></Route>
            <Route exact path='/congratulations' component={Congratulations}></Route>
            
            <Route exact path='/aspects' component={AspectContent}></Route>
            <Route exact path='/challenges' component={ChallengeContent}></Route>
            
            <Route exact path='/endPrioritization' component={PrioritizationFinal}></Route>
          
          </AnimatedSwitch>
          {/* </TransitionSwitch> */}
        </Router>
      </div>
    );
  }
}


const mapStateToProps = state => ({

});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}
// getAllQuestios


export default connect(mapStateToProps, mapDispatchToProps)(App);
