import { URL } from 'url';
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { ConnectedRouter, push } from 'react-router-redux';

import { routes, storeConfig } from '../../config';

const router = express.Router();

router.get('*', (req, res) => {
  const requestUrl = new URL(`${req.protocol}://${req.hostname}${req.originalUrl}`);
  const components = matchRoutes(routes, requestUrl.pathname);
  const promises = [];
  const history = storeConfig.getHistory();
  const store = storeConfig.getStore(history, {
    router: {
      location: {
        pathname: requestUrl.pathname,
        search: requestUrl.search,
      },
    },
  });

  store.dispatch(push(`${requestUrl.pathname}${requestUrl.search}`));

  for (let i = 0, length = components.length; i < length; i += 1) {
    const { fetchData } = components[i].route.component;

    promises.push(fetchData instanceof Function ? fetchData(store) : Promise.resolve(null));
  }

  return Promise.all(promises).then(() => {
    const application = renderToString(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {renderRoutes(routes)}
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
    );

    res.render('index', {
      application,
      state: JSON.stringify(store.getState()),
    });
  });
});

export default router;
