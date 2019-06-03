import React, { Component } from "react";
import Timer from 'react-compound-timer';

//----Material UI----
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
      flexGrow: 1,
      textAlign: "center",
      padding: theme.spacing.unit,
      overflowX: 'auto',
  },
  paper: {
      margin: theme.spacing.unit,
      padding: theme.spacing.unit * 2,
      textAlign: "center",
  },
  button: {
      maxWidth: 300,
      minWidth: 200,
      margin: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
  }
});
// This timer will count down from 2:30 and stop at 0:00. The Start Timer button
// will start/resume, and the Stop Timer button will stop/pause the timer.
// Checkpoints can be set to run callback functions.
// COMMENTED CODE are functions based on checkpoints.
// In the future, we could give admin the ability to set how long runs should be.
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
    const { classes } = this.props;

    return (
        <Timer
          className = '.red-backround'
          initialTime = { 150000  }
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
            <Paper className={classes.paper}> 
              <div>
              <Typography variant="h3">
                <Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}/>:
                <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
              </Typography>
              </div>
              {/* <div>{ timerState }</div> */}
              <br />
                <Button 
                  variant="contained" 
                  color="primary" 
                  className={classes.button}
                  onClick={ start }>Start Timer
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  className={classes.button}
                  onClick={ stop } >Stop Timer
                </Button>
                {/* <button onClick={ reset } onclick={ this.resetState }>Reset Timer</button> */}
              </Paper>
            </React.Fragment>
          )}
        </Timer>
    );
  }
}

RunTimer.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(RunTimer);
