import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommunityMembers, postMemberEmail } from '../store/community';
import { TextField, RaisedButton } from 'material-ui';
import moment from 'moment';

const buttonStyle = {
  margin: 45
};

/**
 * COMPONENT
 */
class AllCommunityMembers extends Component {

  constructor() {
    super();
    this.state = {
      memberName: '',
      memberEmail: '',
      emailSubject: '',
      memberMessage: ''
    }
  }

  componentDidMount() {
    this.props.getCommunityMembers(this.props.user.communityId)
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("state in handleSubmit", this.state);
    const sendObj = {
      email: this.state.memberEmail,
      name: this.state.memberName,
      subject: this.state.emailSubject,
      message: this.state.memberMessage
    }
    this.props.sendMemberEmail(sendObj);
  }

  render() {
    return (
      <div className="flex-center">
      <h4 className="header">Here Are Your Community Members!</h4>
      {
        this.props.communityMembers.length ?
        this.props.communityMembers.map(member => {
            return (
              <div className="community-member-box" key={member.id}>
                <div>{member.name}</div>
                <div>{member.email}</div>
                <div>Joined: {moment(member.createdAt).format('dddd, MMMM Do YYYY')}</div>
              <br />
            </div>
            )
            }) : <div>There are no members in your community!</div>
      }
      <form onSubmit={this.handleSubmit}>
      <br />
      <br />
      <br />
        <div className="invite-form-box">
        <h3>Invite a Community Member to Participate in an Election</h3>
          <TextField
            floatingLabelText="member name"
            value={this.state.memberName}
            name="memberName"
            onChange={this.handleChange}
          />
          <TextField
            floatingLabelText="member email"
            value={this.state.memberEmail}
            name="memberEmail"
            onChange={this.handleChange}
          />
          <TextField
            floatingLabelText="subject line"
            value={this.state.emailSubject}
            name="emailSubject"
            onChange={this.handleChange}
          />
          <TextField
            floatingLabelText="message"
            multiLine={true}
            value={this.state.memberMessage}
            name="memberMessage"
            onChange={this.handleChange}
          />
          <RaisedButton type="submit" primary={true} style={buttonStyle} label="SUBMIT" labelColor="white" />
        </div>
      </form>
    </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    communityMembers: state.communityMembers,
    user: state.user,
  }
};

const mapDispatch = (dispatch) => {
  return {
    getCommunityMembers: (communityId) => {
      dispatch(fetchCommunityMembers(communityId))
    },
    sendMemberEmail: (sendObj) => {
      dispatch(postMemberEmail(sendObj));
    }
  }
};

export default connect(mapState, mapDispatch)(AllCommunityMembers);
