import React, { Component } from 'react';
import { connect } from 'react-redux';

//----Material UI----
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class SelectMissions extends Component {

    state = {
        runName: '',
        selectedMissions: this.props.reduxState.missions,
        allSelected: false,
    }

    handleChangeFor = event => {
        this.setState({
            runName: event.target.value,
        })
    }
    
    selectAllMissions ( missions ) {
        console.log(`this is selectAllMissions`);
        console.log(`missions props`, missions);
        let newSelection = [...missions];
        if( this.state.allSelected === false ){
            for( let mission of newSelection ){
                mission.selected = true;
            }
        }
        if( this.state.allSelected === true ){
            for( let mission of newSelection ) {
                mission.selected = false;
            }
        }
        this.setState({
            ...this.state,
            selectedMissions: newSelection,
            allSelected: !this.state.allSelected
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
            <Grid container>
                <form>
                    <TextField type='text' placeholder='Run Name' value={this.state.runName} required onChange={this.handleChangeFor} />
                    {/* {JSON.stringify(this.state)} */}
                    <h2>Select Missions</h2>
                    <div className='mission-selection'>
                        {missionList}
                    </div>
                    <button onClick={this.setSelectedMissions}>Select Run Team</button>
                </form>
                <button onClick={() => { this.selectAllMissions(this.props.reduxState.missions) }}>{this.state.allSelected === false ? 'Select All Missions' : 'Deselect All Missions'}</button>
            </Grid>

        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default connect( mapReduxStateToProps )( SelectMissions );