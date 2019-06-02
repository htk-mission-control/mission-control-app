import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

//----Material UI----
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing.unit * 2,
    maxWidth: 700,
    padding: theme.spacing.unit,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    marginBottom: 15,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
})


const Nav = (props) => (
  <div className="root">
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick} />
        </IconButton> */}
        <Link to="/home">
          <Typography variant="h6">
            Mission Control
          </Typography>
        </Link>
        <div>

          <Link className={props.location.pathname === '/home' ? 'active nav-link' : 'nav-link'} to={"/home"}>
            {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
            {props.user.id ? 'Home' : 'Login / Register'}
          </Link>

          {/* COACH */}
          {props.user.security_clearance === 2 && (
            <>

              <Link className={props.location.pathname === '/missions' ? 'active nav-link' : 'nav-link'} to="/missions">
                View Missions
          </Link>

              <Link className={props.location.pathname === '/home' ? 'active nav-link' : 'nav-link'} to="/home">
                View Teams
          </Link>

              {/* Can't show the following links for coach without getting the team id */}
              {/* <Link className={props.location.pathname === '/history' ? 'active nav-link' : 'nav-link'} to="/history">
            View Runs
          </Link>

          <Link className={props.location.pathname === '/practice-run' ? 'active nav-link' : 'nav-link'} to="/practice-run">
            Create Run
          </Link> */}
            </>
          )}

          {/* TEAM w/o access */}
          {props.user.security_clearance === 3 && (
            <>
              <Link className={props.location.pathname === '/missions' ? 'active nav-link' : 'nav-link'} to="/missions">
                View Missions
          </Link>

              <Link className={props.location.pathname === '/history' ? 'active nav-link' : 'nav-link'} to="/history">
                View Runs
          </Link>
            </>
          )}

          {/* TEAM W/access */}
          {props.user.security_clearance === 4 && (
            <>
              <Link className={props.location.pathname === '/missions' ? 'active nav-link' : 'nav-link'} to="/missions">
                View Missions
          </Link>

              <Link className={props.location.pathname === '/history' ? 'active nav-link' : 'nav-link'} to="/history">
                View Runs
          </Link>

              <Link className={props.location.pathname === '/practice-run' ? 'active nav-link' : 'nav-link'} to="/practice-run">
                Create Run
          </Link>
            </>
          )}

          {/* Show the link to the info page and the logout button if the user is logged in */}
          {props.user.id && (
            <>
              <LogOutButton className="nav-link" />
            </>
          )}

          {/* Always show this link since the about page is not protected */}
          {/* <Link className="nav-link" to="/about">
        About
      </Link> */}
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withRouter(Nav));
