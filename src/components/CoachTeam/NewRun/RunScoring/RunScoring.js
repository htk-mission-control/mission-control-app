import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaUndo } from 'react-icons/fa';

class RunScoring extends Component {

    state = {
        score: 0,
        runId: 0,
        goals: [],
        eitherOr: [],
        penaltyCount: 0,
        penaltyMax: 0,
    }

    componentDidUpdate(prevProps) {
        if (this.props.reduxState.runDetails !== prevProps.reduxState.runDetails) {
            this.setState({
                runId: this.props.reduxState.runDetails.id,
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

    missionList = (runInfo) => {
        let missionArr = runInfo;
        // console.log(`mission array`, missionArr);
        
        let newArr = [];
        let test = [];

        //Find a way to stop loop other than #100
        for (let count = 0; count < 100; count++) {
            test = missionArr.filter(x => x.mission_id == count)

            if (test.length !== 0) {
                // console.log('test length', test.length);

                newArr.push(test)
            }

        }
        // console.log('newArr', newArr);
        return (
            newArr.map((mission, i) => {
                return (
                    <div key={i}>
                        <h3>Mission {i + 1}: {mission[0].mission_name}</h3>
                        {mission.map(mission => {
                            return (
                                <div>
                                    {this.renderGoals(mission)}
                                </div>
                            )
                        })}
                    </div>
                )
            })
        )
    }

    penaltyList = (penalties) => {
        return (
            penalties.map((penalty, i) => {
                return (
                    <div key={penalty.id}>
                        <button onClick={ () => {this.penaltyOnClick(penalty)}}>{penalty.name}</button>
                        <button onClick={ () => {this.undoOnClick(penalty)}}><FaUndo /></button>
                    </div>
                )  
            })
        )
    }

    renderGoals = (mission) => {
        if (mission.goal_type_id === 1) {
            return <button onClick={ () => { this.yesNoOnClick(mission) }}><div>{mission.goal_name}</div> <div>{mission.goal_points} pts</div></button>
        }
        else if (mission.goal_type_id === 2) {
            // console.log(`this.state.eitherOr`, this.props.reduxState.eitherOr);
            
            return (
                this.state.eitherOr.map((either, i) => {
                    // console.log('mission.goal_id', mission.goal_id);
                    // console.log('either.goal_id', either);

                    if (mission.goal_id == either.either_or_goal_id) {
                        return (
                            <div>
                                <button onClick={ () => { this.eitherOrOnClick(either) }}><div>{either.either_or_name}</div> <div>{either.either_or_points} pts</div></button>
                                {this.renderOrText(i)}
                            </div>
                        )
                    }
                })
            )
        }
        else if (mission.goal_type_id === 3) {

            return (
                <div>
                    <button onClick={() => { this.howManyOnClick(mission) }}><div>{mission.goal_name}</div><div>{mission.goal_points} pts each</div></button>
                </div>
            )
        }
    }

    renderOrText = (i) => {
        // console.log('either length', this.state.eitherOr.length);
        if (i < this.state.eitherOr.length-1) {
            return <h5>OR</h5>
        }
        else {
            return null
        }
    }

    penaltyOnClick = (penalty) => {
        if (penalty.count < penalty.max && this.state.score >= penalty.points && penalty.disabled === false){
            penalty.count = penalty.count + 1
            console.log(`penalty.count is`, penalty.count);

        }
        else if (penalty.count === penalty.max ) {
            penalty.disabled = true;
        }
        if( penalty.disabled === false && this.state.score >= penalty.points){
            this.setState({
                score: (this.state.score - penalty.points),
                penaltyCount: this.state.penaltyCount + 1
            })
            // console.log(`this.state.penaltyCount`, this.state.penaltyCount);
        }
    }

    undoOnClick = ( penalty ) => {
        penalty.disabled = false; 
        if (penalty.count <= (penalty.max + 1) && penalty.count > 0) {
            penalty.count = penalty.count - 1
            console.log(`penalty.count is undooooo`, penalty.count);

            this.setState({
                score: (this.state.score + penalty.points),
                penaltyCount: this.state.penaltyCount - 1
            })
        }
    }

    // function to add points for how many goal type on click and disable button when max is reached
    howManyOnClick = ( goal ) => {
        goal.count = goal.count + 1
        if( goal.count <= goal.how_many_max ){
            this.setState({
                score: (this.state.score + goal.goal_points),
            })
        }
        else {
            goal.disabled = true;
        }
    // console.log(`goal.count`, goal.count);
    // console.log(`this.state.score`, this.state.score);

    }

    // function to add points for yes/no goal type on click and disable button after click
    yesNoOnClick = ( goal ) => {
        if (goal.disabled === false) {
            this.setState({
                score: (this.state.score + goal.goal_points),
            })
        }
        goal.disabled = true;
        // console.log(`this.state.goals`, goal);
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
        // console.log(`this.state.goals`, goal);
        // console.log(`this.state.score`, this.state.score);
    }

    handleSubmit = () => {
        console.log(`final state`, this.state);
        
    }

    render() {
        // console.log(`reduxState details in RunScoring`, this.state.selectedMissions);
        // console.log(`local state id in RunScoring`, this.state.runId);
        // console.log(`either/or in RunScoring`, this.state.eitherOr);
        // console.log(`penalties in RunScoring`, this.props.reduxState.penalties);
        
        return (
            
            <div>
                <h2>{this.props.reduxState.runDetails.name}</h2>
                <p>Score: {this.state.score}</p>
                {/* {JSON.stringify(this.state.goals)} */}
                {this.penaltyList(this.props.reduxState.penalties)}
                {this.missionList(this.state.goals)}
                <button onClick={this.handleSubmit}>End Run</button>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(RunScoring);