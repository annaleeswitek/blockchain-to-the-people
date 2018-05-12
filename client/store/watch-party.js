import axios from 'axios';
import Election from '../../ethereum/election';

//Action Types
const GET_CANDIDATES = 'GET_CANDIDATES';
const GIVE_WATCH_PARTY_COUNTS = 'GIVE_WATCH_PARTY_COUNTS';

//Action Creators
const getCandidates = (candidates) => {
  return { type: GET_CANDIDATES, candidates }
};

export const giveWatchPartyCounts = (candidateLog) => {
  return { type: GIVE_WATCH_PARTY_COUNTS, candidateLog }
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
}


//Reducer
export function candidatesReducer(candidates = {}, action) {
  switch (action.type) {
    case GET_CANDIDATES:
      return action.candidates
    default:
      return candidates
  }
}

export function giveWatchPartyCountsReducer (countLog = [], action) {
  switch(action.type) {
    case GIVE_WATCH_PARTY_COUNTS:
      return [...countLog, action.candidateLog]
    default:
      return countLog
  }
}
