import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectRunTeam extends Component {
    state = {
        driver: '',
        assistant: '',
        scorekeeper: ''
    }
    render(){
        return(
            <div>
                <form>
                    <label>Driver:</label>
                    <select>
                        {this.props.reduxState.allTeams.map((teamMember, i) => 
                            <option value={teamMember.name} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Assistant:</label>
                    <select>
                        {this.props.reduxState.allTeams.map((teamMember, i) =>
                            <option value={teamMember.name} key={i}>{teamMember.name}</option>
                        )}
                    </select>
                    <label>Scorekeeper:</label>
                    <select>
                        {this.props.reduxState.allTeams.map((teamMember, i) =>
                            <option value={teamMember.name} key={i}>{teamMember.name}</option>
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