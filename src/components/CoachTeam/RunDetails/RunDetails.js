import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';


class RunDetails extends Component {

    state = {
        count: 1,
    }

    componentDidMount(){
        const values = queryString.parse(this.props.location.search);
        console.log( `query runId:`, values.runId);
        this.props.dispatch( {type: 'GET_RUN_DETAILS', payload: values.runId} );
    }

    componentDidUpdate(prevProps){
        if( this.props.reduxState.runHistoryDetails !== prevProps.reduxState.runHistoryDetails ){
            this.setState({ ...this.state, count: this.state.count + 1 });
            console.log( `Count:`, this.state.count );
            
        }
    }

    routeToTeam = () => {
        if(this.props.reduxState.user.security_clearance === 2 ){
            this.props.history.push( `/coach/home` );
        } else {
            this.props.history.push( `/team/home` );
        }
        this.props.dispatch( {type: `RESET_RUN_DETAILS`} );
    }

    routeToHistory = () => {
        this.props.history.push( `/history` );
        this.props.dispatch( {type: `RESET_RUN_DETAILS`} );
    }

    render(){
        const runDetails = this.props.reduxState.runHistoryDetails;

        return(
            <div>
                <h2>Details: {runDetails.name}</h2>

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
                    {/* TO DO: get notes from table in router's get request */}
                    <p><b>Notes:</b></p>
                    <p>{runDetails.notes}</p>
                </div>

                <div>
                    <button onClick={this.routeToTeam} >Back to Home</button>
                    <button onClick={this.routeToHistory} >Back to Runs</button>
                </div>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(RunDetails);