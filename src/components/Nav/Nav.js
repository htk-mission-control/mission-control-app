import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

//----Material UI----
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    float: "right",
  }
})


const Nav = (props) => (
  <div className="root">
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon/>
        </IconButton>
        <Link to="/home">
          <Typography variant="h6" className={styles.title}>
            Mission Control
          </Typography>
        </Link>
        {props.user.id && (
              <LogOutButton className={styles.button}/>
        )}
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
