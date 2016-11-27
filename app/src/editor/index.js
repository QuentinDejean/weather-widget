/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* global document:true*/

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import Editor from './components/Editor';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Editor />
    </AppContainer>,
    document.getElementById('editor')
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Editor', render);
}
