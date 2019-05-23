import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectRunTeam extends Component {
    state = {
        runTeam: {
            driverId: '',
            assistantId: '',
            scorekeeperId: '',
        }
    }

    componentDidMount () {
        this.props.dispatch({ type: 'GET_TEAM_MEMBERS' });
    }

    handleChangeFor = propertyName => event => {
        event.preventDefault();
        this.setState({
            runTeam: {
                ...this.state.runTeam,
                [propertyName]: event.target.value,
            }
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        // this.props.dispatch({ type: 'SAVE_RUN_DETAILS', payload: this.state.runTeam })
        console.log(`current state`, this.state.runTeam);
        
    }

    render(){
        return(
            <div>
                {JSON.stringify(this.state)}
                <form>
                    <label>Driver:</label>
                    <select value={this.state.runTeam.driverId} onChange={this.handleChangeFor('driverId')}>
                        <option value='coach' key='coach'>Coach</option>
                        {this.props.reduxState.teamMembers.map((teamMember, i) => 
                            <option value={teamMember.id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Assistant:</label>
                    <select value={this.state.runTeam.assistantId} onChange={this.handleChangeFor('assistantId')}>
                        <option value='coach' key='coach'>Coach</option>
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Scorekeeper:</label>
                    <select value={this.state.runTeam.scorekeeperId} onChange={this.handleChangeFor('scorekeeperId')}>
                        <option value='coach' key='coach'>Coach</option>
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <button onClick={this.handleSubmit}>Start</button>
                </form>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(SelectRunTeam);