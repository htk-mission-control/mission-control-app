import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectMissions extends Component {

    state = {
        newRun: {
            runName: '',
            selectedMissions: this.props.reduxState.missions,
            allSelected: false,
        },
        runTeam: {
            driverId: '',
            assistantId: '',
            scorekeeperId: '',
        },
        stepOne: true,
    }
    
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TEAM_MEMBERS' });
    }

    missionHandleChangeFor = event => {
        this.setState({
            ...this.state.newRun,
            runName: event.target.value,
        })
    }

    runTeamHandleChangeFor = propertyName => event => {
        event.preventDefault();
        this.setState({
            runTeam: {
                ...this.state.runTeam,
                [propertyName]: event.target.value,
            }
        })
    }
    
    selectAllMissions ( missions ) {
        console.log(`this is selectAllMissions`);
        console.log(`missions props`, missions);
        let newSelection = [...missions];
        if( this.state.newRun.allSelected === false ){
            console.log(`selectAllMissions false turning true`);
            
            for( let mission of newSelection ){
                mission.selected = true;
            }
        }
        if( this.state.newRun.allSelected === true ){
            console.log(`selectAllMissions true turning false`);
            for( let mission of newSelection ) {
                mission.selected = false;
            }
        }
        this.setState({
            newRun: {
                ...this.state.newRun,
                selectedMissions: newSelection,
                allSelected: !this.state.newRun.allSelected
            }
          
        })

    }

    setSelectedMissions = () => {
        this.props.dispatch({ type: 'SET_SELECTED_MISSIONS', payload: this.state.newRun })
    }

    updateMission (i) {
        console.log('i is', i)
        console.log('current state', this.state.newRun.selectedMissions)
        
        let newSelection = [...this.props.reduxState.missions];
        console.log('newSelection[i]', newSelection[i])
        newSelection[i].selected = !newSelection[i].selected;
        this.setState({
            newRun: {
                ...this.state.newRun,
                selectedMissions: newSelection
            }
        })
    }

    changeView() {
        this.setState({
            stepOne: !this.state.stepOne,
        })

    }

    handleSubmit = event => {
        event.preventDefault();
        // this.props.dispatch({ type: 'SAVE_RUN_DETAILS', payload: this.state.runTeam })
        console.log(`current runTeam state`, this.state.runTeam);
        console.log(`current run state`, this.state.newRun);
    }

    selectedMissionsView = () => {
        let missionList;
        if (this.props.reduxState.missions) {
            missionList = this.props.reduxState.missions.map((mission, i) =>
                <div>
                    <label>{i + 1}. {mission.name}</label>
                    <input type='checkbox' checked={mission.selected === true} value={mission.selected} onChange={() => { this.updateMission(i) }} />
                </div>
            )
        } else {
            missionList = null;
        }
        return(
            <div>
                <form>
                    <input type='text' placeholder='Run Name' value={this.state.newRun.runName} required onChange={this.missionHandleChangeFor} />
                    {JSON.stringify(this.state.newRun)}
                    <h2>Select Missions</h2>
                    <div className='mission-selection'>
                        {missionList}
                    </div>

                </form>
                <button onClick={() => { this.selectAllMissions(this.props.reduxState.missions) }}>{ this.state.newRun.allSelected === false ? 'Select All Missions' : 'Deselect All Missions'}</button>
            </div>
        )
    }

    selectedRunTeam = () => {
        return (
            <div>
                {/* {JSON.stringify(this.state)} */}
                <h2>{this.props.reduxState.selectedMissions.runName}</h2>
                <form>
                    <label>Driver:</label>
                    <select value={this.state.runTeam.driverId} onChange={this.runTeamHandleChangeFor('driverId')}>
                        <option value='coach' key='coach'>Coach</option>
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.member_id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Assistant:</label>
                    <select value={this.state.runTeam.assistantId} onChange={this.runTeamHandleChangeFor('assistantId')}>
                        <option value='coach' key='coach'>Coach</option>
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.member_id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Scorekeeper:</label>
                    <select value={this.state.runTeam.scorekeeperId} onChange={this.runTeamHandleChangeFor('scorekeeperId')}>
                        <option value='coach' key='coach'>Coach</option>
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.member_id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <button onClick={this.handleSubmit}>Start</button>
                </form>
            </div>
        )
    }

    runNameAlert = () => {
        alert( 'You need to include a run name!')
    }

    render() {

        return (
            <div>
                { this.state.stepOne === true ? ( this.selectedMissionsView() ) : ( this.selectedRunTeam() ) }
                <button onClick={() => { this.changeView() }}>{ this.state.stepOne === true? 'Select Run Team' : 'Back to Missions' }</button>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default connect( mapReduxStateToProps )( SelectMissions );