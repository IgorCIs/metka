import { createStore, combineReducers } from 'redux'
import { user, progress, history } from './reducers'
import { pushToHistory, setPropgress } from './actions'

const storeFactory = initialState => createStore(combineReducers({
    user,
    progress,
    history
}), initialState)

const store = storeFactory({})

export const goToView = index => store.dispatch(pushToHistory(index))
export const reloadProgress = progress => store.dispatch(setPropgress(progress))
export const getUserCall = () => store.getState().user.call

export default store