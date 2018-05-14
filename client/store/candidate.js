import axios from 'axios';

//Action Types
const GET_CANDIDATES = 'GET_CANDIDATES';
const POST_NEW_CANDIDATE = 'POST_NEW_CANDIDATE';

//Action Creators
const getCandidates = (candidates) => {
  return { type: GET_CANDIDATES, candidates }
};

//Thunks!
export const fetchCandidates = (election) => {
  return dispatch => {
      election.methods.getCandidatesCount().call()
        .then(count => {
          console.log('counts is', typeof count);
        let candidates = {};
        for (let i = 0; i < +count; i++) {
          election.methods.candidates(i).call()
          .then(candidate => {
            candidates[i] = candidate;
          })
        }
        return candidates
      })
      .then(candidates => dispatch(getCandidates(candidates)))
      .catch(console.error);
  }
};

export const postNewCandidate = (newCandidateObj, electionId) => {
  return dispatch => {
    axios.post(`/api/candidates/${electionId}`, newCandidateObj)
      .then(res => res.data)
      .then(created => console.log("new candidate posted! ", created))
      .catch(console.error);
  }
};
//do we need an action creator to update the candidates array with the new candidate now?

//Reducer
export function candidatesReducer(candidates = {}, action) {
  switch (action.type) {
    case GET_CANDIDATES:
      return action.candidates
    default:
      return candidates
  }
}

