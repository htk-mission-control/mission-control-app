import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// import EitherOr from './EitherOr';
import GoalList from './GoalList';

class EditMission extends Component {

    state = {
        // need to fix alternate form of getting mission_id
        mission_id: this.props.reduxState.projects.mission_id || 34,
        name: this.props.reduxState.missionDetails.name || '',
        description: this.props.reduxState.missionDetails.description || '',
        goals: this.props.reduxState.projects.mission_id || [],
    }

    componentDidMount(){
        this.props.dispatch( {type: 'GET_GOAL_TYPES'} );
        this.props.dispatch( {type: `GET_MISSION_DETAILS`, payload: this.state.mission_id} );
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
        console.log( `new state:`, this.state );
    }

    handleSave = () => {
        let missionDetails = this.props.reduxState.missionDetails;

        let missionUpdate = {
            // need to fix alternate form of getting mission_id
            mission_id: this.state.mission_id || missionDetails.mission_id,
            name: this.state.name || missionDetails.name,
            description: this.state.description || missionDetails.description,
        }

        this.props.dispatch( {type: 'UPDATE_MISSION', payload: missionUpdate} );
        // this.props.history.goBack();
    }

    render() {
        let missionDetails = this.props.reduxState.missionDetails;
        let missionIntro;

        if(missionDetails){
            missionIntro = <div>
                <label>Name</label>
                <input type="text" placeholder="Mission Name"
                    name="name"
                    value={this.state.name || missionDetails.name}
                    onChange={this.handleChange} />
                <br/>
                <label>Description</label>
                <input type="text" placeholder="Mission Description"
                    name="description"
                    value={this.state.description || missionDetails.description}
                    onChange={this.handleChange} />
            </div>
        } else {
            missionIntro = null;
        }
    
        return(
            <div>
                <h2>Edit Mission</h2>

                {missionIntro}
                <br/><br/>

                <GoalList mission_id={this.state.mission_id} />
                <br/><br/>
                <button onClick={this.handleSave} >Save Mission</button>

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(EditMission));