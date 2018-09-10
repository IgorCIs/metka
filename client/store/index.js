import { createStore, combineReducers } from 'redux'
import { users, count, sort } from './reducers'

const storeFactory = initialState => createStore(combineReducers({
    users,
    count,
    sort
}), initialState)

export default storeFactory