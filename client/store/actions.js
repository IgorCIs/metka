import c from './constants'

export const updateUser = (id, user) => ({
    type: c.UPDATE_USER,
    id,
    user
})

export const setPage = (page, users) => ({
    type: c.CHANGE_PAGE,
    page,
    users
})

export const setPages = (pages, users) => ({
    type: c.CHANGE_PAGES,
    pages,
    users
})

export const sortBy = (sort, users) => ({
    type: c.CHANGE_SORT_KEY,
    sort,
    users
})