import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import { activeElectionReducer, electionsReducer, blockchainElectionReducer } from './election';
import { candidatesReducer } from './watch-party';

const reducer = combineReducers({user, activeElection: activeElectionReducer, elections: electionsReducer, blockchainElections: blockchainElectionReducer, candidates: candidatesReducer })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
