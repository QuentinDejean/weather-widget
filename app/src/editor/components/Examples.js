import React from 'react';
import ScriptDemo from './ScriptDemo';

const Examples = function Examples() {
  return (
    <div>
      <h3>Here are a few examples of already created widgets</h3>
      <ScriptDemo
        title="Awesome Weather Widget"
        unit="imperial"
        wind
      />
      <br />
      <ScriptDemo
        title="Yet another Weather Widget"
        unit="metric"
        wind={false}
      />
    </div>
  );
};

export default Examples;
