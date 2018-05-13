import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import { activeElectionReducer, electionsReducer, blockchainElectionReducer } from './election';
// import { giveWatchPartyCountsReducer } from './watch-party';
import { candidatesReducer, newVoteSocketsReducer } from './watch-party';

const reducer = combineReducers({ user, activeElection: activeElectionReducer, elections: electionsReducer, blockchainElections: blockchainElectionReducer, candidates: candidatesReducer,
  newVotes: newVoteSocketsReducer })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
