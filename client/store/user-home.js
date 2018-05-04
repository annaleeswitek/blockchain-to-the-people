import axios from 'axios'

//action types
  const GET_ELECTION = 'GET_ELECTION'

//acion creators
  const getElection = (election) => {
    return {type: GET_ELECTION, election}
  }

//thunks

//reducers

