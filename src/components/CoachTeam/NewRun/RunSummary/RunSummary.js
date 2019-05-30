import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';


class RunSummary extends Component {

    state = {
        count: 1,
        notes: '',
        runId: this.props.reduxState.runHistoryDetails.id,
    }

    componentDidMount(){
        const values = queryString.parse(this.props.location.search);
        console.log( `query runId:`, values.runId);
        this.props.dispatch( {type: 'GET_RUN_DETAILS', payload: values.runId} );
    }

    componentDidUpdate(prevProps){
        if( this.props.reduxState.runHistoryDetails !== prevProps.reduxState.runHistoryDetails ){
            this.setState({ ...this.state, runId: this.props.reduxState.runHistoryDetails.id });
            console.log( `Count:`, this.state.count );
            
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            notes: event.target.value,
        })
    }

    handleSave = () => {
        console.log( `State:`, this.state );
        console.log( `runId should be:`, this.props.reduxState.runHistoryDetails.id );
        
        
        this.props.dispatch( {type: `UPDATE_RUN_NOTES`, payload: this.state} );
        if(this.props.reduxState.user.security_clearance === 2 ){
            this.props.history.push( `/coach/home` );
        } else {
            this.props.history.push( `/team/home` );
        }
        this.props.dispatch( {type: `RESET_RUN_DETAILS`} );
    }

    render(){
        const runDetails = this.props.reduxState.runHistoryDetails;
        console.log( `RunDetails:`, runDetails );
        

        return(
            <div>
                <h2>Summary: {runDetails.name}</h2>

                <div>
                    <h3>Final Score</h3>
                    <h1>{runDetails.score}</h1>
                    {/* <h5>Possible Points: N/A</h5> */}
                    <p><b>Driver:</b> {runDetails.driver}</p>
                    <p><b>Assistant:</b> {runDetails.assistant}</p>
                    <p><b>Scorekeeper:</b> {runDetails.score_keeper}</p>
                </div>

                <div>
                    <h4>Completed Goals: {runDetails.count}</h4>
                    <p>Do we want to list which goals they completed?</p>
                    <br/>
                    <h4>Penalties: {runDetails.penalties}</h4>
                </div>

                <div>
                    <label>Notes:</label>
                    <input type="text" value={this.state.notes} onChange={this.handleChange} />
                </div>

                <div>
                    <button onClick={this.handleSave} >Save</button>
                </div>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(RunSummary);