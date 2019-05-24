import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectMissions from '../SelectMissions/SelectMissions';
import SelectRunTeam from '../SelectRunTeam/SelectRunTeam';

class CreateRun extends Component {
    // state = {
    //     stepOne: true,
    // }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ALL_MISSIONS' })
    }

    // changeView () {
    //     this.setState({
    //         stepOne: !this.state.stepOne,
    //     })

    // }

    render () {

        return (
            <div>
                <SelectMissions />
            </div>
        )
    }
}


export default connect()( CreateRun );