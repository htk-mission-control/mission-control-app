import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import qs from 'query-string';


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

        return(
            <div>
                <h2>Edit Penalty</h2>

                <form onSubmit={this.updatePenalty} >
                    <label>Name</label>
                    <input type="text" 
                        value={this.state.name}
                        name="name"
                        required
                        onChange={this.handleChange} />
                    <br/>

                    <label>Description</label>
                    <input type="text" 
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange} />
                    <br/><br/>
                    
                    <label>Max number of penalties</label>
                    <input type="number" 
                        name="max" min="1"
                        required
                        value={this.state.max}
                        onChange={this.handleChange} />
                    <br/>
                    
                    <label>Points</label>
                    <input type="number" 
                        name="points" max="-1"
                        required
                        value={this.state.points}
                        onChange={this.handleChange} />
                    <br/>
                    <button type="submit" >Save Penalty</button>
                </form>

                <button onClick={this.routeBack} >Back</button>

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(EditPenalty));