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
      currentId: 0
    };
    this.addTodoItem = this.addTodoItem.bind(this);
    this.handleTodoItemStatusModified = this.handleTodoItemStatusModified.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.filterTodoItems = this.filterTodoItems.bind(this);
  }

  addTodoItem(name) {
    const todoItem = {
      id: this.state.currentId + 1,
      name: name,
      completed: false
    };

    this.setState({
      allTodoItems: this.state.allTodoItems.concat(todoItem),
      currentId: this.state.currentId + 1
    }, this.filterTodoItems);
  }

  handleTodoItemStatusModified(todoItemData) {
    const allTodoItems = this.state.allTodoItems.map((todoItem) => {
      if (todoItem.id === todoItemData.id) {
        return Object.assign(todoItem, todoItemData);
      } else {
        return todoItem;
      }
    });

    this.setState({
      allTodoItems: allTodoItems
    });
  }

  handleSearchInputChange(searchedText) {
    this.setState({
      searchedText: searchedText
    }, this.filterTodoItems);
  }

  filterTodoItems() {
    const flteredTodoItems = this.state.allTodoItems.filter(todoItem =>
      todoItem.name.toLowerCase().indexOf(this.state.searchedText.toLowerCase()) > -1
    );

    this.setState({
      filteredTodoItems: flteredTodoItems
    });
  }

  render() {
    return (
      <div className="App">
        <h4>React Todo List App</h4>
        <SearchTodoItems
          className="search-items-control"
          onSearchInputChange={this.handleSearchInputChange} />

        <AddTodoItem onAddTodoItem={this.addTodoItem} />

        <TodoItemsList
          todoItems={this.state.filteredTodoItems}
          onTodoItemStatusModofied={this.handleTodoItemStatusModified} />
      </div>
    );
  }
}

export default App;
