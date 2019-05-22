import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectMissions extends Component {

    state = {
        selectedMissions: this.props.reduxState.missions
    }
    
    selectAllMissions () {
        console.log(`this is selectAllMissions`);
        let newSelection = [...this.props.reduxState.missions];
        for( mission of newSelection ){
            mission.selected = true;
        }
        this.setState({
            ...this.state,
            selectedMissions: newSelection
        })

    }

    setSelectedMissions = () => {
        this.props.dispatch({ type: 'SET_SELECTED_MISSIONS', payload: this.state })
    }

    updateMission (i) {
        console.log('i is', i)
        console.log('current state', this.state.selectedMissions)
        
        let newSelection = [...this.props.reduxState.missions];
        console.log('newSelection[i]', newSelection[i])
        newSelection[i].selected = !newSelection[i].selected;
        this.setState({
            ...this.state,
            selectedMissions: newSelection
        })
    }

    render() {

        let missionList;
        if (this.props.reduxState.missions){
            missionList = this.props.reduxState.missions.map( (mission, i) =>
            <div>
                <label>{i + 1}. {mission.name}</label>
                <input type='checkbox' checked={mission.selected === true} value={mission.selected} onChange={ () => {this.updateMission(i)} } />
            </div>
        )} else {
            missionList =  null;
        }
        return (
            <form>
                <input type='text' placeholder='Run Name' />
                {JSON.stringify(this.state.selectedMissions)}
                <h2>Select Missions</h2>
                <div className='mission-selection'>
                    {missionList}
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

export default connect( mapReduxStateToProps )( SelectMissions );