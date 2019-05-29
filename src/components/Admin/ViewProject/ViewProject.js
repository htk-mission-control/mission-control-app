import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';

class ViewProject extends Component {

    state = {
        projectId: 0,
        editProject: false,
        projectInfo: {
            projectName: '',
            projectDescription: '',
            year: '',
        },
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
                projectInfo: {
                    projectName: this.props.reduxState.projectDetails.name,
                    projectDescription: this.props.reduxState.projectDetails.description,
                    year: this.props.reduxState.projectDetails.year,
                },
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
        let eitherOrArr = this.state.projectEitherOr;
        let newMissionArr = [];
        let newEitherOrArr = [];
        let test = [];

        //Find a way to stop loop other than #100
        for (let count = 0; count < 100; count++) {
            test = missionArr.filter(x => x.mission_id === count)

            if (test.length !== 0) {
                // console.log('test length', test.length);

                newMissionArr.push(test)
            }

        }
        console.log('newMissionArr', newMissionArr);
        for (let count = 0; count < 100; count++) {
            test = eitherOrArr.filter(x => x.goal_id === count)

            if (test.length !== 0) {
                // console.log('test length', test.length);

                newEitherOrArr.push(test)
            }

        }
        console.log('newEitherOrArr', newEitherOrArr);
        // console.log('eitherOrArr', eitherOrArr);
        return (
            newMissionArr.map((mission, i) => {
                return (
                    <div key={i}>
                        <h3>Mission {i + 1}: {mission[0].mission_name}</h3>
                        <button value={mission[0].mission_id} onClick={this.editMission}>Edit</button>
                        <button value={mission[0].mission_id} onClick={this.handleDeleteMission}>Delete</button>
                        <h4>{mission[0].description}</h4>
                        {mission.map((mission, i) => {
                            return (
                                <div key={i}>
                                    {this.renderGoals(mission, newEitherOrArr)}
                                </div>
                            )
                        })}
                    </div>
                )
            })
        )
    }

    renderGoals = (mission, eitherOr) => {
        if (mission.goal_type_id === 1) {
            return <h5>Goal: {mission.name} = {mission.points} points</h5>
        }
        else if (mission.goal_type_id === 2) {
            return (
                eitherOr.map((eithers) => {
                    console.log('either first loop', eithers);
                    return (
                        eithers.map( (either, i) => {
                            if (mission.goal_id === either.goal_id) {
                                console.log('either second loop', either);

                                return (
                                    <div key={i}>
                                        <h5>Goal: {either.name} = {either.points} points</h5>
                                        {this.renderOrText(eithers, i)}
                                    </div>
                                )
                            }
                        })
                    )
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

    renderOrText = (either, i) => {
        console.log('either length', either.length);
        if (i < (either.length - 1)) {
            return <h5>OR</h5>
        }
        return
    }

    handleDeletePenalty = (event) => {
        let info = {
            projectId: this.state.projectId,
            penaltyId: event.target.value,
        }
        // console.log('event.target.value', info);
        this.props.dispatch({ type: 'DELETE_PENALTY', payload: info })
    }

    handleDeleteMission = (event) => {
        let info = {
            projectId: this.state.projectId,
            missionId: event.target.value
        }
        this.props.dispatch({ type: 'DELETE_MISSION', payload: info });
    }

    addMission = () => {
        this.props.history.push(`projects/add-mission?projectId=${this.state.projectId}`);
    }

    editMission = (event) => {
        this.props.history.push(`projects/edit-mission?missionId=${event.target.value}`)
    }

    addPenalty = () => {
        this.props.history.push(`projects/add-penalty?projectId=${this.state.projectId}`);
    }

    editPenalty = (event) => {
        this.props.history.push(`projects/edit-penalty?penaltyId=${event.target.value}`)
    }

    deleteProject = () => {
        this.props.dispatch({ type: 'DELETE_PROJECT', payload: this.state.projectId })
        this.props.history.push('/admin/home')
    }

    publishProject = () => {
        this.props.dispatch({ type: 'PUBLISH_PROJECT', payload: { projectId: this.state.projectId } })
    }

    editProjectName = () => {
        this.setState({
            editProject: !this.state.editProject,
        });
        let data = {
            projectId: this.state.projectId,
            projectInfo: this.state.projectInfo
        }
        this.props.dispatch({ type: 'UPDATE_PROJECT_NAME', payload: data});

    }

    handleChange = (propertyName) => (event) => {
        this.setState({
            projectInfo: {
                ...this.state.projectInfo,
                [propertyName]: event.target.value,
            }
        });
    }

    render() {
        if(this.state.projectDetails.hidden === true) {
           return <h1>404</h1>
        }
        else {
            return (
                <div>
                    {this.state.editProject === false ?
                        <h1>{this.state.projectDetails.name}: {this.state.projectDetails.year}</h1>
                        :
                        <div>
                            <input onChange={this.handleChange('projectName')} value={this.state.projectInfo.projectName}></input>
                            <input onChange={this.handleChange('year')} value={this.state.projectInfo.year}></input>
                        </div>
                    }
                    <h2>The Project:</h2>
                    {this.state.editProject === false ?
                        <p>{this.state.projectDetails.description}</p>
                        :
                        <input onChange={this.handleChange('projectDescription')} value={this.state.projectInfo.projectDescription}></input>
                    }
                    <button onClick={this.deleteProject}>Delete Project</button>
                    {this.state.editProject === false ?
                        <button onClick={this.editProjectName}>Edit Project Info</button>
                        :
                        <button onClick={this.editProjectName}>Save Project Info</button>
                    }
                    {this.state.projectDetails.published === false ?
                        <button onClick={this.publishProject}>Publish Project</button>
                        :
                        <button onClick={this.publishProject}>Unpublish Project</button>
                    }
                    <div>
                        <h2>Penalties</h2>
                        <button onClick={this.addPenalty}>Add Penalty</button>
                        <hr />
                        {this.state.projectPenalties.map(penalty => {
                            return (
                                <div key={penalty.id}>
                                    <h3>{penalty.name}</h3>
                                    <p>Description: {penalty.description}</p>
                                    <p>Max Penalties: {penalty.max}</p>
                                    <p>Points: {penalty.points}</p>
                                    <button value={penalty.id} onClick={this.editPenalty}>EDIT</button>
                                    <button value={penalty.id} onClick={this.handleDeletePenalty}>DELETE</button>
                                </div>
                            )
                        })}
                        <hr />
                    </div>
                    <div>
                        <h2>Missions</h2>
                        <button onClick={this.addMission}>Add Mission</button>
                        <hr />
                        {this.groundControl()}
                    </div>
    
                </div>
            )
        }
        
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ViewProject);
