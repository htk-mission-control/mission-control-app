import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HomeAdmin.css'
import savedForm from '../../../modules/autoFillers/adminNewProject';

class HomeAdmin extends Component {

    state = {
        newProject: {
            name: '',
            description: '',
            year: '',
            published: false,
        }
    }

    // quickly init form
    autoFillForm = () => {
        console.log('autofilling');
        console.log('savedForm', savedForm);
        this.setState({
            newProject: {
                ...this.state.newProject, ...savedForm
            }
        });
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ALL_PROJECTS' });
    }

    showProject = (event) => {

        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(event.target.value).style.display = "block";
        event.currentTarget.className += " active";
    }

    handleChange = propertyName => (event) => {
        this.setState({
            newProject: {
                ...this.state.newProject,
                [propertyName]: event.target.value,
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PROJECT', payload: this.state.newProject })
        this.setState({
            newProject: {
                name: '',
                description: '',
                year: '',
                published: false,
            }
        });
        // this.props.history.push(`/admin/projects?projectId=${event.target.value}`)
    }

    handleClickMission = (event) => {
        this.props.history.push(`/admin/projects?projectId=${event.target.value}`)
    }

    render() {
        return (
            <div>
                <h1>Welcome, {this.props.reduxState.user.username}!</h1>
                {/* {JSON.stringify(this.props.reduxState)} */}
                {/* {JSON.stringify(this.state.newProject)} */}
                <p>Click on a project to view details or create a new project below.</p>
                <div>
                    <h2>Projects:</h2>
                    <div className="tab">
                        <button className="tablinks" value="newProject" onClick={this.showProject}>New Project +</button>
                        {this.props.reduxState.projects.map(project => (
                            <div key={project.id}>
                                <button className="tablinks" value={project.id} onClick={this.showProject}>
                                    {project.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {this.props.reduxState.projects.map(project => {
                        return (
                            <div key={project.id} id={project.id} className="tabcontent">
                                <h3>{project.name}, {project.year}</h3>
                                <h4>The Project</h4>
                                <p>{project.description}</p>
                                <button value={project.id} onClick={this.handleClickMission}>View Mission</button>
                            </div>
                        )
                    })}
                    <div id="newProject" className="tabcontent">
                        <form>
                            <h3>New Project</h3>
                            <label>Project Name</label>
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={this.state.newProject.name}
                                onChange={this.handleChange('name')}
                                onClick={ this.autoFillForm }
                            >
                            </input>
                            <br />
                            <label>Project Season</label>
                            <input
                                type="text"
                                placeholder="Project Season"
                                value={this.state.newProject.year}
                                onChange={this.handleChange('year')}
                            >
                            </input>
                            <br />
                            <label>Project Description</label>
                            <textarea
                                type="text"
                                placeholder="Project Description"
                                rows="5"
                                cols="40"
                                value={this.state.newProject.description}
                                onChange={this.handleChange('description')}
                            >
                            </textarea>
                            <br />
                            <button onClick={this.handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(HomeAdmin);
