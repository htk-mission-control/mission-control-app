import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import qs from 'query-string';

class AddPenalty extends Component {

    state = {
        project_id: 0,
        name: '',
        description: '',
        max: 1,
        points: -1
    }

    componentDidMount() {
        const searchObject = qs.parse(this.props.location.search);
        console.log('searchObject', searchObject);
        this.setState({
            project_id: searchObject.projectId,
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
        // console.log( `new state:`, this.state );
    }

    routeBack = () => {
        this.props.history.push( `/admin/projects?projectId=${this.state.project_id}` );
    }

    savePenalty = (event) => {
        this.props.dispatch( {type: 'ADD_PENALTY', payload: this.state} );
        this.routeBack();
        event.preventDefault();
    }

    render() {
        
        return(
            <div>
                <h2>Add Penalty</h2>

                <form onSubmit={this.savePenalty} >
                    <label>Name</label>
                    <input type="text" placeholder="Penalty Name"
                        name="name"
                        required
                        value={this.state.name}
                        onChange={this.handleChange} />
                    <br/>
                    <label>Description</label>
                    <input type="text" placeholder="Penalty Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange} />
                    <br/><br/>
                    
                    <label>Max number of penalties</label>
                    <input type="number" placeholder="1" min="1"
                        name="max"
                        required
                        value={this.state.max}
                        onChange={this.handleChange} />
                    <br/>
                    <label>Points</label>
                    <input type="number" placeholder="-1" max="-1"
                        name="points"
                        required
                        value={this.state.points}
                        onChange={this.handleChange} />
                    <br/>
                    <button type="submit" >Save Penalty</button>
                </form>

                <button onClick={this.routeBack} >Back</button>

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(AddPenalty));