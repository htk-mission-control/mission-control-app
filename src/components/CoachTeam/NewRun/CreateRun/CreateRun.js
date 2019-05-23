import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectMissions from '../SelectMissions/SelectMissions';
import SelectRunTeam from '../SelectRunTeam/SelectRunTeam';

class CreateRun extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ALL_MISSIONS' })
    }

    render () {
        return (
            <div>
                <SelectMissions />
                <SelectRunTeam />
            </div>
        )
    }
}


export default connect()( CreateRun );