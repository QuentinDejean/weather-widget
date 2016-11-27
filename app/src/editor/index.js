/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* global document:true*/

import { AppContainer }     from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React                from 'react';
import ReactDOM             from 'react-dom';

import './assets/css/main.css';

import Editor from './components/Editor';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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
