var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var path = require('path');

var config = require('./webpack.config.js');

const port = normalizePort(process.env.PORT) || 7770;
var compiler = webpack(config);

var devServer = new WebpackDevServer(compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

devServer.listen(port, 'localhost', function(err) {
  if(err) {
    console.log('Error while starting the server: \n'+err);
  }
  console.log('DevServer listening on port: %d', port);
});

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
