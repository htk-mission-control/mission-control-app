import React, {Component} from 'react';
import {connect} from 'react-redux';

class EitherOr extends Component {

    state = {
        optionArray: this.props.reduxState.goalOptions.optionList,
        count: 1,
    }

    componentDidMount() {
        if( this.props.editState === false ){
            this.props.dispatch( {type: 'ADD_STARTER_OPTIONS', payload: this.props.goal} );
        }
        // need to update state in order to update the mapping of goalOptionReducer
        this.setState({ ...this.state, count: this.state.count + 1 });
    }

    addOption = () => {
        this.props.dispatch( {type: 'ADD_OPTION', payload: this.props.goal} );

        // need to update state in order to update the mapping of goalOptionReducer
        this.setState({ ...this.state, count: this.state.count + 1 });
    }

    handleOption = (i, name) => (event) => {
        let newOptions = [...this.props.reduxState.goalOptions.optionList];

        for( let option of newOptions){
            if( option.id === i ){
                let index =  newOptions.indexOf( option );
                console.log( `index:`, index );
                newOptions[index][name] = event.target.value;
                newOptions[index].goal_id = this.props.goal;
            }
        }

        this.props.dispatch( {type: 'SET_GOAL_OPTIONS', payload: newOptions} );
        // need to update state in order to update the mapping of missionDetails.goals
        this.setState({ ...this.state, count: this.state.count + 1 });
    }

    removeOption = (i) => (event) => {
        event.preventDefault();
        let newOptions = [...this.props.reduxState.goalOptions.optionList];

        for( let option of newOptions){
            if( option.id === i ){
                let index =  newOptions.indexOf( option );
                console.log( `index:`, index );
                newOptions.splice(index, 1);
            }
        }

        this.props.dispatch( {type: 'REMOVE_OPTION', payload: newOptions} );
        // need to update state in order to update the mapping of goalOptionReducer
        this.setState({ ...this.state, count: this.state.count + 1 });
    }

    render() {
        let optionList = this.props.reduxState.goalOptions.optionList;
        let optionCount = this.props.reduxState.goalOptions.optionCount;
        let optionMap;
        let optionNum = 0;

        if(optionCount > 1){
            optionMap = optionList.map( option => {
                optionNum += 1;
                if( option.goal_id === this.props.goal ){
                return <div key={option.id} >
                    <label>Option {optionNum} </label>
                    <input type="text" name="option_name" placeholder="Option Name"
                        value={option.option_name}
                        onChange={this.handleOption(option.id, 'option_name')} />
                    <label>Points</label>
                    <input type="number" name="option_points" placeholder="0"
                        value={option.option_points}
                        onChange={this.handleOption(option.id, 'option_points')} />
                    <i onClick={this.removeOption(option.id)} className="fas fa-trash"></i>
                </div>}
            }
        )} else {
            optionMap = null;
        }

        return(
            <div>

                {optionMap}

                <button onClick={this.addOption} >Add Option</button>

            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(EitherOr);