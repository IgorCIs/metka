import c from './constants'

export const user = (state = {}, action) => {
    switch (action.type) {
    case c.UPDATE_USER:
        return action.id === state._id ? {
            ...state,
            ...action.user
        } : state
    default:
        return state
    }
}

export const users = (state = [], action) => {
    switch (action.type) {
    case c.UPDATE_USER:
        return state.map(u => user(u, action))
    case c.CHANGE_SORT_KEY:
    case c.CHANGE_PAGE:
    case c.CHANGE_PAGES:
        return action.users || []
    default:
        return state
    }
}

export const page = (state = 1, action) => {
    switch (action.type) {
    case c.CHANGE_PAGE:
        return +action.page
    case c.CHANGE_PAGES:
        return 1
    default: return state
    }
}

export const pages = (state = 1, action) => {
    switch (action.type) {
    case c.CHANGE_PAGES:
        return +action.pages
    default: return state
    }
}

export const sort = (state = '+fullname', action) => {
    switch (action.type) {
    case c.CHANGE_SORT_KEY:
        return action.sort
    default: return state
    }
}