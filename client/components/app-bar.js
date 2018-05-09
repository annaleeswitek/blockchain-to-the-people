import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { AppBar, Drawer } from 'material-ui';
import Login from './login';
import Logged from './logged';
import {Link} from 'react-router-dom'


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      logged: true
    };

  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    return (
      <div>
        <Toggle
          label="Logged"
          defaultToggled={true}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
        />
        <AppBar
          title="Blockchain to the People"
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        <Link to="/home"><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
        <Link to="/voting-booth"><MenuItem onClick={this.handleClose}>Voting Booth</MenuItem></Link>
        <Link to="/watch"><MenuItem onClick={this.handleClose}>Watch Room</MenuItem></Link>
        <Link to="/history"><MenuItem onClick={this.handleClose}>History</MenuItem></Link>
        </Drawer>
      </div>
    );
  }
}

export default NavBar;
