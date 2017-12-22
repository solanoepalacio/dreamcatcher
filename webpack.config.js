const path = require('path');
const webpack = require('webpack');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const port = process.env.PORT || 7770;

const entry = PRODUCTION
  ? [
      './client/index.js'
    ]
  : [
      './client/index.js',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:7770'
    ]

const plugins = PRODUCTION
  ? [
    // TODO => find out why this is not working anymore:
      // new webpack.optimizeUglifyJsPlugin()
    ]
  : [
      new webpack.HotModuleReplacementPlugin()
    ]

plugins.push(
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(DEVELOPMENT),
      PRODUCTION: JSON.stringify(PRODUCTION)
    })
  );

plugins.push(new webpack.NoEmitOnErrorsPlugin());

module.exports = {
  devtool: 'source-map',
  entry: entry,
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: { presets: ["es2015"]}
    },{
      test: /\.(png|jpg|gif)$/,
      loader: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
      exclude: /node_modules/
    },{
      test: /\.(csv|tsv)$/,
      loader: 'csv-loader'
    },{
      test: /\.xml$/,
      loader: 'xml-loader'
    },{
      test: /\.(css|scss|styl)$/,
      loader: "style-loader!css-loader!stylus-loader" 
    },{
      test: /\.ncss$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    }]
  },
  output: {
    path: path.join(__dirname, 'client/dist/'),
    publicPath: '/client/dist/',
    filename: 'index_bundle.js'
  }
}

function normalizePort(val) {
  if (val === undefined) {
    // the port was not set
    return null;
  }

  if (Number(val) === NaN) {
    // named pipe
    return val;
  }
  // number port. normalize:
  return Number(val);
}