import React, { Component } from 'react';
import { connect } from 'react-redux';

class RunHistory extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'GET_ALL_RUNS' });
  }

  render () {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)( RunHistory );