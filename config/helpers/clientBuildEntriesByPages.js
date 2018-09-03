module.exports = pages => Object.keys(pages).reduce((entries, key) => ({
    ...entries,
    [key]: pages[key].entry
}), {})