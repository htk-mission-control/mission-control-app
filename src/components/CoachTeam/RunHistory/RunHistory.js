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
    // console.log((this.props.runs))
  }

  render () {
    return (
      <div>
        <h1>{ this.props.user.username }</h1>
        <h2>Practice Runs</h2>
        <hr></hr>
        { this.renderRuns() }
        <button>Show More</button>
        <Link to="/practice-run" ><button>Create New Run</button></Link>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)( RunHistory );