import React, {Component} from 'react';
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { logout } from '../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Logged = ({ props, handleClick }) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="/tutorial"><MenuItem primaryText="Tutorial" /></Link> 
    <Link to="/about"><MenuItem primaryText="FAQ" /></Link>
    <a href="#" onClick={handleClick}><MenuItem primaryText="Log Out" /></a>
  </IconMenu>
);

/**
 * CONTAINER
*/

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

Logged.muiName = 'IconMenu'
export default connect(null, mapDispatch)(Logged);

/**
 * PROP TYPES
 */
Logged.propTypes = {
  handleClick: PropTypes.func.isRequired
}
