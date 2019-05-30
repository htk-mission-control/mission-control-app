import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Prime Solo Project</h2>
    </Link>
    <div className="nav-right">

      <Link className="nav-link" to={"/home"}>
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>

      {/* Show the link to the info page and the logout button if the user is logged in */}
      {/* ADMIN */}
      {props.user.security_clearance === 1 && (
        <>
          <Link className={props.location.pathname === '/admin/home' ? 'active nav-link' : "nav-link"} to="/admin/home">
            Home
          </Link>

          <LogOutButton className="nav-link"/>
        </>
      )}

      {/* COACH */}
      {props.user.security_clearance === 2 && (
        <>
          <Link className={props.location.pathname === '/coach/home' ? 'active nav-link' : 'nav-link'} to="/coach/home">
            Home
          </Link>

          <Link className={props.location.pathname === '/missions' ? 'active nav-link' : 'nav-link'} to="/missions">
            View Missions
          </Link>

          <Link className={props.location.pathname === '/coach/home' ? 'active nav-link' : 'nav-link'} to="/coach/home">
            View Teams
          </Link>

          {/* Can't show the following links for coach without getting the team id */}
          {/* <Link className={props.location.pathname === '/history' ? 'active nav-link' : 'nav-link'} to="/history">
            View Runs
          </Link>

          <Link className={props.location.pathname === '/practice-run' ? 'active nav-link' : 'nav-link'} to="/practice-run">
            Create Run
          </Link> */}

          <LogOutButton className="nav-link"/>
        </>
      )}

      {/* TEAM w/o access */}
      {props.user.security_clearance === 3 && (
        <>
          <Link className={props.location.pathname === '/team/home' ? 'active nav-link' : 'nav-link'} to="/team/home">
            Home
          </Link>

          <Link className={props.location.pathname === '/missions' ? 'active nav-link' : 'nav-link'} to="/missions">
            View Missions
          </Link>

          <Link className={props.location.pathname === '/history' ? 'active nav-link' : 'nav-link'} to="/history">
            View Runs
          </Link>

          <LogOutButton className="nav-link"/>
        </>
      )}

      {/* TEAM W/access */}
      {props.user.security_clearance === 3 && (
        <>
          <Link className={props.location.pathname === '/team/home' ? 'active nav-link' : 'nav-link'} to="/team/home">
            Home
          </Link>

          <Link className={props.location.pathname === '/missions' ? 'active nav-link' : 'nav-link'} to="/missions">
            View Missions
          </Link>

          <Link className={props.location.pathname === '/history' ? 'active nav-link' : 'nav-link'} to="/history">
            View Runs
          </Link>

          <Link className={props.location.pathname === '/practice-run' ? 'active nav-link' : 'nav-link'} to="/practice-run">
            Create Run
          </Link>
          
          <LogOutButton className="nav-link"/>
        </>
      )}
      
      {/* Always show this link since the about page is not protected */}
      {/* <Link className="nav-link" to="/about">
        About
      </Link> */}
    </div>
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

export default connect(mapStateToProps)(withRouter(Nav));
