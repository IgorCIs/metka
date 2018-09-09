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
    default:
        return state
    }
}

// export const page = (state = 1, action) => {
//     switch (action.type) {
//     case c.CHANGE_PAGE:
//         return +action.page
//     default: return state
//     }
// }

export const count = (state = 30, action) => {
    switch (action.type){
    case c.CHANGE_COUNT_ON_PAGE:
        return +action.count
    default: return state
    }
}

export const sort = (state = {sign: '+', key: 'fullname'}, action) => {
    switch (action.type) {
    case c.CHANGE_SORT:
        return {
            sign: action.sign || state.sign,
            key: action.key || state.key
        }
    default: return state
    }
}