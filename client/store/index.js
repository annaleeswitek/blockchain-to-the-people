import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import { activeElectionReducer, upcomingElectionReducer, blockchainElectionReducer } from './user-home';
import { candidatesReducer } from './watch-party';

const reducer = combineReducers({user, activeElections: activeElectionReducer, upcomingElections: upcomingElectionReducer, blockchainElections: blockchainElectionReducer, candidates: candidatesReducer })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
