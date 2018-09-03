const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CSS_ASSETS } = require('../settings')

module.exports = ({ env, hash, side }) => (env === 'development' || side === 'client') ? {
    module: {
        rules: [
            {
                test: /\.s?css/,
                use: [
                    (env === 'development' && side === 'client') ? {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    } : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                            modules: true,
                            importLoaders: 3,
                            sourceMap: (env === 'development' && side === 'client'),
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: (env === 'development' && side === 'client'),
                            plugins: [
                                require('autoprefixer')({grid: true}),
                            ]
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${CSS_ASSETS}/[name].${hash ? '[contenthash].' : ''}css`
        })
    ]
} : {}