import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {TextField, RaisedButton} from 'material-ui'
import {signup} from '../store';

/**
 * COMPONENT
 */

export const Instructions = () => {
  return (
    <div>
      <h3>Welcome to this amazing platform to vote!</h3>
    </div>
  )
}
