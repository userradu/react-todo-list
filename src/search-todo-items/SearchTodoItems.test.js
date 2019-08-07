import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import SearchTodoItems from './SearchTodoItems';
import StatusFilter from '../status-filter/StatusFilter';

describe('SearchTodoItems', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(<SearchTodoItems
        onSearchInputChange={() => { }}
        statusFilter="All"
        className="className"
        onStatusFilterChanged={() => { }} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('sets the state with the updated input value', () => {
    const searchValue = 'search value';

    const wrapper = shallow(<SearchTodoItems
      onSearchInputChange={() => { }}
      statusFilter="All"
      className="className"
      onStatusFilterChanged={() => { }} />);

    expect(wrapper.state().searchedText).toEqual('');

    const input = wrapper.find('input');
    input.simulate('change', {
      target: { value: searchValue }
    });

    expect(wrapper.state().searchedText).toEqual(searchValue);
  })

  it('calls props.onSearchInputChange() with the correct arguments', () => {
    const onSearchInputChange = sinon.spy();
    const searchValue = 'search value';

    const wrapper = shallow(<SearchTodoItems
      onSearchInputChange={onSearchInputChange}
      statusFilter="All"
      className="className"
      onStatusFilterChanged={() => { }} />);

    const input = wrapper.find('input');
    input.simulate('change', {
      target: { value: searchValue }
    });
    expect(onSearchInputChange.called).toBe(true);
    expect(onSearchInputChange.calledWith(searchValue)).toBe(true);
  });

  it('creates a StatusFilter component for each status filter option', () => {
    const wrapper = shallow(<SearchTodoItems
      onSearchInputChange={() => { }}
      statusFilter="All"
      className="className"
      onStatusFilterChanged={() => { }} />);

    expect(wrapper.find(StatusFilter)).toHaveLength(wrapper.instance().statusFilterOptions.length);
  });

});
