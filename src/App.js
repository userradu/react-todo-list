import React from 'react';
import AddTodoItem from './add-todo-item/AddTodoItem'
import TodoItemsList from './todo-items-list/TodoItemsList';
import SearchTodoItems from './search-todo-items/SearchTodoItems';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTodoItems: [],
      filteredTodoItems: [],
      searchedText: '',
      statusFilter: 'All',
      currentId: 0
    };
    this.addTodoItem = this.addTodoItem.bind(this);
    this.handleTodoItemStatusModified = this.handleTodoItemStatusModified.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleStatusFilterChanged = this.handleStatusFilterChanged.bind(this);
    this.filterConditionsFulfilled = this.filterConditionsFulfilled.bind(this);
  }

  addTodoItem(name) {
    const todoItem = {
      id: this.state.currentId + 1,
      name: name,
      status: 'Incomplete'
    };

    if (this.filterConditionsFulfilled(todoItem, this.state.searchedText, this.state.statusFilter)) {
      this.setState({
        allTodoItems: [...this.state.allTodoItems, todoItem],
        filteredTodoItems: [...this.state.filteredTodoItems, todoItem],
        currentId: this.state.currentId + 1
      });
    } else {
      this.setState({
        allTodoItems: [...this.state.allTodoItems, todoItem],
        currentId: this.state.currentId + 1
      });
    }
  }

  handleTodoItemStatusModified(todoItemData) {
    const allTodoItems = this.state.allTodoItems.map((todoItem) => {
      if (todoItem.id === todoItemData.id) {
        return {...todoItem, ...todoItemData};
      } else {
        return todoItem;
      }
    });

    const filteredTodoItems = allTodoItems.filter(todoItem =>
      this.filterConditionsFulfilled(todoItem, this.state.searchedText, this.state.statusFilter)
    );

    this.setState({
      allTodoItems: allTodoItems,
      filteredTodoItems: filteredTodoItems
    });
  }

  handleSearchInputChange(searchedText) {
    const filteredTodoItems = this.state.allTodoItems.filter(todoItem =>
      this.filterConditionsFulfilled(todoItem, searchedText, this.state.statusFilter)
    );

    this.setState({
      searchedText: searchedText,
      filteredTodoItems: filteredTodoItems
    });
  }

  filterConditionsFulfilled(todoItem, searchedText, status) {
    const includesSearchedText = todoItem.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
    const hasSelectedStatus = status === 'All' || todoItem.status === status;

    return includesSearchedText && hasSelectedStatus;
  }

  handleStatusFilterChanged(status) {
    const filteredTodoItems = this.state.allTodoItems.filter(todoItem =>
      this.filterConditionsFulfilled(todoItem, this.state.searchedText, status)
    );

    this.setState({
      statusFilter: status,
      filteredTodoItems: filteredTodoItems
    });
  }

  render() {
    return (
      <div className="App">
        <h4>React Todo List App</h4>
        <SearchTodoItems
          className="search-items-control"
          onSearchInputChange={this.handleSearchInputChange}
          statusFilter={this.state.statusFilter}
          onStatusFilterChanged={this.handleStatusFilterChanged} />

        <AddTodoItem onAddTodoItem={this.addTodoItem} />

        <TodoItemsList
          todoItems={this.state.filteredTodoItems}
          onTodoItemStatusModified={this.handleTodoItemStatusModified} />
      </div>
    );
  }
}

export default App;
