import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import { activeElectionReducer, upcomingElectionsReducer, pastElectionsReducer, blockchainElectionReducer } from './election';
import { communityMembersReducer } from './community';

const reducer = combineReducers({ user, activeElection: activeElectionReducer, upcomingElections: upcomingElectionsReducer, pastElections: pastElectionsReducer,blockchainElections: blockchainElectionReducer, communityMembers: communityMembersReducer })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
