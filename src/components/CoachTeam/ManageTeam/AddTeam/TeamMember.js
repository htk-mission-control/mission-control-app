import React, { Component } from "react";
import {connect} from 'react-redux';

//----Material UI----
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';

class TeamMember extends Component {

state = {
  edit: false,
  name: this.props.item.name,
  member_id: this.props.item.member_id,
  team_id: this.props.reduxState.teamIdReducer,
  teamId: this.props.reduxState.teamIdReducer
}


handleChange = propertyName => event => {
  this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }

hide = () => {
  const hidePayload = {
    hideProps: this.state,
    teamId: this.state.team_id
  }

  this.props.dispatch({
    type: "HIDE_TEAM_MEMBER",
    payload: hidePayload
  })
}

  editTeamMember = () => {
    this.setState({
      ...this.state,
      edit: true,
    })
  }

  saveTeamMember = () => {
    this.setState({
      ...this.state,
      edit: false
    })
    this.props.dispatch({
      type: "EDIT_TEAM_MEMBER",
      payload: this.state
    })
  }

//Takes in team members as props
  render() {
    if (this.state.edit === false)
    return (
      <TableRow>
        <TableCell>{this.props.item.name}</TableCell>
        <TableCell><EditIcon onClick={this.editTeamMember}>Edit</EditIcon></TableCell>
        <TableCell><DeleteIcon onClick={this.hide}>Delete</DeleteIcon></TableCell>
      </TableRow>
    );
    else if (this.state.edit === true) 
    return (
      <TableRow>
        <TableCell>
          <TextField value={this.state.teamMemberName} onChange={this.handleChange("teamMemberName")}>
          </TextField>
        </TableCell>
        <TableCell>
          <SaveIcon  onClick={this.saveTeamMember}>Save
          </SaveIcon>
        </TableCell>
        <TableCell>{' '}</TableCell>
      </TableRow>
    )
  }
}


const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});export default connect(mapReduxStateToProps)(TeamMember);