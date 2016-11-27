/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* global document:true */

import { AppContainer }     from 'react-hot-loader';
import React                from 'react';
import ReactDOM             from 'react-dom';

import getWidgetParams from './utils/domUtils';
import Widget          from './components/Widget';

import './assets/css/cleanslate.css';
import './assets/css/main.css';

const render = (widgetContainerId, props) => {
  ReactDOM.render(
    <AppContainer>
      <Widget {...props} />
    </AppContainer>,
    document.getElementById(widgetContainerId)
  );
};

getWidgetParams()
.then((params) => {
  const widgetContainerId = params[0];
  const props = params[1];

  render(widgetContainerId, props);

  if (module.hot) {
    module.hot.accept('./components/Widget', render.bind(render, widgetContainerId, props));
  }
})
.catch((e) => {
  console.log('An error occured while initialising widget params: ', e);
});
