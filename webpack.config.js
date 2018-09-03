const webpackMerge = require('webpack-merge')

const { getAddonsModules, getEnvConfig } = require('./config/helpers')

module.exports = ({
    env = 'development',
    side = 'client',
    publicPath = '/',
    hash = false
}) =>
    webpackMerge(
        getEnvConfig(`${side}.${env}`)({publicPath, hash}),
        ...getAddonsModules().map(addon => addon({
            env,
            side,
            hash,
            publicPath
        }))
    )