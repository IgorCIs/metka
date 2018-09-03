module.exports = ({ side }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
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