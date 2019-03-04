// vue.config.js
module.exports = {
    configureWebpack: {
        module: {
            rules: [
            {
                test: /\.coffee$/,
                use: [ 'coffee-loader' ]
            }
            ]
        },
        resolve: {
            extensions: ['.js', '.vue', '.json','.coffee']
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/urpad.github.io/dist/'
    : '/'
}