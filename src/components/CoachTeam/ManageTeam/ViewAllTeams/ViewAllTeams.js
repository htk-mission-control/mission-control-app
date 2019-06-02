import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './ViewAllTeams.css';

//----Material UI----
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: "center",
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
        // width: '100%',
    },
    paper: {
        margin: theme.spacing.unit * 2,
        maxWidth: 700,
        padding: theme.spacing.unit * 2,
        textAlign: "center",
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
        paddingLeft: "5%",
        paddingRight: "5%",
    },
})

class ViewAllTeams extends Component {

    componentDidMount(){
        // need the coach id to get their specific teams
        console.log( 'user id is:', this.props.reduxState );
        let coachId = this.props.reduxState.user.id;
        this.props.dispatch( { type: 'GET_ALL_TEAMS', payload: coachId } );
    }

    routeToAddTeam = () => {
        this.props.history.push('/coach/create-team');
    }

    // The following three routes are dependent on team's id
    // OR should we set these up as links and pass team_id as props?
    routeToCreateRun = (event) => {
        let team_id = event.currentTarget.value;
        console.log('team_id', team_id);
        
        this.props.history.push(`/practice-run?teamId=${team_id}`);
    }
    routeToTeamMembers = (event) => {
        console.log('team_id', event.currentTarget.value);
        
        let team_id = event.currentTarget.value;
        this.props.history.push(`/coach?teamId=${team_id}`);
    }
    routeToRunHistory = (event) => {
        let team_id = event.currentTarget.value;
        this.props.history.push(`/history?teamId=${team_id}`);
    }

    // dispatch for PUT request to update team_access
    changePermission = (event) => {
        console.log( `team_id:`, event.target.name );
        console.log( `access:`, event.target );
        
        let team_id = event.target.name;
        let access = event.target.value;
        let coachId = this.props.reduxState.user.id;
        let permissionObject = {team_id, permission: access, coachId};
        console.log( `permissionObject:`, permissionObject );
        
        this.props.dispatch( {type: 'UPDATE_TEAM_ACCESS', payload: permissionObject} );
    }

    render(){

        const { classes } = this.props;

        return(
            <Grid
                className={classes.root}
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={5}
            >
                <Grid item>
                    <Typography variant="h3">Teams</Typography>

                    <Button 
                        variant="contained"
                        color="secondary" 
                        className={classes.button}
                        onClick={this.routeToAddTeam} 
                    >
                        Create New Team
                    </Button>
                </Grid>
                {/* map teams connected to coach's id and display as a card with button-links */}
                {this.props.reduxState.allTeams.map( team => 
                    <Paper className={classes.paper} key={team.id} >
                        <Typography variant="h4">{team.name}</Typography>
                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.routeToCreateRun}
                            value={team.id} 
                            >
                                Create New Run
                        </Button>
                        <br/>
                        <Button 
                            className="route-link"
                            variant="contained"
                            color="primary" 
                            className={classes.button}
                            onClick={this.routeToTeamMembers}
                            value={team.id} 
                        >
                                View Team Members
                        </Button>
                        <br/>
                        <Button 
                            className="route-link" 
                            variant="contained"
                            color="primary" 
                            className={classes.button}
                            onClick={this.routeToRunHistory}
                            value={team.id}
                        >
                                View Run History
                        </Button>
                        <br/>
                        
                        <Grid item>
                            <Typography variant="h6">Allow your team to create runs</Typography>
                            
                            {/* Toggle switch for team_access */}
                            <label className="switch">
                                <input type="checkbox" 
                                    onClick={this.changePermission}
                                    name={team.id} 
                                    value={team.team_access}
                                    checked={team.team_access === true} />
                                <span className="slider round"></span>
                            </label>
                        </Grid>
                    </Paper>
                )}
            </Grid>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

ViewAllTeams.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default connect(mapReduxStateToProps)(withRouter(withStyles(styles)(ViewAllTeams)));