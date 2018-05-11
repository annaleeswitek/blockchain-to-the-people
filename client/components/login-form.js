import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {TextField, RaisedButton} from 'material-ui'
import {login} from '../store';

/**
 * COMPONENT
 */
const style = {
  margin: 15,
 };

const LoginForm = (props) => {
  const {name, handleSubmit, error} = props

  return (
    <div>
      <h1>Log In</h1>
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit} name={name}>
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
          <RaisedButton type="submit" label="Login" primary={true} style={style} />
        {error && error.response && <div> {error.response.data} </div>}
      </form>
  {/*<a href="/auth/google">{displayName} with Google</a>*/}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(login(email, password))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(LoginForm)
/**
 * PROP TYPES
 */
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
