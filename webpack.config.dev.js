import path from 'path'
import webpack from 'webpack'

export default {
    entry: path.join(_dirname, '/App/App.js'),
    output: {
        path: _dirname,
        filename: 'bundle.js',
        publicPath: path.join(_dirname, '/App/')
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module : {
        loaders: [
            {
                test: /\.jsx$/,
                include: path.join(_dirname, '/App/App.js'),
                exclude: '/node_modules/',
                loaders: ['babel-loader']
            }
        ]
    }
}