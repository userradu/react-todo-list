import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TodoItem from './TodoItem';

describe('TodoItem', () => {

  it('renders correctly', () => {
    const todoItem = {
      id: 1,
      name: 'todo item',
      status: 'Complete'
    };

    const tree = renderer.create(
      <TodoItem
        onTodoItemStatusModified={() => {}}
        todoItem={todoItem} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls props.onTodoItemStatusModified() with the correct arguments when the checkbox is checked', () => {
    const onTodoItemStatusModified = sinon.spy();
    const todoItem = {
      id: 1,
      name: 'todo item',
      status: 'Complete'
    };

    const wrapper = shallow(<TodoItem
      onTodoItemStatusModified={onTodoItemStatusModified}
      todoItem={todoItem} />);

    const input = wrapper.find('input');
    input.simulate('change', {
      target: { checked: true }
    });

    expect(onTodoItemStatusModified.called).toBe(true);
    expect(onTodoItemStatusModified.calledWith({
      id: todoItem.id,
      status: 'Complete'
    })).toBe(true);
  });

  it('calls props.onTodoItemStatusModified() with the correct arguments when the checkbox is unchecked', () => {
    const onTodoItemStatusModified = sinon.spy();
    const todoItem = {
      id: 1,
      name: 'todo item',
      status: 'Complete'
    };

    const wrapper = shallow(<TodoItem
      onTodoItemStatusModified={onTodoItemStatusModified}
      todoItem={todoItem} />);

    const input = wrapper.find('input');
    input.simulate('change', {
      target: { checked: false }
    });

    expect(onTodoItemStatusModified.called).toBe(true);
    expect(onTodoItemStatusModified.calledWith({
      id: todoItem.id,
      status: 'Incomplete'
    })).toBe(true);
  });

  it('sets the checkbox as checked when the status is "Complete"', () => {
    const todoItem = {
      id: 1,
      name: 'todo item',
      status: 'Complete'
    };

    const wrapper = shallow(<TodoItem
      onTodoItemStatusModified={() => {}}
      todoItem={todoItem} />);

    const input = wrapper.find('input');
    expect(input.props().checked).toBe(true);
  });

  it('sets the checkbox as unchecked when the status is "Incomplete"', () => {
    const todoItem = {
      id: 1,
      name: 'todo item',
      status: 'Incomplete'
    };

    const wrapper = shallow(<TodoItem
      onTodoItemStatusModified={() => {}}
      todoItem={todoItem} />);

    const input = wrapper.find('input');
    expect(input.props().checked).toBe(false);
  });

});
