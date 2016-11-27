/* global document:true */

import React from 'react';

class ScriptDemo extends React.Component {

  constructor() {
    super();

    this.scriptName = 'bundle.widget.js';

    this.initMethods();
  }

  onDemoRef(ref) {
    if (!this.demoRef) {
      this.demoRef = ref;
      this.appendScript();
    }
  }

  appendScript() {
    const { title, wind, unit } = this.props;
    const script = document.createElement('script');

    script.src = this.scriptName;
    script.async = true;
    script.setAttribute('data-title', title);
    script.setAttribute('data-show-wind', wind);
    script.setAttribute('data-unit', unit);

    if (this.demoRef.hasChildNodes()) {
      this.demoRef.innerHTML = '';
    }

    this.demoRef.appendChild(script);
  }

  initMethods() {
    this.onDemoRef = this.onDemoRef.bind(this);
  }

  render() {
    const { title, wind, unit } = this.props;
    return (
      <div>
        <div ref={this.onDemoRef} />

        <p>Code to embed: </p>

        &lt;script type=&quot;text/javascript&quot;
          async
          src=&quot;{this.scriptName}&quot; data-title=&quot;{title}&quot; data-wind=&quot;{`${wind}`}&quot; data-unit=&quot;{unit}&quot;
        &gt;&lt;/script&gt;
      </div>
    );
  }
}

ScriptDemo.propTypes = {
  wind: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  unit: React.PropTypes.oneOf(['metric', 'imperial'])
};

export default ScriptDemo;
