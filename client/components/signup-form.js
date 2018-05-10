import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {TextField, RaisedButton} from 'material-ui'
import {signup} from '../store';

/**
 * COMPONENT
 */
const style = {
  margin: 15
 };

const SignUpForm = (props) => {
  const {handleSubmit, error} = props

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <TextField
        hintText="Enter your Full Name"
        floatingLabelText="Name"
        name="name"
        />
        <br/>
        <TextField
        hintText="Enter your Email"
        floatingLabelText="Email"
        name="email"
        />
        <br/>
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          name="password"
          />
        <br/>
          {/*<button type="submit">{displayName}</button>*/}
          <RaisedButton type="submit" label="Sign Up" primary={true} style={style} />
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

      console.log('name is', name); 
      dispatch(signup(name, email, password))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm)

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  // name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
