module.exports = ({ side }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|\.worker)/,
                use: side === 'client' ? [
                    'babel-loader',
                    'eslint-loader'
                ] : [
                    'babel-loader'
                ]
            }
        ]
    }
})