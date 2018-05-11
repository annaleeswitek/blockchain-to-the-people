import axios from 'axios';
import factory from '../../ethereum/factory';

//action types
const GET_BLOCKCHAIN_ELECTIONS = 'GET_BLOCKCHAIN_ELECTIONS';
const GET_ACTIVE_ELECTION = 'GET_ACTIVE_ELECTION';
const GET_UPCOMING_ELECTIONS = 'GET_UPCOMING_ELECTIONS';
const GET_PAST_ELECTIONS = 'GET_PAST_ELECTIONS';
const POST_NEW_ELECTION = 'POST_NEW_ELECTION';

//action creators
const getBlockchainElections = (elections) => {
  return { type: GET_BLOCKCHAIN_ELECTIONS, elections }
};

const getActiveElection = (activeElection) => {
  return { type: GET_ACTIVE_ELECTION, activeElection }
};

const getUpcomingElections = (upcomingElections) => {
  return { type: GET_UPCOMING_ELECTIONS, upcomingElections }
};

const getPastElections = (pastElections) => {
  return {type: GET_PAST_ELECTIONS, pastElections}
};

const gotBackNewElection = (newElection) => {
  return { type: POST_NEW_ELECTION, newElection}
};

//thunks
export const fetchBlockchainElections = () => {
  return dispatch => {
    factory.methods.getDeployedElections().call()
      .then(elections => dispatch(getBlockchainElections(elections)))
      .catch(console.error);
  }
};

export const fetchActiveElection = (userCommunityId) => {
  //console.log('Yeah! fetchActiveElections is running')
  return dispatch => {
    axios.get(`/api/community/${userCommunityId}/active`)
      .then(res => res.data)
      .then(activeElection => dispatch(getActiveElection(activeElection)))
      .catch(console.error);
  }
};

export const fetchUpcomingElections = (userCommunityId) => {
  return dispatch => {
    axios.get(`/api/community/${userCommunityId}/upcoming`)
      .then(res => res.data)
      .then(upcomingElections => dispatch(getUpcomingElections(upcomingElections)))
      .catch(console.error);
  }
};

export const fetchPastElections = (userCommunityId) => {
  return dispatch => {
    axios.get(`/api/community/${userCommunityId}/history`)
      .then(res => res.data)
      .then(pastElections => dispatch(getPastElections(pastElections)))
      .catch(console.error);
  }
};

export const postNewElection = (obj, userCommunityId) => {
  return dispatch => {
    console.log("OBJ", obj)
    axios.post(`/api/community/${userCommunityId}/newElection`, obj)
      .then(newElection => dispatch(gotBackNewElection(newElection)))
      .catch(console.error);
  }
}

//reducers
export function activeElectionReducer(activeElection = {}, action) {
  switch (action.type) {
    case GET_ACTIVE_ELECTION:
      return action.activeElection
    default:
      return activeElection
  }
}

export function electionsReducer(elections = [], action) {
  switch (action.type) {
    case GET_UPCOMING_ELECTIONS:
      return action.upcomingElections
    case POST_NEW_ELECTION:
      return [...elections, action.newElection]
    case GET_PAST_ELECTIONS:
      return action.pastElections
    default:
      return elections
  }
}

export function blockchainElectionReducer(blockainElection = [], action) {
  switch (action.type) {
    case GET_BLOCKCHAIN_ELECTIONS:
      return action.elections
    default:
      return blockainElection
  }
}
