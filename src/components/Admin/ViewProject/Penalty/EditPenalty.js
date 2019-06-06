import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
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

class EditPenalty extends Component {

    // TO DO!!! 
    // need to get penalty_id from Brad
    state = {
        // penalty_id source needs to change, or call it directly in componentDidMount/dispatch/payload
        penalty_id: this.props.reduxState.projects.id || 1,
        name: '',
        description: '',
        max: '',
        points: ''
    }

    componentDidMount(){
        const searchObject = qs.parse(this.props.location.search);
        console.log('searchObject', searchObject);
        this.setState({
            penalty_id: searchObject.penaltyId,
        })
        this.props.dispatch( {type: 'GET_PENALTY', payload: searchObject.penaltyId} );
    }

    componentDidUpdate(prevProps){
        if( this.props.reduxState.penalty !== prevProps.reduxState.penalty ){
            this.setState({
                ...this.state, 
                name: this.props.reduxState.penalty.name || '',
                description: this.props.reduxState.penalty.description || '',
                max: this.props.reduxState.penalty.max || '',
                points: this.props.reduxState.penalty.points || ''
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
        // console.log( `new state:`, this.state );
    }

    routeBack = () => {
        this.props.history.push( `/admin/projects?projectId=${this.props.reduxState.projectDetails.id}`);
    }

    updatePenalty = (event) => {
        let update = {...this.props.reduxState.penalty};
        console.log( update );

        let penaltyUpdate = {
            penalty_id: this.state.penalty_id || 1,
            name: this.state.name,
            description: this.state.description,
            max: this.state.max,
            points: this.state.points,
        };

        this.props.dispatch( {type: 'UPDATE_PENALTY', payload: penaltyUpdate} );
        this.props.history.push( `/admin/projects?projectId=${this.props.reduxState.projectDetails.id}`);
        event.preventDefault();
    }

    render() {

        const { classes } = this.props;

        return(
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
                <Typography variant="h3">Edit Penalty</Typography>

                <div>
                    <TextField 
                        type="text" 
                        label="Penalty Name"
                        className={classes.textField}
                        value={this.state.name}
                        name="name"
                        onChange={this.handleChange} 
                    />
                    <TextField 
                        type="text" 
                        name="description"
                        label="Penalty Description"
                        className={classes.textField}
                        value={this.state.description}
                        onChange={this.handleChange} 
                    />
                    <TextField 
                        type="number" 
                        label="Max Number of Penalties"
                        className={classes.textField}
                        name="max" 
                        min="1"
                        value={this.state.max}
                        onChange={this.handleChange} 
                    />
                    <TextField 
                        type="number" 
                        name="points"
                        label="Points"
                        className={classes.textField}
                        max="-1"
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
                    onClick={this.updatePenalty} 
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

EditPenalty.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withRouter(withStyles(styles)(EditPenalty)));