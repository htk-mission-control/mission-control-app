import React, {Component} from 'react';
import {connect} from 'react-redux';

class EitherOr extends Component {

    state = {
        optionArray: this.props.reduxState.goalOptions.optionList,
        count: 1,
    }

    addOption = () => {
        this.props.dispatch( {type: 'ADD_OPTION'} );

        // need to update state in order to update the mapping of goalOptionReducer
        this.setState({ ...this.state, count: this.state.count + 1 });
    }

    handleOption = (i, name) => (event) => {
        event.preventDefault();
        let newOptions = [...this.props.reduxState.goalOptions.optionList];

        for( let option of newOptions){
            if( option.optionNum -1 === i ){
                let index =  newOptions.indexOf( option );
                console.log( `index:`, index );
                newOptions[index][name] = event.target.value;
            }
        }

        this.props.dispatch( {type: 'SET_GOAL_OPTIONS', payload: newOptions} );
    }

    removeOption = (i) => (event) => {
        event.preventDefault();
        let newOptions = [...this.props.reduxState.goalOptions.optionList];

        for( let option of newOptions){
            if( option.optionNum -1 === i ){
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
        let optionMap;

        if(optionList){
            optionMap = optionList.map( (option, i) => {
                i = option.optionNum-1;
                return <div key={i} >
                    <label>Option {/* {option.optionNum} */}
                        </label>
                    <input type="text" name="name" placeholder="Option Name"
                        onChange={this.handleOption(i, 'name')} />
                    <label>Points</label>
                    <input type="number" name="points" placeholder="0"
                        onChange={this.handleOption(i, 'points')} />
                    <i onClick={this.removeOption(i)} class="fas fa-trash"></i>
                </div>
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