import React, {Component} from 'react';

class EitherOr extends Component {

    state = {
        optionCount: 1,
        options: [
            {
                option: 1,
                name: '',
                points: '',
            }
        ]
    }

    addOption = () => {
        this.setState({
            ...this.state,
            optionCount: this.state.optionCount + 1,
            options: [
                ...this.state.options,
                {
                    option: this.state.optionCount + 1,
                }
            ]
        })
        console.log( `Last state:`, this.state );
    }

    handleOption = (i, name) => (event) => {
        // console.log( `State:`, this.state );
        let newOptions = [...this.state.options];
        newOptions[i][name] = event.target.value;

        this.setState({
            ...this.state,
            goals: newOptions,
        })
    }

    render() {
        return(
            <div>

                {this.state.options.map( (option, i) => 
                    <div key={i} >
                        <label>Option {option.option}</label>
                        <input type="text" name="name" placeholder="Option Name"
                            onChange={this.handleOption(i, 'name')} />
                        <label>Points</label>
                        <input type="number" name="points" placeholder="0"
                            onChange={this.handleOption(i, 'points')} />

                    </div>
                )} 

                <button onClick={this.addOption} >Add Option</button>

            </div>
        )
    }
}


export default EitherOr;

