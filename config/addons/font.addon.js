const { FONT_ASSETS } = require('../settings')

module.exports = ({ side, env }) =>  (side === 'client' || env === 'development') ? {
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `${FONT_ASSETS}/[name].[ext]`
                        }
                    }
                ]
            }
        ]
    }
} : {}