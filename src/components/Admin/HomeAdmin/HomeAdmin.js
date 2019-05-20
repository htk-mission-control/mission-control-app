import React, {Component} from 'react';
import {connect} from 'react-redux';

class HomeAdmin extends Component {
  componentDidMount () {

  }

  render() {
    return (
        <div>
            <h1>Welcome!</h1>
            <p>Click on a project to view details or create a new project below.</p>
            <div>
                <h2>Projects:</h2>
                <button>New Project +</button>
                <div>
                    
                </div>
            </div>
        </div>
  )}
}

export default connect()(HomeAdmin);
