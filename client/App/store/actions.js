import c from './constants'

export const updateUser = user => ({
    type: c.UPDATE_USER,
    user
})

export const setPropgress = progress => ({
    type: c.SET_PROGRESS,
    progress
})

export const pushToHistory = page => ({
    type: c.ADD_TO_HISTORY,
    page
})