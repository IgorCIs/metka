import { createStore, combineReducers } from 'redux'
import { users, page, pages, sort } from './reducers'
// import axios from 'axios'

// const server = store => next => action => {
//
//     axios.post(`/api/users/${action.id}`, action.user).then(res => {
//         console.log(res)
//         next(action)
//         console.log(store.getState())
//     })
// }

// const storeFactory = initialState => applyMiddleware(server)(createStore)(users, initialState)

const storeFactory = initialState => createStore(combineReducers({
    users,
    page,
    pages,
    sort
}), initialState)

export default storeFactory