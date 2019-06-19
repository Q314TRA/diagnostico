import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import questions from "./questions.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: questions.map((quest) => {
        quest.ref = React.createRef();
        return quest;
      })
    }

  }

  componentDidMount() {
    this.state.questions.forEach(element => {
      /* console.log(element.ref.getBoundingClientRect());  */
    });
  }

  render() {
    return (
      <div className="App" >
        <div className="wraperContent">
          <div className="burbleConten" >
            {this.state.questions.map(item => (
              <div className="burble" innerRef={item.ref} >
                <span className="quest">
                  {item.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
