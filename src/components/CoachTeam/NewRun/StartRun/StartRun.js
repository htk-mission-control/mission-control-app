import React, { Component } from 'react';
import { connect } from 'react-redux';
import RunScoring from '../RunScoring/RunScoring';

class StartRun extends Component {

    componentDidMount = () => {
        // get selectedMission details
        this.props.dispatch({ type: 'GET_SELECTED_MISSIONS' });
        this.props.dispatch({ type: 'GET_SELECTED_EITHER_OR' });
    }

    render() {
        return (
            <div>
                <RunScoring />
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(StartRun);