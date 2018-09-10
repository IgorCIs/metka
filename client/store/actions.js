import c from './constants'

export const updateUser = (id, user) => ({
    type: c.UPDATE_USER,
    id,
    user
})

export const sortBy = ({ sign, key }) => ({
    type: c.CHANGE_SORT,
    sign,
    key
})

export const setCountOnPage = count => ({
    type: c.CHANGE_COUNT_ON_PAGE,
    count
})