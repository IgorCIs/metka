import { createStore, combineReducers } from 'redux'
import { user, progress, history } from './reducers'
import { pushToHistory, setPropgress, updateUser } from './actions'

const storeFactory = initialState => createStore(combineReducers({
    user,
    progress,
    history
}), initialState)

const store = storeFactory(
    localStorage['metka-store'] ?
        JSON.parse(localStorage['metka-store']) :
        {}
)

store.subscribe(() => {
    console.log(store.getState())
    localStorage['metka-store'] = JSON.stringify(store.getState())
})

export const goToView = index => store.dispatch(pushToHistory(index))

export const reloadProgress = progress => store.dispatch(setPropgress(progress))

export const getUserCall = () => store.getState().user.call

export const setTest = (name, value) => {
    const { user } = store.getState()

    store.dispatch(updateUser({
        ...user,
        tests: {
            ...user.tests,
            [name]: {
                answer: value,
                count: !user.tests || !user.tests[name] ? 1 :
                    user.tests[name].count === undefined ?
                        1 : user.tests[name].count + 1
            }
        }
    }))
}

export const getTest = name => store.getState().user.tests[name].answer

export default store