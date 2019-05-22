import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectMissions extends Component {

    state = {}

    componentDidMount () {
        this.props.dispatch({ type: 'GET_ALL_MISSIONS' });
        
    }

    // componentWillUpdate () {

    // }

    // selectAllMissions () {
    //     console.log(`this is selectAllMissions`);
    // }

    // setSelectedMissions () {
    //     this.props.dispatch({ type: 'SET_SELECTED_MISSIONS', payload: this.state })
    // }

    // updateMissions (id) {
    //     this.setState({
    //         ...this.state,
    //         mission : {
    //             missionId: id,
    //             checked: !check
    //         }
    //     })
    // }

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
                <input type='checkbox' value={ mission } onClick={ this.updateMissions( mission.id )} checked=this.state.checked/>
                </div>
            )} */}
                </div>
                <button onClick={ this.selectAllMissions }>Select all Missions</button>
                <button onClick={ this.setSelectedMissions }>Select Run Team</button>
            </form>

        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(SelectMissions);