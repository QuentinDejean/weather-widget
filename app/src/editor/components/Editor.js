/* global document:true*/

import React from 'react';

import Form from './form/Form';
import Examples from './Examples';

class Editor extends React.Component {

  constructor() {
    super();

    this.state = {};
    this.initMethods();
  }

  onDemoRef(ref) {
    if (!this.demoRef) {
      this.demoRef = ref;
    }
  }

  onWidgetCreated({ inputTitle, inputWind, inputUnit }) {
    this.setState({
      isWidgetCreated: true,
      title: inputTitle,
      wind: inputWind,
      unit: inputUnit
    });
  }

  appendScript() {
    const { title, wind, unit } = this.state;
    const script = document.createElement('script');

    script.src = 'bundle.widget.js';
    script.async = true;
    script.setAttribute('title', title);
    script.setAttribute('data-show-wind', wind);
    script.setAttribute('data-unit', unit);
  }

  initMethods() {
    this.onDemoRef = this.onDemoRef.bind(this);
    this.onWidgetCreated = this.onWidgetCreated.bind(this);
  }

  renderScript() {
    this.appendScript();
    const { title, wind, unit } = this.state;
    return (
      <div>
        <h3>Here is your widget:</h3>
        <div ref={this.demoRef}></div>
        <h3>To include it in your page, you simply need to embed the following script:</h3>
        &lt;script type=&quot;text/javascript&quot;
          async
          src=&quot;bundle.widget.js&quot; data-title={title} data-wind={wind} data-unit={unit}
        &gt;&lt;/script&gt;
      </div>
    );
  }

  render() {
    const { isWidgetCreated } = this.state;
    return (
      <div>
        <h1>Welcome to the Weather Widget Editor!</h1>
        <Form
          onWidgetCreated={this.onWidgetCreated}
        />
        { isWidgetCreated ? this.renderScript() : null }
        <Examples />
      </div>
    );
  }
}

export default Editor;
