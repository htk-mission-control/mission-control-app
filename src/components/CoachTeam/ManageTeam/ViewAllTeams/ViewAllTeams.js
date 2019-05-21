import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './ViewAllTeams.css';

class ViewAllTeams extends Component {

    state = {
        permission: false,
    }

    routeToAddTeam = () => {
        this.props.history.push('/coach/create-team');
    }

    routeToSelectMissions = () => {
        this.props.history.push('/practice-run');
    }

    routeToTeamMembers = () => {
        let team_id = 1; // this needs to get team_id!
        this.props.history.push(`/coach/${team_id}`);
    }

    routeToRunHistory = () => {
        this.props.history.push('/history');
    }

    changePermission = () => {
        this.setState({
            permission: !this.state.permission
        })
        console.log( 'last state', this.state.permission );
        // Need to send PUT to DB
    }

    render(){
        return(
            <div>
                <h2>Teams</h2>

                <button className="route-link" onClick={this.routeToAddTeam} >New Team</button>

                <div className="team-card" >
                    <h3>Team Name</h3>
                    <button className="route-link" onClick={this.routeToSelectMissions} >Create New Run</button>
                    <br/>
                    <button className="route-link" onClick={this.routeToTeamMembers} >View Team Members</button>
                    <br/>
                    <button className="route-link" onClick={this.routeToRunHistory} >View Run History</button>
                    <br/>
                    <div>
                        <p>Allow your team to create runs</p>
                        <label className="switch">
                            <input type="checkbox" onClick={this.changePermission} checked={this.state.permission === true} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(ViewAllTeams));