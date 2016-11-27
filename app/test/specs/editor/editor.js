/* global describe it:true */

import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Editor from '../../../src/editor/components/Editor';

describe('<Editor />', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<Editor />);
    expect(Editor.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
