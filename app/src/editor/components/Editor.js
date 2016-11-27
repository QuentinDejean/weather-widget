/* global document:true*/

import React from 'react';

import Form from './form/Form';
import Examples from './Examples';

const App = () => (
  <div>
    <h1>Welcome to the Weather Widget Editor!</h1>
    <Form
      onWidgetCreated={onWidgetCreated}
    />
    <Examples />
  </div>
);

export default App;
