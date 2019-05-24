import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';

class ViewProject extends Component {

    state = {
        projectId: 0,
        projectDetails: {},
        projectPenalties: [],
        projectMissions: [],
        projectEitherOr: [],
    }

    componentDidMount() {
        const searchObject = qs.parse(this.props.location.search);
        console.log('searchObject', searchObject);
        this.setState({
            projectId: searchObject.projectId,
        })
        this.props.dispatch({ type: 'GET_PROJECT_DETAILS', payload: searchObject });
        this.props.dispatch({ type: 'GET_PENALTIES', payload: searchObject });
        this.props.dispatch({ type: 'GET_MISSIONS', payload: searchObject });
        this.props.dispatch({ type: 'GET_EITHER_OR', payload: searchObject });
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
        if (this.props.reduxState.projectMission !== prevProps.reduxState.projectMission) {
            this.setState({
                projectMissions: this.props.reduxState.projectMission
            })
        };
        if (this.props.reduxState.eitherOr !== prevProps.reduxState.eitherOr) {
            this.setState({
                projectEitherOr: this.props.reduxState.eitherOr
            })
        };
    }

    groundControl = () => {
        let missionArr = this.state.projectMissions;
        let newArr = [];
        let test = [];

        //Find a way to stop loop other than #100
        for (let count = 0; count < 100; count++) {
            test = missionArr.filter(x => x.mission_id == count)

            if (test.length !== 0) {
                console.log('test length', test.length);

                newArr.push(test)
            }

        }
        console.log('newArr', newArr);
        return (
            newArr.map((mission, i) => {
                return (
                    <div key={i}>
                        <h3>Mission {i + 1}: {mission[0].mission_name}</h3>
                        <button>Edit</button>
                        <button value={mission[0].mission_id} onClick={this.handleDeleteMission}>Delete</button>
                        <h4>{mission[0].description}</h4>
                        {mission.map(mission => {
                            return (
                                <div>
                                    {this.renderGoals(mission)}
                                </div>
                            )
                        })}
                    </div>
                )
            })
        )
    }

    renderGoals = (mission) => {
        if (mission.goal_type_id === 1) {
            return <h5>Goal: {mission.name} = {mission.points} points</h5>
        }
        else if (mission.goal_type_id === 2) {
            return (
                this.state.projectEitherOr.map( either => {
                    console.log('mission.goal_id', mission.goal_id);
                    console.log('either.goal_id', either.goal_id);
                    
                    if (mission.goal_id == either.goal_id) {
                        return (
                            <div>
                                <h5>Goal: {either.name} = {either.points} points</h5>
                                {this.renderOrText(either)}
                            </div>
                        )
                    }
                })
            )
        }
        else if (mission.goal_type_id === 3) {

            return (
                <div>
                    <h5>Goal: {mission.name} = {mission.points} points each</h5>
                    <h6></h6>
                </div>
            )
        }
    }
//-----TODO-----
//finish OR render to DOM
    renderOrText = (either) => {
        console.log('either length', either); 
                return <h5>OR</h5>
    }

    handleDeletePenalty = (event) => {
        let info = {
            projectId: this.state.projectId,
            penaltyId: event.target.value,
        }
        // console.log('event.target.value', info);
        this.props.dispatch({type: 'DELETE_PENALTY', payload: info})
    }

    handleDeleteMission = (event) => {
        let info = {
            projectId: this.state.projectId,
            missionId: event.target.value
        }
        console.log('event.target.value', info);
        this.props.dispatch({type: 'DELETE_MISSION', payload: info});
    }

    render() {
        return (
            <div>
                {/* {JSON.stringify(this.props.location)} */}
                {/* {JSON.stringify(this.state.projectPenalties)} */}
                {/* {JSON.stringify(this.state.projectDetails)} */}
                {/* {JSON.stringify(this.state.projectEitherOr)}
                <h1></h1> */}
                {JSON.stringify(this.state.projectMissions)}
                <h1>{this.state.projectDetails.name}</h1>
                <h2>The Project</h2>
                <p>{this.state.projectDetails.description}</p>
                <div>
                    <h2>Penalties</h2>
                    <button>Add Penalty</button>
                    <hr />
                    {this.state.projectPenalties.map(penalty => {
                        return (
                            <div key={penalty.id}>
                                <h3>{penalty.name}</h3>
                                <p>Description: {penalty.description}</p>
                                <p>Max Penalties: {penalty.max}</p>
                                <p>Points: -{penalty.points}</p>
                                <button>EDIT</button>
                                <button value={penalty.id} onClick={this.handleDeletePenalty}>DELETE</button>
                            </div>
                        )
                    })}
                    <hr />
                </div>
                <div>
                    <h2>Missions</h2>
                    <button>Add Mission</button>
                    <hr />
                    {this.groundControl()}
                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ViewProject);
