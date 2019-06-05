import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

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
        overflowX: 'auto',
    },
    paper: {
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
        width: 300,
        margin: theme.spacing.unit * 2,
    },
})

class AddPenalty extends Component {

    state = {
        project_id: 0,
        name: '',
        description: '',
        max: 1,
        points: -1
    }

    componentDidMount() {
        const searchObject = qs.parse(this.props.location.search);
        console.log('searchObject', searchObject);
        this.setState({
            project_id: searchObject.projectId,
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
    }

    routeBack = () => {
        this.props.history.push( `/admin/projects?projectId=${this.state.project_id}` );
    }

    savePenalty = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PENALTY', payload: this.state });
        this.props.history.goBack();
        event.preventDefault();
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
                <Paper className={classes.paper}>
                    <form>
                    <Typography variant="h3" >Add Penalty</Typography>

                    
                    <div>
                        <TextField 
                            type="text" 
                            label="Penalty Name"
                            className={classes.textField}
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange} />
                        <TextField 
                            type="text" 
                            label="Penalty Description"
                            className={classes.textField}
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange} />
                        <TextField 
                            type="number" 
                            label="Max Number of Penalties"
                            className={classes.textField}
                            placeholder="1" 
                            min="1"
                            name="max"
                            value={this.state.max}
                            onChange={this.handleChange} />
                        <TextField 
                            type="number" 
                            label="Points"
                            placeholder="-1" 
                            className={classes.textField}
                            max="-1"
                            name="points"
                            value={this.state.points}
                            onChange={this.handleChange} />
                    </div>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={this.routeBack}
                    >Back
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={this.savePenalty}
                    >Save Penalty
                    </Button>
                    </form>
                </Paper>
            </Grid>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

AddPenalty.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withRouter(withStyles(styles)(AddPenalty)));