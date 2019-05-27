import React, { Component } from 'react';
import { connect } from 'react-redux';

class RunScoring extends Component {

    state = {
        score: 0,
        runId: this.props.reduxState.runDetails.id,
        goals: this.props.reduxState.selectedMissions,
        eitherOr: this.props.reduxState.eitherOr
    }

    missionList = (runInfo) => {
        let missionArr = runInfo;
        console.log(`mission array`, missionArr);
        
        let newArr = [];
        let test = [];

        //Find a way to stop loop other than #100
        for (let count = 0; count < 100; count++) {
            test = missionArr.filter(x => x.mission_id == count)

            if (test.length !== 0) {
                console.log('test length', test.length);

                newArr.push(test)
            }

        }
        console.log('newArr', newArr);
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

    

    renderGoals = (mission) => {
        if (mission.goal_type_id === 1) {
            return <button><div>{mission.goal_name}</div> <div>{mission.goal_points} pts</div></button>
        }
        else if (mission.goal_type_id === 2) {
            // console.log(`this.state.eitherOr`, this.props.reduxState.eitherOr);
            
            return (
                this.state.eitherOr.map((either, i) => {
                    console.log('mission.goal_id', mission.goal_id);
                    console.log('either.goal_id', either.goal_id);

                    if (mission.goal_id == either.id) {
                        return (
                            <div>
                                <button><div>{either.either_or_name}</div> <div>{either.either_or_points} pts</div></button>
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
                    <button><div>{mission.goal_name}</div><div>{mission.goal_points} pts each</div></button>
                </div>
            )
        }
    }

    renderOrText = (i) => {
        console.log('either length', this.state.eitherOr.length);
        if (i< this.state.eitherOr) {
            return <h5>OR</h5>
        }
        else {
            return null
        }
    }

    // // function to add points for how many goal type on click and disable button when max is reached
    // howManyOnClick = ( goal ) => {
    //     goal.count = goal.count + 1
    //     if( goal.count <= goal.how_many_max ){
    //         this.setState({
    //             score: (this.state.score + goal.points),
    //         })
    //     }
    //     else {
    //         goal.disabled = true;
    //     }
    // console.log(`this.state.goals`, this.state.goals);
    // console.log(`this.state.score`, this.state.score);

    // }

    // // function to add points for yes/no goal type on click and disable button after click
    // yesNoOnClick = ( goal ) => {
    //     this.setState({
    //         score: (this.state.score + goal.points),
    //     })
    //     goal.disabled = true;
        // console.log(`this.state.goals`, this.state.goals);
        // console.log(`this.state.score`, this.state.score);
    // }

    // // function to add points for either/or goal type on click and disable all options after click
    // eitherOrOnClick = ( goal ) => {
    //     this.setState({
    //         score: (this.state.score + goal.points),
    //     })
    //     for ( item of this.props.reduxState.eitherOr) {
    //         item.disabled = true;
    //     }
        // console.log(`this.state.goals`, this.state.goals);
        // console.log(`this.state.score`, this.state.score);
    // }

    render() {
        console.log(`reduxState details in RunScoring`, this.props.reduxState.selectedMissions);
        console.log(`local state id in RunScoring`, this.props.reduxState.runDetails.id);
        console.log(`either/or in RunScoring`, this.props.reduxState.eitherOr);
        return (
            
            <div>
                <h2>{this.props.reduxState.runDetails.name}</h2>
                {this.missionList(this.props.reduxState.selectedMissions)}
                    
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(RunScoring);