import React, { Component } from 'react';
import { connect } from 'react-redux';

class RunSummary extends Component {
    render(){
        return(
            <div>
                <h1>RUN SUMMARY</h1>
            </div>  
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(RunSummary);