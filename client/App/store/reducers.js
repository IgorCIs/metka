import c from './constants'

export const user = (state = {}, action) => {
    switch(action.type) {
    case c.UPDATE_USER:
        return action.user
    default:
        return state
    }
}

export const progress = (state = 0, action) => {
    switch(action.type) {
    case c.SET_PROGRESS:
        return action.progress
    default:
        return state
    }
}

export const history = (state = [0], action) => {
    switch(action.type) {
    case c.ADD_TO_HISTORY:
        return [...state, action.page]
    default:
        return state
    }
}
