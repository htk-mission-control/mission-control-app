import React, { Component } from 'react';
import { connect } from 'react-redux';

//----Material UI----
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
    },
    paper: {
        maxWidth: 375,
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        minWidth: 360,
    },
    button: {
        marginTop: 20,
        marginBottom: 15,
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    panel: {
        minWidth: 360,
    }
})

class ProjectOverview extends Component {

    state = {
        projectId: 0,
        editProject: false,
        projectName: '',
        projectDetails: {},
        projectPenalties: [],
        projectMissions: [],
        projectEitherOr: [],
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ALL_PROJECTS' })
        this.props.dispatch({ type: 'GET_PROJECT_DETAILS', payload: this.state });
        this.props.dispatch({ type: 'GET_PENALTIES', payload: this.state });
        this.props.dispatch({ type: 'GET_MISSIONS', payload: this.state });
        this.props.dispatch({ type: 'GET_EITHER_OR', payload: this.state });
    }

    componentDidUpdate(prevProps) {
        if (this.state.projectDetails.length === 0) {
            this.props.dispatch({ type: 'GET_PROJECT_DETAILS', payload: this.state });
            this.props.dispatch({ type: 'GET_PENALTIES', payload: this.state });
            this.props.dispatch({ type: 'GET_MISSIONS', payload: this.state });
            this.props.dispatch({ type: 'GET_EITHER_OR', payload: this.state });
        }
        if (this.props.reduxState.projects !== prevProps.reduxState.projects) {
            this.setState({
                projectId: this.props.reduxState.projects[0].id
            })
        };
        if (this.props.reduxState.projectDetails !== prevProps.reduxState.projectDetails) {
            this.setState({
                projectId: this.props.reduxState.projects[0].id,
                projectName: this.props.reduxState.projectDetails.name,
                projectDetails: this.props.reduxState.projectDetails
            })

        };
        if (this.props.reduxState.penalties !== prevProps.reduxState.penalties) {
            this.setState({
                projectPenalties: this.props.reduxState.penalties
            })
        };
        if (this.props.reduxState.projectMission !== prevProps.reduxState.projectMission) {
            this.setState({
                projectMissions: this.props.reduxState.projectMission
            })
        };
        if (this.props.reduxState.eitherOr !== prevProps.reduxState.eitherOr) {
            this.setState({
                projectEitherOr: this.props.reduxState.eitherOr
            })
        };
    }

    groundControl = () => {
        const { classes } = this.props;

        let missionArr = this.state.projectMissions;
        let newArr = [];
        let test = [];

        //Find a way to stop loop other than #100
        for (let count = 0; count < 100; count++) {
            test = missionArr.filter(x => x.mission_id === count)

            if (test.length !== 0) {

                newArr.push(test)
            }
        }
        return (
            newArr.map((mission, i) => {
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
                                        <Grid item>                     
                                        <Typography variant="h6">Desription:</Typography>
                                        <Typography variant="body1">{mission[0].description}</Typography>

                                        </Grid>     
                                        <Grid item>
                                        <Typography variant="h6">Goals:</Typography>
                                        {mission.map((mission, i) => {
                                            return (
                                                <div key={i}>
                                                        {this.renderGoals(mission)}
                                                </div>
                                            )
                                        })}
                                         </Grid>
                            </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                )
            })
        )
    }

    renderGoals = (mission) => {
        if (mission.goal_type_id === 1) {
            return (
                <div>
                    <Typography variant="body1">{mission.name}</Typography>
                    <Typography variant="body2">{mission.points} points</Typography>
                </div>
            )
        }
        else if (mission.goal_type_id === 2) {
            return (
                this.state.projectEitherOr.map((either, i) => {
                    if (mission.goal_id === either.goal_id) {
                        return (
                            <div key={i}>
                                <Typography variant="body1">{either.name}</Typography>
                                <Typography variant="body2">{either.points} points</Typography>
                                {this.renderOrText(either)}
                            </div>
                        )
                    }
                    return <div></div>
                })
            )
        }
        else if (mission.goal_type_id === 3) {

            return (
                <div>
                    <Typography variant="body1">{mission.name}</Typography>
                    <Typography variant="body2">{mission.points} points each</Typography>
                </div>
            )
        }
    }
    //-----TODO-----
    //finish OR render to DOM
    renderOrText = (either) => {
        // console.log('either length', either);
        return <Typography variant="title">OR</Typography>
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid
                className={classes.root}
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={16}
            >
                <Grid item>
                    <Typography variant="h3">{this.state.projectDetails.name}:</Typography>
                    <Typography variant="h3">{this.state.projectDetails.year}</Typography>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography variant="h4">The Project:</Typography>
                        <Typography variant="body1">{this.state.projectDetails.description}</Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Typography variant="h3">Missions</Typography>
                    {this.groundControl()}
                </Grid>
                <Grid item>
                    <Typography variant="h3">Penalties</Typography>
                    {this.state.projectPenalties.map(penalty => {
                        return (
                            <Paper key={penalty.id} className={classes.paper}>
                                <Typography variant="h4">{penalty.name}</Typography>
                                {/* <Typography variant="h5">Description</Typography> */}
                                <Typography variant="body2">{penalty.description}</Typography>
                                <Typography variant="body1">Penalty Points: {penalty.points}</Typography>
                                <Typography variant="body1">Max Penalties: {penalty.max}</Typography>
                            </Paper>
                        )
                    })}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

ProjectOverview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ProjectOverview));