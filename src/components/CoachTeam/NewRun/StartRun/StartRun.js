import React, { Component } from 'react';
import { connect } from 'react-redux';
import RunScoring from '../RunScoring/RunScoring';

class StartRun extends Component {

    state = {}

    componentDidMount = () => {
        // get selectedMission details
        this.props.dispatch({ type: 'GET_SELECTED_PENALTIES' });
    }

    // componentDidUpdate = ( prevProps ) => {
    //     if (this.props.reduxState.runDetails !== prevProps.reduxState.runDetails) {
    //         console.log(`StartRun reduxState.runDetails prevProps`, prevProps.reduxState.runDetails);
    //         console.log(`StartRun reduxState.runDetails`, this.props.reduxState.runDetails);
    //         this.setState({
    //             state: this.state
    //         })
    //     }
    // }

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