import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectSnap extends Component {

    state = {

    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ALL_PROJECTS' });
    }

    render() {
        return (
            <div>
                <h3>{this.props.project.name}, {this.props.project.year}</h3>
                <h4>The Project</h4>
                <p>{this.props.project.description}</p>
                <button>View Mission</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ProjectSnap);
