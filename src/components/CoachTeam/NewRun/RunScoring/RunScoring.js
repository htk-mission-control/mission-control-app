import React, { Component } from 'react';
import { connect } from 'react-redux';

class RunScoring extends Component {

    render() {
        console.log(`reduxState in RunScoring`, this.props.reduxState.selectedMissions);
        return (
            
            <div>
                {/* {this.props.reduxState.selctedMissions.runDetails.map( mission =>{
                    <p>{mission.mission_id}</p>
                })} */}
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(RunScoring);