import React, { Component } from 'react';
import { connect } from 'react-redux';

class RunScoring extends Component {

    componentDidMount = () => {
        // get selectedMission details
        this.props.dispatch({ type: 'GET_SELECTED_MISSIONS' });
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

export default connect(mapReduxStateToProps)(RunScoring);