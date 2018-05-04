import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {

  return (
    <div>
      <h3>Welcome, {props.user.name}</h3>
      <hr />
      <h4>Active Election:</h4>
      <h5>election name</h5>
      <h5>election date</h5>
      <h5>candidate list</h5>
      <button>Vote Now!</button>
      <hr />
      <h4>Upcoming Elections:</h4>
      <h5>election name</h5>
      <h5>election date</h5>
      <h5>candidate list</h5>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
