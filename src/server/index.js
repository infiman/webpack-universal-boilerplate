import http from 'http';
import express from 'express';
// TODO: Don't forget to manage it in production!!!
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackClientConfig from '../../webpack.config.client';
import app from './app';

const listener = express();
const compiler = webpack(webpackClientConfig);

listener.set('view engine', 'ejs');
listener.set('views', `${__dirname}/../src/server/views`);

listener.use('/public/', express.static('build'));

listener.use(webpackDevMiddleware(compiler, {
  publicPath: webpackClientConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
  },
}));
listener.use(webpackHotMiddleware(compiler, {
  dynamicPublicPath: true,
}));

function hotReplacementMiddleware(req, res, next) {
  let middleware = app;

  if (module.hot) {
    module.hot.accept('./app', () => {
      middleware = app;
    });
  }

  middleware(req, res, next);
}

listener.use('/', hotReplacementMiddleware);

const server = http.createServer(listener);

server.listen(3000);
