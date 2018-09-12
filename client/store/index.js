import { createStore, combineReducers } from 'redux'
import { users, count, sort, search } from './reducers'

const storeFactory = initialState => createStore(combineReducers({
    users,
    count,
    sort,
    search
}), initialState)

export default storeFactory