const nodeExternals = require('webpack-node-externals')

module.exports = ({ side }) => side === 'server' ? {
    output: {
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: [nodeExternals(), /^\.\.\/dist/]
} : {}
