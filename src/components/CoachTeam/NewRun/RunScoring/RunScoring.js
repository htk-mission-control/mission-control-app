import React, { Component } from 'react';
import { connect } from 'react-redux';

class RunScoring extends Component {

    missionList = (runDetails) => {
        console.log(`reduxState details in RunScoring`, runDetails[0]);

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