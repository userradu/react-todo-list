import React from 'react';
import AddTodoItem from './AddTodoItem';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('AddTodoItem', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(<AddTodoItem onAddTodoItem={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls props.onAddTodoItem()', () => {
    const onAddTodoItem = sinon.spy();
    const wrapper = shallow(<AddTodoItem onAddTodoItem={onAddTodoItem} />);
    const input = wrapper.find('input');
    input.simulate('change', {
      target: { value: 'todoItemName' }
    });
    wrapper.find('button').simulate('click');
    expect(onAddTodoItem.called).toBe(true);
  });

  it('clears the input after calling props.onAddTodoItem()', () => {
    const wrapper = shallow(<AddTodoItem onAddTodoItem={() => {}} />);
    const input = wrapper.find('input');
    input.simulate('change', {
      target: { value: 'todoItemName' }
    });
    wrapper.find('button').simulate('click');
    expect(wrapper.state().itemName).toEqual('');
  });

  it("doesn't call props.onAddTodoItem() when the todo item name is empty", () => {
    const onAddTodoItem = sinon.spy();
    const wrapper = shallow(<AddTodoItem onAddTodoItem={onAddTodoItem} />);
    wrapper.find('button').simulate('click');
    expect(onAddTodoItem.called).toBe(false);
  });

});
