import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectSnap from './ProjectSnap/ProjectSnap'

class HomeAdmin extends Component {

    state = {

    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ALL_PROJECTS' });
    }

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                {/* {JSON.stringify(this.props.reduxState.projects)} */}
                {JSON.stringify(this.state)}
                <p>Click on a project to view details or create a new project below.</p>
                <div>
                    <h2>Projects:</h2>
                    <button>New Project +</button>
                    <div>
                        {this.props.reduxState.projects.map(project => (
                            <button>
                                {project.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    {this.props.reduxState.projects.map(project => {
                        return(
                            <div key={project.id}>
                                <ProjectSnap project={project}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(HomeAdmin);
