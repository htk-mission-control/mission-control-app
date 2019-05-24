import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import EitherOr from './EitherOr';

class AddMission extends Component {

    state = {
        name: '',
        description: '',
        goalCount: 1,
        goals: [
            {
                goal: 1,
                type: '',
            }
        ]
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
        // console.log( `new state:`, this.state );
    }

    addGoal = () => {
        this.setState({
            ...this.state,
            goalCount: this.state.goalCount + 1,
            goals: [
                ...this.state.goals,
                {
                    goal: this.state.goalCount + 1,
                    type: 'Goal Type',
                }
            ]
        })
        console.log( `Last state:`, this.state );
    }

    handleGoal = (i, name) => (event) => {
        // console.log( `State:`, this.state );
        let newGoals = [...this.state.goals];
        newGoals[i][name] = event.target.value;

        this.setState({
            ...this.state,
            goals: newGoals,
        })
    }


    render() {
        let goalList;
        if( this.state.goalCount > 0 ){
            goalList = this.state.goals.map( (goal, i) => {
                
                let goalTypeForm;
                if( goal.type === 'Yes/No' ){
                    goalTypeForm = <div>
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Goal Name"
                            onChange={this.handleGoal(i, 'name')} />
                        <label>Points</label>
                        <input type="number" name="points" placeholder="0"
                            onChange={this.handleGoal(i, 'points')} />
                    </div>

                } else if( goal.type === 'Either/Or' ){
                    
                    goalTypeForm = <EitherOr index={i} goal={goal} />
                    

                } else if( goal.type === 'How Many' ){
                    goalTypeForm = <div>
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Goal Name"
                            onChange={this.handleGoal(i, 'name')} />
                        <label>Points</label>
                        <input type="number" name="points" placeholder="0"
                            onChange={this.handleGoal(i, 'points')} />
                        <br/>
                        <label>Min</label>
                        <input type="number" name="min" placeholder="0"
                            onChange={this.handleGoal(i, 'min')} />
                        <label>Max</label>
                        <input type="number" name="max" placeholder="0"
                            onChange={this.handleGoal(i, 'max')} />
                    </div>

                } else {
                    goalTypeForm = null;
                }

                return <div key={i}>
                    <h3>Goal {goal.goal}</h3>

                    <label>Type</label>
                    <select name="type" value={goal.type}
                        onChange={this.handleGoal(i, 'type')} >
                        <option value="" disabled
                            selected >Choose a Type</option>
                        <option value="Yes/No">Yes/No</option>
                        <option value="Either/Or">Either/Or</option>
                        <option value="How Many">How Many</option>
                    </select>
                    
                    {goalTypeForm}
                </div>
            })
        } else {
            goalList = null;
        }
    
        return(
            <div>
                <h2>Add Mission</h2>

                <label>Name</label>
                <input type="text" placeholder="Mission Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange} />
                <br/>
                <label>Description</label>
                <input type="text" placeholder="Mission Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange} />
                <br/><br/>

                {goalList}
                <br/><br/>

                <button onClick={this.addGoal} >Add a Goal</button>
                <br/>
                <button onClick={this.handleSave} >Save Mission</button>

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(AddMission));