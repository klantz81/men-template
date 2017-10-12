const webpack = require('webpack');
const path = require('path');

module.exports = {
        entry: {
                site: ["babel-polyfill","./assets/js/site.js"],
                admin: ["babel-polyfill","./assets/js/admin.js"],
        },
        
        output: {
                path: path.resolve(__dirname, 'dist'),
                pathinfo: true,
                publicPath: '/dist/',
                filename: '[name].js',
                
                library: '[name]',
                libraryTarget: 'var'
        },

        devtool: "cheap-module-eval-source-map",//"source-map",

        module: {
                rules: [{
                        test: /\.(png|jpg|gif|svg)$/,
                        use: [{
                                loader: 'url-loader',
                                options: {
                                        limit: 8192
                                }
                        }]
                }, {
                        test: /\.js$/,
                        use: {
                                loader: 'babel-loader',
                                options: {
                                        presets: ['es2015']
                                }
                        }
                }, {
                        test: /\.less$/,
                        use: [{
                                loader: "style-loader"
                        }, {
                                loader: "css-loader",
                                options: {
                                        sourceMap: true
                                }
                        }, {
                                loader: "less-loader",
                                options: {
                                        sourceMap: true
                                }
                        }]
                }, {
                        test: /\.scss/,
                        use: [{
                                loader: "style-loader"
                        }, {
                                loader: "css-loader",
                                options: {
                                        sourceMap: true
                                }
                        }, {
                                loader: "sass-loader",
                                options: {
                                        sourceMap: true
                                }
                        }]
                }, {
                        test: /\.css$/,
                        use: [{
                                loader: "style-loader"
                        }, {
                                loader: "css-loader",
                                options: {
                                        sourceMap: true
                                }
                        }]
                }]
        },

	resolve: {
		modules: ['assets', 'assets/js', 'assets/css', 'node_modules'],
	},

        plugins: [
                new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
        ],

	profile: true
};
