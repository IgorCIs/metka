const { JS_ASSETS } = require('../settings')

module.exports = ({ side, hash }) => side === 'client' ? {
    output: {
        // worker workaround for HMR (replacing 'window' by 'this')
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'worker-loader',
                        options: {
                            name: `${JS_ASSETS}/[name].${hash ? '[hash].' : ''}[ext]`
                        }
                    },
                    'babel-loader'
                ]
            }
        ]
    }
} : {}