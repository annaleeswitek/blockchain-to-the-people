import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommunityMembers } from '../store/community';
import { List } from 'material-ui';

/**
 * COMPONENT
 */
class AllCommunityMembers extends Component {
  componentDidMount() {
    this.props.getCommunityMembers(this.props.user.communityId)
  }
  render() {
    console.log('here are community members', this.props.communityMembers)
    console.log('here is user', this.props.user)
    return (
      <div>
      <h4>Hello</h4>
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
}

const mapDispatch = (dispatch) => {
  return {
    getCommunityMembers: (communityId) => {
      dispatch(fetchCommunityMembers(communityId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllCommunityMembers);
