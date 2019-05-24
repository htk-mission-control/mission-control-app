import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

class SelectRunDetails extends Component {

    state = {
        // stores selected mission details
        newRun: {
            runName: '',
            selectedMissions: this.props.reduxState.missions,
            allSelected: false,
        },
        // stores details for team roles
        runTeam: {
            driverId: '',
            assistantId: '',
            scorekeeperId: '',
        },
        // used for view toggle
        stepOne: true,
        teamId: 0
    }
    
    componentDidMount() {
        const searchObject = qs.parse(this.props.location.search);
        console.log('searchObject', this.props.location.search.teamId);
        this.setState({
            teamId: searchObject.teamId,
        })
        console.log(`user security clearance`, this.props.reduxState.user.security_clearance);
        
        // gets all the team members for logged in team
        if ( this.props.reduxState.user.security_clearance === 4) {
            this.props.dispatch({ type: 'GET_TEAM_MEMBERS' });
        }
        else if (this.props.reduxState.user.security_clearance === 2) {
            this.props.dispatch({ type: 'GET_TEAM_MEMBERS_WITH_ID', payload: searchObject }); 
        }
    }

    // function to change runName for current run
    missionHandleChangeFor = event => {
        this.setState({
            newRun: {
                ...this.state.newRun,
                runName: event.target.value,
            }
        })
    }

    // function to set current runTeam
    runTeamHandleChangeFor = propertyName => event => {
        event.preventDefault();
        this.setState({
            runTeam: {
                ...this.state.runTeam,
                [propertyName]: event.target.value,
            }
        })
    }
    
    // function to run on button click to select all of the missions for the current project, takes in allMissionsReducer state
    selectAllMissions ( missions ) {
        console.log(`this is selectAllMissions`);
        console.log(`missions props`, missions);
        let newSelection = [...missions];

        // changes selected state of all individual missions within reducer to true
        if( this.state.newRun.allSelected === false ){
            console.log(`selectAllMissions false turning true`);
            
            for( let mission of newSelection ){
                mission.selected = true;
            }
        }

        // changes selected state of all individual missions within reducer to false
        if( this.state.newRun.allSelected === true ){
            console.log(`selectAllMissions true turning false`);
            for( let mission of newSelection ) {
                mission.selected = false;
            }
        }

        // sets selectedMissions to updated newSelection array, toggles allSelected between true and false
        this.setState({
            newRun: {
                ...this.state.newRun,
                selectedMissions: newSelection,
                allSelected: !this.state.newRun.allSelected
            }
          
        })

    }

    // function to set selected missions with state
    setSelectedMissions = () => {
        // sets selectedMissionsReducer with current state.newRun
        this.props.dispatch({ type: 'SET_SELECTED_MISSIONS', payload: this.state.newRun })
    }

    // function to select mission at index i to selected, updates newSelection array with new selected value
    updateMission (i) {
        console.log('i is', i)
        console.log('current state', this.state.newRun.selectedMissions)
        
        let newSelection = [...this.props.reduxState.missions];
        console.log('newSelection[i]', newSelection[i])
        newSelection[i].selected = !newSelection[i].selected;

        // sets selectedMissions to updated newSelection array
        this.setState({
            newRun: {
                ...this.state.newRun,
                selectedMissions: newSelection
            }
        })
    }

    changeView() {

        if ( this.state.newRun.runName === '' ) { 
            alert('You need to include a run name!');
        }
        else { 
            this.setState({
                stepOne: !this.state.stepOne,
            })
        }

    }

    handleSubmit = event => {
        event.preventDefault();
        // this.props.dispatch({ type: 'SAVE_RUN_DETAILS', payload: this.state.runTeam })
        console.log(`current runTeam state`, this.state.runTeam);
        console.log(`current run state`, this.state.newRun);
        // this.props.history.push('/practice-run/runScoring');
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
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.member_id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Assistant:</label>
                    <select value={this.state.runTeam.assistantId} onChange={this.runTeamHandleChangeFor('assistantId')}>
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.member_id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Scorekeeper:</label>
                    <select value={this.state.runTeam.scorekeeperId} onChange={this.runTeamHandleChangeFor('scorekeeperId')}>
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.member_id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <button onClick={this.handleSubmit}>Start</button>
                </form>
            </div>
        )
    }

    render() {

        return (
            <div>
                { this.state.stepOne === true ? ( this.selectedMissionsView() ) : ( this.selectedRunTeam() ) }
                {JSON.stringify(this.props.location.search)}
                <button onClick={() => { this.changeView() }}>{ this.state.stepOne === true? 'Select Run Team' : 'Back to Missions' }</button>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default withRouter( connect( mapReduxStateToProps )(SelectRunDetails ) );