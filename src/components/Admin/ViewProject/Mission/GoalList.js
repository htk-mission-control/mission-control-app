import React, {Component} from 'react';
import {connect} from 'react-redux';
import EitherOr from './EitherOr';
// import EitherOr from './EitherOr';

class GoalList extends Component {

    state = {
        goals: this.props.reduxState.projects.mission_id || [],
    }

    handleGoal = (i, name) => (event) => {
        let newGoals = [...this.props.reduxState.missionDetails.goals];
        for( let goal of newGoals){
            if( goal.goal_id === i ){
                let index =  newGoals.indexOf( goal );
                console.log( `index:`, index, name );
                newGoals[index][name] = event.target.value;
            }
        }

        this.props.dispatch( {type: 'UPDATE_GOALS', payload: newGoals} );

        // need to update state in order to update the mapping of missionDetails.goals
        this.setState({ ...this.state, count: this.state.count + 1 });
    }

    render() {
        let missionDetails = this.props.reduxState.missionDetails;
        let goalList;

        if( missionDetails.goals ){
            goalList = missionDetails.goals.map( goal => {
                let goalTypeForm;

                if( goal.goal_type_id === 1 ) {
                    goalTypeForm = <div>
                        <label>Name</label>
                        <input type="text" name="name" value={goal.goal_name}
                            onChange={this.handleGoal(goal.goal_id, 'goal_name')} />
                        <label>Points</label>
                        <input type="number" name="points" value={goal.points}
                            onChange={this.handleGoal(goal.goal_id, 'points')} />
                    </div>
                    
                } else if( goal.goal_type_id === 2 ) {
                    goalTypeForm = <EitherOr />;
                } else if( goal.goal_type_id === 3 ) {
                    goalTypeForm = <div>
                        <label>Name</label>
                        <input type="text" name="name" value={goal.goal_name}
                            onChange={this.handleGoal(goal.goal_id, 'name')} />
                        <label>Points</label>
                        <input type="number" name="points" value={goal.points}
                            onChange={this.handleGoal(goal.goal_id, 'points')} />
                        <br/>
                        <label>Min</label>
                        <input type="number" name="min" value={goal.how_many_min || 0}
                            onChange={this.handleGoal(goal.goal_id, 'how_many_min')} />
                        <label>Max</label>
                        <input type="number" name="max" value={goal.how_many_max || 1}
                            onChange={this.handleGoal(goal.goal_id, 'how_many_max')} />
                    </div>;
                }


                return <div key={goal.goal_id}>
                        <h3>Goal   &nbsp;  
                            {/* <i onClick={this.removeGoal(goal.goal_id)} className="fas fa-trash"></i> */}
                        </h3>
    
                        <label>Type </label>
                        <select name="goal_type_id" value={goal.goal_type_id}
                            onChange={this.handleGoal(goal.goal_id, 'goal_type_id')} >
                            <option value="" disabled
                                // selected 
                                >Choose a Type</option>
                            {this.props.reduxState.goalTypes.map( type => 
                                    <option key={type.id} value={type.id}>{type.type}</option>
                                )}
                        </select>
                        
                        {goalTypeForm}
                    </div>
            })
        }
    
        return(
            <div>
                {goalList}
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(GoalList);