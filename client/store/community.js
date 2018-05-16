import axios from 'axios';

//Action Types
const GOT_COMMUNITY_MEMBERS = 'GOT_COMMUNITY_MEMBERS';

//Action Creators
const gotCommunityMembers = (members) => {
  return { type: GOT_COMMUNITY_MEMBERS, members }
};

//Thunks!
export const fetchCommunityMembers = (communityId) => {
  return dispatch => {
    console.log('got to axios.get')
    axios.get(`/api/users/community/${communityId}`)
      .then(res => res.data)
      .then(communityMembers => dispatch(gotCommunityMembers(communityMembers)))
      .catch(console.error)
  }
};

//Reducer

export function communityMembersReducer(communityMembers=[], action) {
  switch (action.type) {
    case GOT_COMMUNITY_MEMBERS:
    console.log("ACTION.members", action.members)
      return action.members
    default:
      return communityMembers
  }
};
