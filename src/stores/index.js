import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import contactReducers from './reducers.js'

const reducers = combineReducers({
    contactReducers
})

const store = ( createStore ( reducers, applyMiddleware(thunk) ) )

export default store