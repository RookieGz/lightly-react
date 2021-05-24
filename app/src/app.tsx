import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { init } from '@rematch/core';

import GlobalModel from './models/global';
import pages from './pageConfig';

import asyncComponent from './utils/asyncComponent';

import './global.less';

export const Store = init({
  name: 'Application',
  models: {
    global: GlobalModel,
  },
});

function App() {
  return (
      <Provider store={Store}>
        <HashRouter>
          <Switch>
            {pages.map((page) => (
              <Route
                key={`${page.path}`}
                path={page.path}
                exact
                component={asyncComponent(page.component, page.models, Store.model)}
              />
            ))}
          </Switch>
        </HashRouter>
      </Provider>
  );
}

ReactDom.render(<App />, document.getElementById('root'));
