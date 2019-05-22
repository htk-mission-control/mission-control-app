import React, { Component } from 'react';
import { connect } from 'react-redux';

class ViewProject extends Component {

    state = {
       
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ALL_PROJECTS' });
    }


    render() {
        return (
            <div>
             
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ViewProject);
