export default (...fns) =>
    fns.reduce(
        (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
        value => value
    )