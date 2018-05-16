import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle'; // leave this in for development
import { AppBar, Drawer } from 'material-ui';
import Logged from './logged';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginButton from './login-button';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    console.log('userLogIn', this.props.isLoggedIn)
    return (
      <div>
        {
          this.props.isLoggedIn
          ?
          <div className="app-bar">
          <AppBar
          title={<img src="logo.png" style={{height: '80px'}} />}
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={this.props.isLoggedIn ? <Logged /> : <LoginButton />}
          ><span className="user-greeting">Hello, {this.props.user.name}</span></AppBar>
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})} >
              <Link to="/home"><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
              <Link to="/voting-booth"><MenuItem onClick={this.handleClose}>Voting Booth</MenuItem></Link>
              <Link to="/watch"><MenuItem onClick={this.handleClose}>Watch Room</MenuItem></Link>
              <Link to="/history"><MenuItem onClick={this.handleClose}>History</MenuItem></Link>
              {
                this.props.user.isAdmin ? <Link to="/create-election"><MenuItem onClick={this.handleClose}>Create Election</MenuItem></Link> : null
              }
              {
                this.props.user.isAdmin ? <Link to="/create-candidate"><MenuItem onClick={this.handleClose}>Add Candidate</MenuItem></Link> : null
              }
              {
                this.props.user.isAdmin ? <Link to="/community-members"><MenuItem onClick={this.handleClose}>Community Members</MenuItem></Link> : null
              }
              {
                this.props.user.isAdmin ? <Link to="/adminTutorial"><MenuItem onClick={this.handleClose}>Admin Tutorial</MenuItem></Link> : null
              }
          </Drawer>
          </div>
          :
          <AppBar
          title={<img src="logo.png" style={{height: '80px'}} />}
          iconElementRight={this.props.isLoggedIn ? <Logged /> : <LoginButton />}
        />
        }
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(NavBar)
