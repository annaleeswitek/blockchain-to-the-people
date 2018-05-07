import axios from 'axios';
import factory from '../../ethereum/factory';

//action types
const GET_BLOCKCHAIN_ELECTIONS = 'GET_BLOCKCHAIN_ELECTIONS';
const GET_ACTIVE_ELECTIONS = 'GET_ACTIVE_ELECTIONS'
const GET_UPCOMING_ELECTIONS = 'GET_UPCOMING_ELECTIONS'

//action creators
const getBlockchainElections = (elections) => {
  return {type: GET_BLOCKCHAIN_ELECTIONS, elections}
}

const getActiveElections = (activeElections) => {
  return {type: GET_ACTIVE_ELECTIONS, activeElections}
}
const getUpcomingElections = (upcomingElections) => {
  return {type: GET_UPCOMING_ELECTIONS, upcomingElections}
}

//thunks
export const fetchBlockchainElections = () => {
  return dispatch => {
    factory.methods.getDeployedElections().call()
    .then(elections => dispatch(getBlockchainElections(elections)))
    .catch(console.error);
  }
}

export const fetchActiveElections = () => {
  return dispatch => {
    axios.get('/api/elections/active')
    .then(res => res.data)
    .then(activeElections => {
      dispatch(getActiveElections(activeElections))
    })
    .catch(console.error)
  }
}
export const fetchUpcomingElections = () => {
  return dispatch => {
    axios.get('/api/elections/upcoming')
    .then(res => res.data)
    .then(upcomingElections => {
      dispatch(getUpcomingElections(upcomingElections))
    })
    .catch(console.error)
  }
}

//reducers
export function activeElectionReducer(activeElections = [], action) {
  switch (action.type) {
    case GET_ACTIVE_ELECTIONS:
      return action.activeElections
    default:
      return activeElections
  }
}

export function upcomingElectionReducer(upcomingElections = [], action) {
  switch (action.type) {
    case GET_UPCOMING_ELECTIONS:
      return action.upcomingElections
    default:
      return upcomingElections
  }
}

export function blockchainElectionReducer(blockainElection = [], action) {
  switch(action.type) {
    case GET_BLOCKCHAIN_ELECTIONS:
      return action.elections
    default:
      return blockainElection
  }
}

