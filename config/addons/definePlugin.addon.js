const webpack = require('webpack')

module.exports = ({ side, env }) => ({
    plugins: [
        new webpack.DefinePlugin({
            'process.env.env': JSON.stringify(env),
            'process.env.side': JSON.stringify(side)
        })
    ]
})
