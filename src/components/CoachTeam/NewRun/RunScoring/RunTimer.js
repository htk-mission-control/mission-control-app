import React, { Component } from "react";
import Timer from 'react-compound-timer';

// This timer will count down from 2:30 and stop at 0:00. The Start Timer button
// will start/resume, and the Stop Timer button will stop/pause the timer.
// Checkpoints can be set to run callback functions.
// COMMENTED CODE are functions based on checkpoints.
class RunTimer extends Component {

  // state = {
  //   buttonIsDisabled: false,
  //   checkpoint1: false,
  //   checkpoint2: false,
  //   checkpoint3: false,
  // }

  // setBackroundColor = () => {
  //   if ( this.state.checkpoint1 ) {
  //     console.log('setting background color to orange');
  //     return('orange-backround');
  //   } else if ( this.state.checkpoint2 ) {
  //     console.log(('setting background color to darker orange'));
  //     return('dark-orange-backround');
  //   } else if ( this.state.checkpoint3 ) {
  //     console.log(('setting background color to red'));
  //     return('red-backround');
  //   }
  // }  

  // disableButtons = () => {
  //   this.setState({buttonIsDisabled: true})
  // }

  // resetRun = () => {
  //   console.log('resetting run:', this.state);
  //   this.setState({
  //     score: 0,
  //     runId: 0,
  //     goals: [],
  //     eitherOr: [],
  //     penalties: []
  //   })
  // }

  // resetState = () => {
  //   this.setState({
  //     checkpoint1: false,
  //     checkpoint2: false,
  //     checkpoint3: false,
  //   });
  // }


  render() {
    return (
        <Timer
          className = '.red-backround'
          initialTime = { 1000  }
          startImmediately = { false }
          direction = "backward"
          checkpoints={[
            {
              time: 0,
              callback: () => this.props.setCheckpoint('disable-buttons'),
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
                <Timer.Minutes />:
                <Timer.Seconds />
              </div>
              {/* <div>{ timerState }</div> */}
              <br />
              <div>
                <button onClick={ start }>Start Timer</button>
                <button onClick={ stop } >Stop Timer</button>
                {/* <button onClick={ reset } onclick={ this.resetState }>Reset Timer</button> */}
              </div>
            </React.Fragment>
          )}
        </Timer>
    );
  }
}

export default RunTimer;
