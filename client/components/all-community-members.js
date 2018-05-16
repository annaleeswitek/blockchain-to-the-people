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
console.log('got community members, ', this.props.communityMembers)
    return (
      <h4>Hello</h4>
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
