import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class RunHistory extends Component {

  componentDidMount() {
    // 1. if the user is a coach
    // 2. if the user is a team
    if ( this.props.user.security_clearance === 2 ) {
      let team_id = 3;
      // coach will need team_id in payload | get from redux
      this.props.dispatch({ type: 'GET_RUNS_AS_COACH', payload: team_id });
    } else if ( this.props.user.security_clearance === 3 || this.props.user.security_clearance === 4 ) {
      this.props.dispatch({ type: 'GET_RUNS_AS_TEAM' });
    }
  }

  renderRuns = () => {
    console.log('all runs', this.props.allRuns)
    return (
      <div>
        { 
          this.props.allRuns.map( run =>
            <div key={run.id} >
              <p>{ run.name } | { run.count } | { run.score }</p>
            </div>
          )
        }
      </div>
      
    )
    
  }

  render () {
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
  }
}

const mapStateToProps = ({ allRuns, user }) => ({ allRuns, user });

export default connect(mapStateToProps)( RunHistory );