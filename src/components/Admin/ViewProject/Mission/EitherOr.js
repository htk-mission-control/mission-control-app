import React, {Component} from 'react';
import {connect} from 'react-redux';

class EitherOr extends Component {

    state = {
        optionArray: this.props.reduxState.goalOptions.optionList,
        count: 1,
    }

    componentDidUpdate(prevProps){
        if(this.props.reduxState.goalOptions !== prevProps.goalOptions){
            // I DON'T KNOW WHAT TO DOOOO
        }
    }

    addOption = () => {
        this.props.dispatch( {type: 'ADD_OPTION'} );
    }

    handleOption = (i, name) => (event) => {
        let newOptions = [...this.props.reduxState.goalOptions.optionList];
        newOptions[i][name] = event.target.value;

        this.props.dispatch( {type: 'SET_GOAL_OPTIONS', payload: newOptions} );
    }

    add = () => {
        this.setState({
            ...this.state,
            count: this.state.count + 1
        })
        console.log( `CHANGING STATE`, this.state.count );
        
    }

    render() {
        let optionList = this.props.reduxState.goalOptions.optionList;
        let optionMap;

        if(optionList){
            optionMap = this.state.optionArray.map( (option, i) => 
                <div key={i} >
                    <label>Option {option.optionNum}</label>
                    <input type="text" name="name" placeholder="Option Name"
                        onChange={this.handleOption(i, 'name')} />
                    <label>Points</label>
                    <input type="number" name="points" placeholder="0"
                        onChange={this.handleOption(i, 'points')} />
                </div>
        )} else {
            optionMap = null;
        }

        return(
            <div>

                {optionMap}
                <p>{this.state.count}</p> 

                <button onClick={this.addOption} >Add Option</button>
                <button onClick={this.add} >Add</button>

            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(EitherOr);

