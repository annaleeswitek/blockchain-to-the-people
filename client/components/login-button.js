import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router-dom';

class LoginButton extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <div>
        <Link to="/login"><FlatButton {...this.props} label="Login" /></Link>
        <Link to="/signup"><FlatButton {...this.props} label="Signup" /></Link>
      </div>
    );
  }
}

export default LoginButton;
