import axios from 'axios';

// -- ACTION TYPES --

const GET_CANDIDATES_ACTIVE_ELECTION = 'GET_CANDIDATES_ACTIVE_ELECTION';

// -- ACTION CREATORS --

const getCandidatesActiveElection = activeCandidates => ({ type: GET_CANDIDATES_ACTIVE_ELECTION, activeCandidates });

// -- THUNKS --

export const fetchCandidatesActiveElection = communityId => {
  return function thunk (dispatch) {
    return axios.get(`/api/communities/${communityId}/activeElection`)
      .then(res => res.data)
      .then(activeCandidates => dispatch(getCandidatesActiveElection(activeCandidates)))
      .catch(err => console.error(err));
  }
}

// -- REDUCER --

export function activeCandidatesReducer(state = [], action) {
  switch (action.type) {
    case GET_CANDIDATES_ACTIVE_ELECTION:
      return action.activeCandidates;
      default:
      return state
  }
}
