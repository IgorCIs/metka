const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CSS_ASSETS } = require('../settings')

const loaders = (env, side, localIdentName) =>
    [
        (env === 'development' && side === 'client') ? {
            loader: 'style-loader',
            options: {
                sourceMap: true
            }
        } : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: localIdentName ? {
                localIdentName: '[name]__[local]__[hash:base64:5]',
                modules: true,
                importLoaders: 3,
                sourceMap: (env === 'development' && side === 'client'),
            } : {
                sourceMap: (env === 'development' && side === 'client')
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

module.exports = ({ env, hash, side }) => (env === 'development' || side === 'client') ? {
    module: {
        rules: [
            {
                test: /\.s?css/,
                exclude: /node_modules/,
                use: loaders(env, side, true)
            },
            {
                test: /\.scss/,
                include: /node_modules/,
                use: loaders(env, side, false)
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${CSS_ASSETS}/[name].${hash ? '[contenthash].' : ''}css`
        })
    ]
} : {}