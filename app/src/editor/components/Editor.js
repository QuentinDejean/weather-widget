/* global document:true */

import React from 'react';

import Form from './form/Form';
import Examples from './Examples';
import ScriptDemo from './ScriptDemo';

class Editor extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.initMethods();
  }

  onWidgetCreated({ inputTitle, inputWind, inputUnit }) {
    this.setState({
      isWidgetCreated: true,
      title: inputTitle,
      wind: inputWind,
      unit: inputUnit
    });
  }

  initMethods() {
    this.onWidgetCreated = this.onWidgetCreated.bind(this);
  }

  render() {
    const { isWidgetCreated, title, wind, unit } = this.state;
    return (
      <div>
        <h1>Welcome to the Weather Widget Editor!</h1>
        <Form
          onWidgetCreated={this.onWidgetCreated}
        />
        <br />
        { isWidgetCreated ?
          <ScriptDemo
            title={title}
            wind={wind}
            unit={unit}
          />
          : null }
        <hr />
        <Examples />
      </div>
    );
  }
}

export default Editor;
