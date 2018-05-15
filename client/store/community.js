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
    axios.get(`users/community/${communityId}`)
      .then(res => res.data)
      .then(communityMembers => dispatch(gotCommunityMembers(communityMembers)))
      .catch(console.error)
  }
};

//Reducer

export function communityMembersReducer(communityMembers = [], action) {
  switch (action.type) {
    case GOT_COMMUNITY_MEMBERS:
      return action.members
    default:
      return communityMembers
  }
};
