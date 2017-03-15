// noinspection Eslint
var path = require('path');
// noinspection Eslint
var webpack = require('webpack');

// noinspection Eslint
module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist/', // This is where images AND js will go
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.jsx$/, loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}, // use ! to chain loaders
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },

  resolve: {
    // you can now require('file') instead of require('file.js')
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(new Date().toISOString())
    })
    /* uncomment the following to transpile a production build */
    /*
    , new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
    */
  ]
};
