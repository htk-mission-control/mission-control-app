import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaUndo } from 'react-icons/fa';

class RunScoring extends Component {

    state = {
        toggle: true,
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
        let missionArr = this.state.goals;
        let eitherOrArr = this.state.eitherOr;
        let newMissionArr = [];
        let newEitherOrArr = [];
        let test = [];
        
        let newArr = [];

        //Find a way to stop loop other than #100
        for (let count = 0; count < 100; count++) {
            test = missionArr.filter(x => x.mission_id == count)

            if (test.length !== 0) {
                newMissionArr.push(test)
            }
        }
        console.log('newMissionsArr', newMissionArr);
        
        for (let count = 0; count < 100; count++) {
            test = eitherOrArr.filter(x => x.either_or_goal_id === count)

            if (test.length !== 0) {
                newEitherOrArr.push(test)
            }
        }
        console.log('newEitherOrArr', newEitherOrArr);
        return (
            newMissionArr.map((mission, i) => {
                return (
                    <div key={i}>
                        <h3>Mission {i + 1}: {mission[0].mission_name}</h3>
                        {mission.map((goal, y) => {
                            return (
                                <div>
                                    {this.renderGoals(goal, i, newEitherOrArr)}
                                </div>
                            )
                        })}
                    </div>
                )
            })
        )
    }

    penaltyList = () => {
        return(
            this.state.penalties.map((penalty, i) => {
                return (
                    <div key={penalty.id}>
                        {penalty.count} <button onClick={() => { this.penaltyOnClick(i) }} disabled={penalty.disabled}>{penalty.name}</button>
                        <button onClick={() => { this.undoOnClick(i) }}><FaUndo /></button>
                    </div>
                )  
            })
        )
    }


    renderGoals = (goal, y, eitherOr) => {
        console.log(`y in renderGoals`, y, goal);
        
        if (goal.goal_type_id === 1) {
            return <button onClick={ () => { this.yesNoOnClick(y) }}><div>{goal.goal_name}</div> <div>{goal.goal_points} pts</div></button>
        }
        else if (goal.goal_type_id === 2) {
            
            return (
                eitherOr.map((options, z) => {
                    return (
                        options.map( (option, i) => {
                            if (goal.goal_id == option.either_or_goal_id) {
                                return (
                                    <div>
                                        <button onClick={ () => { this.eitherOrOnClick(i) }}><div>{option.either_or_name}</div> <div>{option.either_or_points} pts</div></button>
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
                    <button onClick={() => { this.howManyOnClick(y) }}><div>{goal.goal_name}</div><div>{goal.goal_points} pts each</div></button>
                </div>
            )
            }
    }

    renderOrText = (options, i) => {
        console.log('options length', options.length);
        if (i < (options.length - 1)) {
            return <h5>OR</h5>
        }
        return null;
    }

    penaltyOnClick = (i) => {
        let updatedPenalties = [...this.state.penalties];
        console.log(`penalty.count is`, updatedPenalties[i].count);
        console.log(`penalty.max is`, updatedPenalties[i].max);
        if ((updatedPenalties[i].count < updatedPenalties[i].max) && (updatedPenalties[i].disabled === false)){
            updatedPenalties[i].count = updatedPenalties[i].count + 1
        }
        if (updatedPenalties[i].count === updatedPenalties[i].max ) {
            updatedPenalties[i].disabled = true;
        }
        this.setState({
            penalties: updatedPenalties
        })
        console.log(`penalty.count end is`, updatedPenalties[i].count);
        console.log(`penalty.disabled end is`, updatedPenalties[i].disabled);
    }

    undoOnClick = ( i ) => {
        let updatedPenalties = [...this.state.penalties];
        updatedPenalties[i].disabled = false; 
        if (updatedPenalties[i].count <= (updatedPenalties[i].max + 1) && updatedPenalties[i].count > 0) {
            updatedPenalties[i].count = updatedPenalties[i].count - 1
            console.log(`penalty.count is undooooo`, updatedPenalties[i].count);
        }
        this.setState({
            penalties: updatedPenalties
        })
    }

    // function to add points for how many goal type on click and disable button when max is reached
    howManyOnClick = ( i ) => {
        let updatedGoals = [...this.state.goals];
        console.log(`updatedGoals`, updatedGoals);
        console.log(`how many i is`, i);
        updatedGoals[i].count = updatedGoals[i].count + 1;
        updatedGoals[i].isCompleted = true;
        if (updatedGoals[i].count <= updatedGoals[i].how_many_max ){
            this.setState({
                score: (this.state.score + updatedGoals[i].goal_points),
            })
        }
        else {
            updatedGoals[i].disabled = true;
        }
    // console.log(`how many goal`, goal);
    // console.log(`this.state.score`, this.state.score);

    }

    // function to add points for yes/no goal type on click and disable button after click
    yesNoOnClick = ( goal ) => {
        if (goal.disabled === false) {
            this.setState({
                score: (this.state.score + goal.goal_points),
            })
        }
        goal.isCompleted = true;
        goal.disabled = true;
        // console.log(`yes/no goal`, goal);
        // console.log(`this.state.score`, this.state.score);
    }

    // function to add points for either/or goal type on click and disable all options after click
    eitherOrOnClick = ( goal ) => {
        if( goal.disabled === false ){
            this.setState({
                score: (this.state.score + goal.either_or_points),
            })
        }
        for ( let item of this.state.eitherOr) {
            item.disabled = true;
        }
        for( let mission of this.state.goals ) {
            if (mission.goal_id === goal.either_or_goal_id){
                mission.isCompleted = true;
                // console.log(`either or goal`, mission);
            }
        }

        // console.log(`this.state.score`, this.state.score);
    }

    calculateScore = () => {
        let score = this.state.score;
        for ( let penalty of this.state.penalties) {
            score = score - (penalty.count * penalty.points)
        }
        return score;
    }

    handleSubmit = () => {
        console.log(`final state`, this.state);
        this.props.dispatch({ type: 'UPDATE_RUN_DETAILS', payload: this.state });
    }

    render() {
        
        return (
            
            <div>
                <h2>{this.props.reduxState.runDetails.name}</h2>
                <p>Score: {this.calculateScore()}</p>
                {this.penaltyList()}
                {this.missionList()}
                <button onClick={this.handleSubmit}>End Run</button>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(RunScoring);