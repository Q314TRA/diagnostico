import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import questions from "./questions.json";

import QuestionContainerAxis from 'axis/questionContainerAxis.js';
import Home from 'dashboard/home.js';
import ContentResume from 'resume/contentResume.js';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAxis: "",
      questions: questions,
      resumeView: false,
      activeIndex: 0
    }
    this.setcurrentAxis = this.setcurrentAxis.bind(this);
  }

  setcurrentAxis(axis) {
    this.setState({
      currentAxis: axis
    })
  }

  render() {

    let currentQuest = this.state.questions.filter(quest => quest.eje == this.state.currentAxis);

    return (
      <div className="App" >

        {this.state.resumeView &&
          <ContentResume questions={questions} />
        }

        {/* {this.state.currentAxis && !this.state.resumeView &&
          <h1>{this.state.currentAxis}</h1>
        } */}

        {currentQuest.length == 0 &&
          <Home />
        }


        {!this.state.resumeView &&

          <QuestionContainerAxis currentQuest={currentQuest} />


        }

        {/* <div className="content-panel-cm fadeout"></div> */}

        {!this.state.resumeView &&
          <div className="content-panel-cm content-panel">
            <div className="item" onClick={() => this.setcurrentAxis("ECONOMICO")} >
              <img src="coin.svg"></img>
              {/* <span>Economico</span> */}
            </div>
            <div className="item" onClick={() => this.setcurrentAxis("SOCIAL")} >
              <img src="user.svg"></img>
              {/* <span>Social</span> */}
            </div>
            <div className="item" onClick={() => this.setcurrentAxis("AMBIENTAL")} >
              <img src="leaf.svg"></img>
              {/* <span>Ambiental</span> */}
            </div>

          </div>
        }

        {!this.state.resumeView &&
          <div>
            <div className="doot-global home" onClick={() => {
              this.setState({
                currentAxis: ""
              })
            }}>
              <img src="house.png"></img>
            </div>

            <div className="doot-global finish" onClick={() => {
              this.setState({
                resumeView: true
              })
            }}>
              <img src="flag.png"></img>
            </div>
          </div>
        }

        {/* <div className="content-panel-cm content-panel-zone">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div> */}


      </div>
    );
  }
}

export default App;
