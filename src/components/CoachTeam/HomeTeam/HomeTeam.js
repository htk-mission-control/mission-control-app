import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HomeTeam extends Component {
  render () {
    return (
        <div>
          <h2>Welcome { this.props.user.username } !</h2>
          {/* button to route to missions view */}
          <Link to="/missions" ><button>View Missions</button></Link>
          {/* button to route to run history view */}
          <Link to="/history" ><button>View Run History</button></Link>
          {/* button to route to start of new run view */}
          <Link to="/practice-run" ><button>Create New Run</button></Link>
        </div>
		);
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect( mapStateToProps )( HomeTeam );