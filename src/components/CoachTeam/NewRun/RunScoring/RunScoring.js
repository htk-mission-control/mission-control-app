import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaUndo } from 'react-icons/fa';

//----Material UI----
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: "center",
        padding: theme.spacing.unit,
        overflowX: 'auto',
    },
    pointSpace: {
        margin: 10,
    },
    panel: {
        minWidth: 350,
    },
    paper: {
        // margin: theme.spacing.unit * 2,
        maxWidth: 375,
        padding: theme.spacing.unit * 2,
        textAlign: "center",
    },
    button: {
        maxWidth: 300,
        margin: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    textField: {
        width: 250,
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
    menu: {
        width: 250,
    },
})

class RunScoring extends Component {

    state = {
        score: 0,
        runId: 0,
        goals: [],
        eitherOr: [],
        penalties: []
    }

    componentDidUpdate(prevProps) {
        if (this.props.reduxState.runDetails !== prevProps.reduxState.runDetails) {
            this.setState({
                runId: this.props.reduxState.runDetails.id,
            })
        }
        if (this.props.reduxState.penalties !== prevProps.reduxState.penalties) {
            this.setState({
                penalties: this.props.reduxState.penalties,
            })
        }
        if (this.props.reduxState.selectedMissions !== prevProps.reduxState.selectedMissions) {
            this.setState({
                goals: this.props.reduxState.selectedMissions,
            })
        }
        if (this.props.reduxState.eitherOr !== prevProps.reduxState.eitherOr) {
            this.setState({
                eitherOr: this.props.reduxState.eitherOr,
            })
        }
    };

