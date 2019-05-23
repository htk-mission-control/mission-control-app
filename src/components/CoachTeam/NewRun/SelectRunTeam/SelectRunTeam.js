import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectRunTeam extends Component {
    render(){
        return(
            <div>
                <form>
                    <label>Driver:</label>
                    <input type='select' />
                    <label>Assistant:</label>
                    <input type='select' />
                    <label>Scorekeeper:</label>
                    <input type='select' />
                </form>
            </div>
        )
    }
}