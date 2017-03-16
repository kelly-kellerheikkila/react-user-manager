import { config, expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import AppCheckbox from './AppCheckbox';

config.truncateThreshold = 0;

describe('Component - <AppCheckbox />', () => {
  it('has `app-checkbox` class', () => {
    const wrapper = shallow(<AppCheckbox id="test1" onChange={() => {}} />);
    expect(wrapper.find('div').hasClass('app-checkbox')).to.equal(true);
  });


  it('has custom class', () => {
    const wrapper = shallow(<AppCheckbox id="test2" className="custom-class" onChange={() => {}} />);
    expect(wrapper.find('div').hasClass('custom-class')).to.equal(true);
  });


  it('has custom label class', () => {
    const wrapper = shallow(<AppCheckbox id="test3" labelClassName="label-custom-class" onChange={() => {}} />);
    expect(wrapper.find('label').hasClass('label-custom-class')).to.equal(true);
  });


  it('renders as checked', () => {
    const wrapper = shallow(<AppCheckbox id="test4" checked onChange={() => {}} />);
    expect(wrapper.find('input').prop('checked')).to.equal(true);
  });


  it('renders as unchecked', () => {
    const wrapper = shallow(<AppCheckbox id="test5" onChange={() => {}} />);
    expect(wrapper.find('input').prop('checked')).to.equal(false);
  });


  it('renders with id, name', () => {
    const wrapper = shallow(<AppCheckbox id="test6" onChange={() => {}} />);
    expect(wrapper.find('input').prop('id')).to.equal('test6');
    expect(wrapper.find('input').prop('name')).to.equal('test6');
  });


  it('renders with title', () => {
    const wrapper = shallow(<AppCheckbox id="test7" title="Custom Title" onChange={() => {}} />);
    expect(wrapper.find('label').prop('title')).to.equal('Custom Title');
  });


  it('renders as enabled', () => {
    const wrapper = shallow(<AppCheckbox id="test8" onChange={() => {}} />);
    expect(wrapper.find('input').prop('disabled')).to.equal(false);
  });


  it('renders as disabled', () => {
    const wrapper = shallow(<AppCheckbox id="test9" disabled onChange={() => {}} />);
    expect(wrapper.find('input').prop('disabled')).to.equal(true);
    expect(wrapper.find('div').hasClass('disabled')).to.equal(true);
  });


  it('renders as required', () => {
    const wrapper = shallow(<AppCheckbox id="test10" required onChange={() => {}} />);
    expect(wrapper.find('div').hasClass('required')).to.equal(true);
  });


  it('renders with label', () => {
    const wrapper = shallow(<AppCheckbox id="test11" label="Test Checkbox" onChange={() => {}} />);
    expect(wrapper.text()).to.contain('Test Checkbox');
  });


  it('calls onChange handler with the right arguments when changed', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<AppCheckbox id="test12" onChange={spy} />);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(spy.calledOnce).to.equal(true);
    expect(spy.calledWith('test12', true, true)).to.equal(true);
  });
});
