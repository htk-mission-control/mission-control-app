import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';

import ProtectedAdmin from '../ProtectedRoutes/ProtectedAdmin/ProtectedAdmin';
import ProtectedCoach from '../ProtectedRoutes/ProtectedCoach/ProtectedCoach';
import ProtectedTeams from '../ProtectedRoutes/ProtectedTeams/ProtectedTeams';
import ProtectedTeamWithAccess from '../ProtectedRoutes/ProtectedTeamWithAccess/ProtectedTeamWithAccess';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import HomeAdmin from '../Admin/HomeAdmin/HomeAdmin';
import CreateRun from '../CoachTeam/NewRun/CreateRun/CreateRun';
import HomeTeam from '../CoachTeam/HomeTeam/HomeTeam';
import ViewProject from '../Admin/ViewProject/ViewProject';
import RunHistory from '../CoachTeam/RunHistory/RunHistory';
import HomeCoach from '../CoachTeam/HomeCoach/HomeCoach';
import ViewAllTeams from '../CoachTeam/ManageTeam/ViewAllTeams/ViewAllTeams';
import StartRun from '../CoachTeam/NewRun/StartRun/StartRun';
import RunSummary from '../CoachTeam/NewRun/RunSummary/RunSummary';
import ProjectOverview from '../CoachTeam/ProjectOverview/ProjectOverview';
import AddTeam from '../CoachTeam/ManageTeam/AddTeam/AddTeam';
import TeamMembers from '../CoachTeam/ManageTeam/TeamMembers/TeamMembers';


import './App.css';
import ProtectedCoachAndTeams from '../ProtectedRoutes/ProtectedCoachAndTeams/ProtectedCoachAndTeams';
import AddPenalty from '../Admin/ViewProject/Penalty/AddPenalty';
import EditPenalty from '../Admin/ViewProject/Penalty/EditPenalty';
import AddMission from '../Admin/ViewProject/Mission/AddMission';
import EditMission from '../Admin/ViewProject/Mission/EditMission';
import RunDetails from '../CoachTeam/RunDetails/RunDetails';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  userHome = () => {
    if(this.props.reduxState.user.security_clearance === 1){
      return <ProtectedAdmin
          exact
          path="/home"
          component={HomeAdmin}
        />;
    } else if(this.props.reduxState.user.security_clearance === 2){
      return <ProtectedCoach
          exact
          path="/home"
          component={HomeCoach}
        />;
    } else if(this.props.reduxState.user.security_clearance === 3 || this.props.reduxState.user.security_clearance === 4){
      return <ProtectedTeams
          exact
          path="/home"
          component={HomeTeam}
        />;
    } else {
      return <ProtectedAdmin 
        exact path="/home"
        component={HomeAdmin}
      />;
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <ProtectedAdmin
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            
            {this.userHome()}
            {/* <ProtectedAdmin
              exact
              path="/home"
              component={UserPage}
            />
            <ProtectedAdmin
              exact
              path="/admin/home"
              component={HomeAdmin}
            />
            <ProtectedCoach
              exact
              path="/coach/home"
              component={HomeCoach}
            />
            <ProtectedTeams
              exact
              path="/team/home"
              component={HomeTeam}
            /> */}


            <ProtectedTeamWithAccess
              exact 
              path="/practice-run"
              component={CreateRun}
            />
            <ProtectedCoachAndTeams
              exact
              path="/practice-run/run-scoring"
              component={StartRun}
            />
            <ProtectedCoachAndTeams
              exact
              path="/practice-run/run-summary"
              component={RunSummary}
            />
            <ProtectedAdmin
              exact
              path="/admin/projects"
              component={ViewProject}
            />
            <ProtectedAdmin
              // exact
              path="/admin/projects/add-penalty"
              component={AddPenalty}
            />
            <ProtectedAdmin
              // exact
              path="/admin/projects/edit-penalty"
              component={EditPenalty}
            />
            <ProtectedCoachAndTeams
              exact
              path="/history"
              component={RunHistory}
            />
            <ProtectedCoach
              exact
              path="/coach/teams"
              component={ViewAllTeams}
            />
            <ProtectedCoachAndTeams 
              exact
              path="/missions"
              component={ProjectOverview}
            />
            <ProtectedAdmin
              // exact
              path="/admin/projects/add-mission"
              component={AddMission}
            />
            <ProtectedCoach
              // exact
              path="/coach/create-team"
              component={AddTeam}
              />
            <ProtectedCoach
              path="/coach"
              component={TeamMembers}
              />
            <ProtectedAdmin
              // exact
              path="/admin/projects/edit-mission"
              component={EditMission}
            />
            <ProtectedCoachAndTeams 
              exact
              path="/history/run"
              component={RunDetails}
            />
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(App);
