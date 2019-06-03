import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

//----Material UI----
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
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
        width: '100%',
        overflowX: 'auto',
    },
    paper: {
        margin: theme.spacing.unit * 2,
        maxWidth: 700,
        padding: theme.spacing.unit,
        textAlign: "center",
    },
    button: {
        marginTop: 20,
        marginBottom: 15,
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    spacing: {
        marginTop: 25,
        marginBottom: 15,
    },
    textField: {
        width: 300,
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
})

class RunSummary extends Component {

    state = {
        count: 1,
        notes: '',
        runId: this.props.reduxState.runHistoryDetails.id,
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log(`query runId:`, values.runId);
        // this.props.dispatch( {type: 'GET_RUN_DETAILS', payload: values.runId} );
    }

    componentDidUpdate(prevProps) {
        if (this.props.reduxState.runHistoryDetails !== prevProps.reduxState.runHistoryDetails) {
            this.setState({ ...this.state, runId: this.props.reduxState.runHistoryDetails.id });
            console.log(`Count:`, this.state.count);

        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            notes: event.target.value,
        })
    }

    handleSave = () => {
        console.log(`State:`, this.state);
        console.log(`runId should be:`, this.props.reduxState.runHistoryDetails.id);


        this.props.dispatch({ type: `UPDATE_RUN_NOTES`, payload: this.state });
        if (this.props.reduxState.user.security_clearance === 2) {
            this.props.history.push(`/home`);
        } else {
            this.props.history.push(`/home`);
        }
        this.props.dispatch({ type: `RESET_RUN_DETAILS` });
    }

    render() {
        const runDetails = this.props.reduxState.runHistoryDetails;
        console.log(`RunDetails:`, runDetails);
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
                <Typography variant="h2">Summary</Typography>
                <Typography variant="h2">{runDetails.name}</Typography>

                <div className={classes.spacing}>
                    <Typography variant="h3">Final Score</Typography>
                    <Typography variant="h4">{runDetails.score}</Typography>
                    <Typography variant="h6"><b>Driver:</b> {runDetails.driver}</Typography>
                    <Typography variant="h6"><b>Assistant:</b> {runDetails.assistant}</Typography>
                    <Typography variant="h6"><b>Scorekeeper:</b> {runDetails.score_keeper}</Typography>
                </div>

                <div className={classes.spacing}>
                    <Typography  variant="h6">Completed Goals: {runDetails.count}</Typography>
                    <Typography  variant="h6">Penalties: {runDetails.penalties}</Typography>
                </div>

                <div className={classes.spacing}>
                    <TextField 
                        type="text" 
                        label="Notes"
                        multiline
                        rows={5}
                        margin="normal" 
                        className={classes.textField}    
                        value={this.state.notes} 
                        onChange={this.handleChange} 
                    />
                </div>

                <div>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.handleSave} 
                    >Save
                    </Button>
                </div>
            </Grid>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

RunSummary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withStyles(styles)(RunSummary));