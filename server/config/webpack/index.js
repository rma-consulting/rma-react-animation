/* eslint-disable */

var path = require('path'),
	processCwd = process.cwd(),
	clientPath = path.resolve(processCwd, 'client'),
	assetsPath = path.resolve(processCwd, 'public/assets'),
	webpack = require('webpack');

module.exports = {
	context: processCwd,
	devtool: 'source-map',
	entry: {
		index: [
			path.resolve(clientPath, 'src/app.js')
		]
	},
	output: {
		path: path.resolve(assetsPath),
		filename: '[name].js',
		publicPath: path.resolve(assetsPath)
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: [
					/node_modules\/(?!(react-easy-chart)).*/,
				],
				loader: 'babel'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			preserveComments: false
		}),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	] //new webpack.HotModuleReplacementPlugin(),
};