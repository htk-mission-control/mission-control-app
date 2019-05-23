import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';

class ViewProject extends Component {

    state = {
        projectId: 0,
        projectDetails: {},
        projectPenalties: [],
    }

    componentDidMount() {
        const searchObject = qs.parse(this.props.location.search);
        console.log('searchObject', searchObject);
        this.setState({
            projectId: searchObject.projectId,
        })
        this.props.dispatch({ type: 'GET_PROJECT_DETAILS', payload: searchObject });
        this.props.dispatch({ type: 'GET_PENALTIES', payload: searchObject });
    }

    componentDidUpdate(prevProps) {
        if (this.props.reduxState.projectDetails !== prevProps.reduxState.projectDetails) {
            this.setState({
                projectDetails: this.props.reduxState.projectDetails
            })
        };
        if (this.props.reduxState.penalties !== prevProps.reduxState.penalties) {
            this.setState({
                projectPenalties: this.props.reduxState.penalties
            })
        };
    }

    render() {
        return (
            <div>
                {/* {JSON.stringify(this.props.reduxState.projectDetails)} */}
                {JSON.stringify(this.state.projectPenalties)}
                {/* {JSON.stringify(this.state.projectDetails)} */}
                <h1>{this.state.projectDetails.name}</h1>
                <h2>The Project</h2>
                <p>{this.state.projectDetails.description}</p>
                <div>
                    <h2>Penalties</h2>
                    <button>Add Penalty</button>
                    <hr/>
                    {this.state.projectPenalties.map(penalty => {
                        return (
                            <div key={penalty.id}>
                                <h3>{penalty.name}</h3>
                                <p>Description: {penalty.description}</p>
                                <p>Max Penalties: {penalty.max}</p>
                                <p>Points: -{penalty.points}</p>
                                <button>EDIT</button>
                                <button>DELETE</button>
                            </div>
                        )
                    })}
                    <hr/>
                </div>
                <div>
                    <h2>Missions</h2>
                    <button>Add Mission</button>
                    <hr/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ViewProject);
