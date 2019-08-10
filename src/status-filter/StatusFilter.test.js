import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import StatusFilter from './StatusFilter';

describe('<StatusFilter />', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <StatusFilter
        className="customClass"
        currentStatus="All"
        status="All"
        onStatusFilterChanged={() => { }} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls prop.onStatusFilterChanged() with prop.status as argument', () => {
    const onStatusFilterChanged = sinon.spy();
    const status = 'All';

    const wrapper = shallow(<StatusFilter
      className="customClass"
      currentStatus="All"
      status={status}
      onStatusFilterChanged={onStatusFilterChanged} />);

    wrapper.find('button').simulate('click');

    expect(onStatusFilterChanged.calledWith(status)).toBe(true);
  });

  it("it doesn't add the 'selected' class if the current status is equal to its own status", () => {
    const wrapper = shallow(<StatusFilter
      className="customClass"
      currentStatus="All"
      status="Complete"
      onStatusFilterChanged={() => { }} />);

    expect(wrapper.find('button').hasClass('selected')).toBe(false);
  });

  it("it adds the 'selected' class if the current status is equal to its own status", () => {
    const wrapper = shallow(<StatusFilter
      className="customClass"
      currentStatus="All"
      status="All"
      onStatusFilterChanged={() => { }} />);

    expect(wrapper.find('button').hasClass('selected')).toBe(true);
  });

});
