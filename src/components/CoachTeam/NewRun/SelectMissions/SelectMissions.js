import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectMissions extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_ALL_MISSIONS' })
    }

    selectAllMissions() {
        console.log(`this is selectAllMissions`);
    }

    // number = i + 1;

    render() {
        return (
            <form>
                <input type='text' placeholder='Run Name' />
                <h2>Select Missions</h2>
                <div className='mission-selection'>
                    {/* { this.props.reduxState.allMissionsReducer.map(( mission, i ) => 

                <div>
                <label>{ this.number }{ mission.name }</label>
                <input type='checkbox' value={ mission.name } />
                </div>
            )} */}
                </div>
                <button onClick={this.selectAllMissions}>Select all Missions</button>
                <button onClick={this.setSelectedMissions}>Select Run Team</button>
            </form>

        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(SelectMissions);