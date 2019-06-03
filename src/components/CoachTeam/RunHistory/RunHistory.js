import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import qs from 'query-string';




// TODO: Need to get team_id as a coach for GET_RUNS_AS_COACH dispatch.
//        currently hard coaded

class RunHistory extends Component {

  componentDidMount() {

    const searchObject = qs.parse(this.props.location.search);
    console.log('searchObject: ', searchObject);
    console.log('searchObject: ', this.props);

    // 1. if the user is a coach
    // 2. if the user is a team or a team with access
    if ( this.props.user.security_clearance === 2 ) {
      this.props.dispatch({ type: 'GET_RUNS_AS_COACH', payload: searchObject });
    } else if ( this.props.user.security_clearance === 3 || this.props.user.security_clearance === 4 ) {
      this.props.dispatch({ type: 'GET_RUNS_AS_TEAM' });
    }
  }

  renderRuns = () => {
    // render all runs returned from database
    // run id, run name, goals completed count, run score
    return (
      <div>
        { 
          this.props.allRuns.map( run =>
            <Link key={run.id} to={`/history/run?runId=${run.id}`}>
              <div>
                <div>{ run.name } | { run.count } | { run.score + run.penalties }</div>
              </div>
            </Link>
          )
        }
      </div>
    )
  }

  render () {
    if (this.props.user.security_clearance === 2 || this.props.user.security_clearance === 4 ){
    return (
      <div>
        <h1>{ this.props.user.username }</h1>
        <h2>Practice Runs</h2>
        <hr></hr>
        <h3>Run Name | Goals Completed | Score</h3>
        { this.renderRuns() }
        <button>Show More</button>
        <Link to="/practice-run" ><button>Create New Run</button></Link>
      </div>
    )
  } else return(
        <div>
          <h1>{ this.props.user.username }</h1>
          <h2>Practice Runs</h2>
          <hr></hr>
          <h3>Run Name | Goals Completed | Score</h3>
          { this.renderRuns() }
          <button>Show More</button>
        </div>
      )
    }
  }


const mapStateToProps = ({ teamId, allRuns, user }) => ({ teamId, allRuns, user });

export default connect(mapStateToProps)(withRouter(RunHistory));
