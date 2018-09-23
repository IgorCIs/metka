import { createStore, combineReducers } from 'redux'
import axios from 'axios'
import { user, progress, history } from './reducers'
import { pushToHistory, setPropgress, updateUser } from './actions'

const storeFactory = initialState => createStore(combineReducers({
    user,
    progress,
    history
}), initialState)

const initialStateFn = () => {
    if (localStorage['metka-store']) {
        const initialState = JSON.parse(localStorage['metka-store'])
        const currentDate = Date.now()
        const [ firstDate ] = initialState.user && initialState.user.dates ? initialState.user.dates : []

        return {
            ...initialState,
            user: {
                ...(initialState.user ? initialState.user : {}),
                dates: [firstDate ? firstDate : currentDate, currentDate]
            }
        }
    }

    return {}
}

const store = storeFactory(initialStateFn())

store.subscribe(() => {
    if (process.env.env === 'development') console.log(store.getState())

    localStorage['metka-store'] = JSON.stringify(store.getState())
})

store.subscribe(() => {
    const { user } = store.getState()

    user._id && axios.post(`api/users/${user._id}`, user)
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