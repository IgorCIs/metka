const { MEDIA_ASSETS } = require('../settings')

module.exports = ({ side, env, hash }) =>  (side === 'client' || env === 'development') ? {
    module: {
        rules: [
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader',
                            limit: 8192,
                            name: `${MEDIA_ASSETS}/[name].${hash ? '[hash].' : ''}[ext]`
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: env === 'development'
                        }
                    }
                ]
            }
        ]
    }
} : {}