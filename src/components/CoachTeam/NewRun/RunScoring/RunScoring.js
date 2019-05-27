import React, { Component } from 'react';
import { connect } from 'react-redux';

class RunScoring extends Component {

    state = {
        score: 0
    }

    missionList = (runInfo) => {
        let missions = [];
        console.log(`reduxState details in RunScoring`, runInfo);
        console.log(`local state id in RunScoring`, this.props.reduxState.runDetails.id);
        
    }

    howManyCount = () => {

    }

    // function to add points for how many goal type on click and disable button when max is reached
    // howManyOnClick = ( goal ) => {
    //     if( count <= max ){
    //         this.setState({
    //             score: (this.state.score + goal.points),
    //         })
    //     }
    //     else {
    //         disabled: true
    //     }
    // }

    // // function to add points for yes/no goal type on click and disable button after click
    // yesNoOnClick = ( goal ) => {
    //     this.setState({
    //         score: (this.state.score + goal.points),
    //     })
    // }

    eitherOrOnClick = ( goal ) => {

    }

    render() {
        return (
            
            <div>
                <h2>Run Name</h2>
                {this.missionList(this.props.reduxState.selectedMissions)}
                    
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(RunScoring);