import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class HomeCoach extends Component {

    // On click, route to ProjectOverview page
    routeToMissions = () => {
        this.props.history.push('/missions');
    }

    // On click, route to ViewAllTeams page
    routeToTeams = () => {
        this.props.history.push('/coach/teams');
    }

    // in return, I made buttons as divs and added class "route-link" 
    // which I'll add to other similar buttons (big buttons that link to other routes)

    // Will test routes when merged with branch containing protected routes

    render(){
        return(
            <div>
                <h2>Welcome, Coach!</h2>

                <button className="route-link" onClick={this.routeToMissions} >View Missions</button>
                <button className="route-link" onClick={this.routeToTeams} >View Your Teams</button>
            </div>
        );
    }
}


export default withRouter(HomeCoach);