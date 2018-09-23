import compose from '../../../../util/compose'

const objectValueByStringKey = (obj, key) => {
    const [firstKey, ...keys] = key.split('.')

    return keys.length === 0 ? obj[firstKey] : objectValueByStringKey(obj[firstKey], keys.join('.'))
}

const sortUsers = ({key, sign}) => users => users
    .sort((a, b) => !objectValueByStringKey(a, key) ? 1 : !objectValueByStringKey(b, key) ? -1 :
        sign === '+' ?
            (objectValueByStringKey(a, key) > objectValueByStringKey(b, key) ? 1 : -1) :
            (objectValueByStringKey(a, key) < objectValueByStringKey(b, key) ? 1 : -1))

const spliceUsers = (page, count) => {
    const from = (page - 1) * count
    const to = from + count

    return users => users
        .reduce((users, user, index) => (index >= from && index < to) ? [...users, user] : users, [])
}



self.addEventListener('message', event => {
    const { users, page, count, sort } = JSON.parse(event.data)

    compose(
        sortUsers(sort),
        spliceUsers(page, count),
        JSON.stringify,
        postMessage
    )(users)
})