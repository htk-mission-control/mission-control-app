import React, { Component } from "react";
import Timer from 'react-compound-timer';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class RunTimer extends Component {

  state = {
    buttonIsDisabled: false,
    checkpoint1: false,
    checkpoint2: false,
    checkpoint3: false,
  }

  setBackroundColor = () => {
    if ( this.state.checkpoint1 ) {
      console.log('setting background color to orange');
      return('orange-backround');
    } else if ( this.state.checkpoint2 ) {
      console.log(('setting background color to darker orange'));
      return('dark-orange-backround');
    } else if ( this.state.checkpoint3 ) {
      console.log(('setting background color to red'));
      return('red-backround');
    }
  }

  disableButtons = () => {
    this.setState({buttonIsDisabled: true})
  }

  resetRun = () => {
    console.log('resetting run:', this.state);
    this.setState({
      score: 0,
      runId: 0,
      goals: [],
      eitherOr: [],
      penalties: []
    })
  }

  resetState = () => {
    this.setState({
      checkpoint1: false,
      checkpoint2: false,
      checkpoint3: false,
    });
  }


  render() {
    return (
        <Timer
          className = '.red-backround'
          initialTime = { 12000  }
          startImmediately = { false }
          direction = "backward"
          checkpoints={[
            {
              time: 0,
              callback: () => this.disableButtons(),
            },
            {
              time: 10000,
              callback: () => this.setState({ checkpoint1: true, checkpoint2: false, checkpoint3: false }),
            },
            {
              time: 7000,
              callback: () => this.setState({ checkpoint1: false, checkpoint2: true, checkpoint3: false }),
            },
            {
              time: 4000,
              callback: () => this.setState({ checkpoint1: false, checkpoint2: false, checkpoint3: true }),
            }
          ]}
        > 
          {({ start, resume, pause, stop, reset, timerState }) => (
            <React.Fragment> 
              <div>
                <Timer.Minutes /> minutes
                <Timer.Seconds /> seconds
              </div>
              <div>{ timerState }</div>
              <br />
              <div>
                <button onClick={ start }>Start</button>
                <button onClick={ stop } disabled={ this.state.buttonIsDisabled } >Stop</button>
                <button onClick={ reset } onclick={ this.resetState }>Reset</button>
              </div>
            </React.Fragment>
          )}  
        </Timer>
    );
  }
}

export default RunTimer;
