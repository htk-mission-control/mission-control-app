import React, { Component } from 'react';
import { connect } from 'react-redux';

class RunScoring extends Component {

    componentDidMount = () => {

        // get run details
        let action = { type: 'GET_ALL_MISSIONS' }
        this.props.dispatch(action);
    }

    render() {
        console.log(this.props.missions);
        return (
            <div>
                <div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ missions }) => ({ missions });

export default connect(mapStateToProps)(RunScoring);