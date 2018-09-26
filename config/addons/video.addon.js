const { MEDIA_ASSETS } = require('../settings')

module.exports = ({ side, env }) =>  (side === 'client' || env === 'development') ? {
    module: {
        rules: [
            {
                test: /\.(mp4)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `${MEDIA_ASSETS}/[name].[ext]`
                        }
                    }
                ]
            }
        ]
    }
} : {}