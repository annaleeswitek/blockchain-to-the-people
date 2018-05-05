import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import { activeElectionReducer, upcomingElectionReducer } from './user-home';
import { activeCandidatesReducer } from './watch-party';

const reducer = combineReducers({user, activeElections: activeElectionReducer, upcomingElections: upcomingElectionReducer, activeCandidates: activeCandidatesReducer})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
