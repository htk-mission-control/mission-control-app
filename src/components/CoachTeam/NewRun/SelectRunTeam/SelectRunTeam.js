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
        this.setState({
            ...this.state.runTeam,
            [propertyName]: event.target.value,
        })
    }

    render(){
        return(
            <div>
                {JSON.stringify(this.state)}
                <form>
                    <label>Driver:</label>
                    <select value={this.state.driverId} onChange={this.handleChangeFor('driverId')}>
                        <option value='coach' key='coach'>Coach</option>
                        {this.props.reduxState.teamMembers.map((teamMember, i) => 
                            <option value={teamMember.id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Assistant:</label>
                    <select value={this.state.assistantId} onChange={this.handleChangeFor('assistantId')}>
                        <option value='coach' key='coach'>Coach</option>
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Scorekeeper:</label>
                    <select value={this.state.scorekeeperId} onChange={this.handleChangeFor('scorekeeperId')}>
                        <option value='coach' key='coach'>Coach</option>
                        {this.props.reduxState.teamMembers.map((teamMember, i) =>
                            <option value={teamMember.id} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                </form>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(SelectRunTeam);