/* global document:true*/

import React from 'react';

import Form from './form/Form';
import Examples from './Examples';

class Editor extends React.Component {

  constructor() {
    super();

    this.scriptName = 'bundle.widget.js';
    this.state = {};
    this.initMethods();
  }

  onDemoRef(ref) {
    if (!this.demoRef) {
      this.demoRef = ref;
      this.appendScript();
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
    if (!this.demoRef) {
      return;
    }

    const { title, wind, unit } = this.state;
    const script = document.createElement('script');

    script.src = this.scriptName;
    script.async = true;
    script.setAttribute('title', title);
    script.setAttribute('data-show-wind', wind);
    script.setAttribute('data-unit', unit);

    if (this.demoRef.hasChildNodes()) {
      this.demoRef.removeChild(this.demoRef.lastChild);
    }

    this.demoRef.appendChild(script);
  }

  initMethods() {
    this.onDemoRef = this.onDemoRef.bind(this);
    this.onWidgetCreated = this.onWidgetCreated.bind(this);
  }

  renderScript() {
    const { title, wind, unit } = this.state;
    return (
      <div>
        <h3>Here is your widget:</h3>
        <div ref={this.onDemoRef} />
        <h3>To include it in your page, you simply need to embed the following script:</h3>
        &lt;script type=&quot;text/javascript&quot;
          async
          src=&quot;{this.scriptName}&quot; data-title=&quot;{title}&quot; data-wind=&quot;{`${wind}`}&quot; data-unit=&quot;{unit}&quot;
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
