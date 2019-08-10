import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {

  describe('filterConditionsFulfilled()', () => {

    it('should return true when the name contains the searched text and the status is "All"', () => {
      const todoItem = {
        id: 1,
        name: 'todo item name',
        status: 'Complete'
      };
      const wrapper = shallow(<App />);
      expect(wrapper.instance().filterConditionsFulfilled(todoItem, 'item', 'All')).toBe(true);
    });

    it("should return true when the name contains the searched text and the item's status matches the currently selected one", () => {
      const todoItem = {
        id: 1,
        name: 'todo item name',
        status: 'Complete'
      };
      const wrapper = shallow(<App />);
      expect(wrapper.instance().filterConditionsFulfilled(todoItem, 'item', 'Complete')).toBe(true);
    });

    it("should return false when the name doesn't contain the searched text", () => {
      const todoItem = {
        id: 1,
        name: 'todo item name',
        status: 'Complete'
      };
      const wrapper = shallow(<App />);
      expect(wrapper.instance().filterConditionsFulfilled(todoItem, 'searched text', 'All')).toBe(false);
    });

    it("should return false when the item's status is different from the selected status", () => {
      const todoItem = {
        id: 1,
        name: 'todo item name',
        status: 'Complete'
      };
      const wrapper = shallow(<App />);
      expect(wrapper.instance().filterConditionsFulfilled(todoItem, 'name', 'Incomplete')).toBe(false);
    });

  });

  describe('handleSearchInputChange()', () => {

    it('should modify the searchedText and the filteredTodoItems from the state', () => {
      const allTodoItems = [
        { id: 1, name: 'learn react', status: 'Complete' },
        { id: 2, name: 'learn enzyme', status: 'Incomplete' },
        { id: 3, name: 'learn sinin', status: 'Incomplete' }
      ];

      const wrapper = shallow(<App />);

      wrapper.setState({
        allTodoItems: allTodoItems,
        statusFilter: 'All'
      });

      wrapper.instance().handleSearchInputChange('react');

      expect(wrapper.state('filteredTodoItems')).toEqual([allTodoItems[0]]);
    });

  });

});