    missionList = () => {
        const { classes } = this.props;

        let missionArr = this.state.goals;
        let eitherOrArr = this.state.eitherOr;
        let newMissionArr = [];
        let newEitherOrArr = [];
        let test = [];

        //Find a way to stop loop other than #100
        for (let count = 0; count < 100; count++) {
            test = missionArr.filter(x => x.mission_id == count)

            if (test.length !== 0) {
                newMissionArr.push(test)
            }
        }
        // console.log('newMissionsArr', newMissionArr);

        for (let count = 0; count < 100; count++) {
            test = eitherOrArr.filter(x => x.either_or_goal_id === count)

            if (test.length !== 0) {
                newEitherOrArr.push(test)
            }
        }

        // console.log('newEitherOrArr', newEitherOrArr);
        return (
            newMissionArr.map((mission, i) => {
                return (
                    <div key={i}>
                        <ExpansionPanel className={classes.panel}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="body2">Mission {i + 1}: {mission[0].mission_name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    {mission.map((goal, y) => {
                                        return (
                                            <div key={y}>
                                                {this.renderGoals(goal, newEitherOrArr)}
                                            </div>
                                        )
                                    })}
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                )
            })
        )
    }

    penaltyList = () => {
        const { classes } = this.props;

        return (
            this.state.penalties.map((penalty, i) => {
                return (
                    <Grid item key={penalty.id}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4">{penalty.name}</Typography>
                            <Typography variant="h6">Count: {penalty.count}</Typography>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={() => { this.penaltyOnClick(i) }}
                                disabled={penalty.disabled}
                            >Add Penalty
                            </Button>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={() => { this.undoOnClick(i) }}
                            >Undo<FaUndo />
                            </Button>
                        </Paper>
                    </Grid>
                )
            })
        )
    }


    renderGoals = (goal, eitherOr) => {
        const { classes } = this.props;

        if (goal.goal_type_id === 1) {
            return (
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    disabled={goal.disabled} 
                    onClick={() => { this.yesNoOnClick(goal) }}
                ><div>{goal.goal_name}</div> <div className={classes.pointSpace}>{goal.goal_points} pts</div>
                </Button>
            )
        }
        else if (goal.goal_type_id === 2) {

            return (
                eitherOr.map((options) => {
                    return (
                        options.map((option, i) => {
                            if (goal.goal_id == option.either_or_goal_id) {
                                return (
                                    <div key={i}>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            className={classes.button}
                                            disabled={option.disabled} 
                                            onClick={() => { this.eitherOrOnClick(option, goal) }}
                                            ><div>{option.either_or_name}</div> <div className={classes.pointSpace}>{option.either_or_points} pts</div>
                                        </Button>
                                        {this.renderOrText(options, i)}
                                    </div>
                                )
                            }
                        })
                    )
                })
            )
        }
        else if (goal.goal_type_id === 3) {

            return (
                <div>
                    <Button 
                        disabled={goal.disabled} 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={() => { this.howManyOnClick(goal) }}
                        ><div>{goal.goal_name}</div><div className={classes.pointSpace}>{goal.goal_points} pts each</div>
                    </Button>
                </div>
            )
        }
    }

    renderOrText = (options, i) => {
        // console.log('options length', options.length);
        if (i < (options.length - 1)) {
            return <Typography variant="h5">Or</Typography>
        }
        return null;
    }

    penaltyOnClick = (i) => {
        let updatedPenalties = [...this.state.penalties];
        // console.log(`penalty.count is`, updatedPenalties[i].count);
        // console.log(`penalty.max is`, updatedPenalties[i].max);
        if ((updatedPenalties[i].count < updatedPenalties[i].max) && (updatedPenalties[i].disabled === false)) {
            updatedPenalties[i].count = updatedPenalties[i].count + 1
        }
        if (updatedPenalties[i].count === updatedPenalties[i].max) {
            updatedPenalties[i].disabled = true;
        }
        this.setState({
            penalties: updatedPenalties
        })
        // console.log(`penalty.count end is`, updatedPenalties[i].count);
        // console.log(`penalty.disabled end is`, updatedPenalties[i].disabled);
    }

    undoOnClick = (i) => {
        let updatedPenalties = [...this.state.penalties];
        updatedPenalties[i].disabled = false;
        if (updatedPenalties[i].count <= (updatedPenalties[i].max + 1) && updatedPenalties[i].count > 0) {
            updatedPenalties[i].count = updatedPenalties[i].count - 1
            // console.log(`penalty.count is undooooo`, updatedPenalties[i].count);
        }
        this.setState({
            penalties: updatedPenalties
        })
    }

    // function to add points for how many goal type on click and disable button when max is reached
    howManyOnClick = (goal) => {
        // console.log('goal', goal);

        let updatedGoals = [...this.state.goals];
        // console.log('updatedGoals', updatedGoals);

        let goalIndex = 0;
        let currentScore = this.state.score;

        for (let i = 0; i < updatedGoals.length; i++) {
            if (updatedGoals[i].goal_id === goal.goal_id) {
                goalIndex = i;
            }
        }

        updatedGoals[goalIndex].count = updatedGoals[goalIndex].count + 1;
        updatedGoals[goalIndex].isCompleted = true;

        if (updatedGoals[goalIndex].count <= updatedGoals[goalIndex].how_many_max) {
            currentScore = currentScore + updatedGoals[goalIndex].goal_points
        }
        if (updatedGoals[goalIndex].count == updatedGoals[goalIndex].how_many_max) {
            updatedGoals[goalIndex].disabled = true;
        }

        this.setState({
            score: currentScore,
            goals: updatedGoals
        })
    }

    // function to add points for yes/no goal type on click and disable button after click
    yesNoOnClick = (goal) => {
        // console.log('goal', goal);

        let updatedGoals = [...this.state.goals];
        // console.log('updatedGoals', updatedGoals);

        let goalIndex = 0;
        let currentScore = this.state.score;

        for (let i = 0; i < updatedGoals.length; i++) {
            if (updatedGoals[i].goal_id === goal.goal_id) {
                goalIndex = i;
            }
        }

        // console.log(`goalIndex`, goalIndex);
        if (updatedGoals[goalIndex].disabled === false) {
            currentScore = currentScore + updatedGoals[goalIndex].goal_points
        }
        updatedGoals[goalIndex].isCompleted = true;
        updatedGoals[goalIndex].disabled = true;
        this.setState({
            score: currentScore,
            goals: updatedGoals
        })
        // console.log(`this.state.score`, this.state.score);
    }

    // function to add points for either/or goal type on click and disable all options after click
    eitherOrOnClick = (option, goal) => {

        let updatedGoals = [...this.state.goals];
        let updatedEitherOr = [...this.state.eitherOr]
        let goalIndex = 0;
        let currentScore = this.state.score;
        let optionIndex = 0;

        for (let i = 0; i < updatedGoals.length; i++) {
            // console.log((` in i loop `,updatedGoals[i]));

            if (updatedGoals[i].goal_id === goal.goal_id) {
                goalIndex = i;
                updatedGoals[i].isCompleted = true;
            }

        }
        for (let i = 0; i < updatedEitherOr.length; i++) {
            if (updatedEitherOr[i].either_or_id === option.either_or_id) {
                optionIndex = i;
            }
        }
        if (updatedGoals[goalIndex].disabled === false) {
            // console.log(`goal`, goal)
            // console.log(`updatedEitherOr optionIndex`, optionIndex)
            // console.log(`updatedEitherOr`, updatedEitherOr)
            // console.log(`option`, option);
            currentScore = currentScore + updatedEitherOr[optionIndex].either_or_points
        }

        for (let choice of updatedEitherOr) {
            if (choice.either_or_goal_id === goal.goal_id) {
                choice.disabled = true;
            }
        }

        this.setState({
            score: currentScore,
            goals: updatedGoals,
            eitherOr: updatedEitherOr
        })
    }

    calculateScore = () => {
        let score = this.state.score;
        for (let penalty of this.state.penalties) {
            score = score + (penalty.count * penalty.points)
        }
        return score;
    }

    handleSubmit = () => {
        console.log(`final state`, this.state);
        this.props.dispatch({ type: 'UPDATE_RUN_DETAILS', payload: this.state });
    }

    render() {
        const { classes } = this.props;


        return (

            <Grid
                container
                className={classes.root}
                direction="column"
                justify="center"
                alignItems="center"
                spacing={16}
            >
                <Grid item>
                    <Typography variant="h3">Score: {this.calculateScore()}</Typography>
                    <Typography variant="h4">{this.props.reduxState.runDetails.name}</Typography>
                </Grid>
                <Grid item>
                    {this.penaltyList()}
                </Grid>
                <Grid item>
                    {this.missionList()}
                </Grid>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                >End Run
                </Button>
            </Grid>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

RunScoring.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withStyles(styles)(RunScoring));