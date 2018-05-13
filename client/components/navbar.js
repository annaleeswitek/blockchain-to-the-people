import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {AppBar, Drawer} from 'material-ui'
import FlatButton from 'material-ui/FlatButton';

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <div>
    <h1>Blockchain to the People</h1>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <FlatButton><Link to="/home">Home</Link></FlatButton>
          <FlatButton><Link to="/voting-booth">Voting Booth</Link></FlatButton>
          <FlatButton><Link to="/watch">Watch Party</Link></FlatButton>
          <FlatButton><Link to="/history">History</Link></FlatButton>
          {
            user.isAdmin ? <Link to="/create-election">Create Election</Link> : null
          }
           {
            user.isAdmin ? <Link to="/create-candidate">Create Candidate</Link> : null 
          }
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <FlatButton><Link to="/login">Login</Link></FlatButton>
          <FlatButton><Link to="/signup">Sign Up</Link></FlatButton>
        </div>
      )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
