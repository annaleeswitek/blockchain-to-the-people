import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {TextField, RaisedButton, Paper} from 'material-ui'
import {signup} from '../store';
import { LandingPage } from './landing-page';

/**
 * COMPONENT
 */
const buttonStyle = {
  margin: 15
 };

const style = {
  height: 400,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const SignUpForm = (props) => {
  const {handleSubmit, error} = props

  return (
    <div className="form-flex">
      <LandingPage />
      <div className="form">
        <h2 style={{textAlign: 'center'}}>Voting Made Easy and Secure!</h2>
        <Paper style={style} zDepth={2}>
          <br />
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
          <TextField
            hintText="Enter your Full Name"
            floatingLabelText="Name"
            name="name"
            />
            <br />
            <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
            name="email"
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              name="password"
              />
            <br />
              <RaisedButton type="submit" label="Sign Up" primary={true} style={buttonStyle} />
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </Paper>
      </div>
    </div>
  )
}


const mapSignup = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const name = evt.target.name.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(signup(name, email, password))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm)

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
