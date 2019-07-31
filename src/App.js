import React from 'react';
import AddTodoItem from './add-todo-item/AddTodoItem'
import TodoItemsList from './todo-items-list/TodoItemsList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoItems: [], currentId: 0 };
    this.addTodoItem = this.addTodoItem.bind(this);
    this.handleTodoItemStatusModified = this.handleTodoItemStatusModified.bind(this);
  }

  addTodoItem(name) {
    const todoItem = {
      id: this.state.currentId + 1,
      name: name,
      completed: false
    };
    this.setState({
      todoItems: this.state.todoItems.concat(todoItem),
      currentId: this.state.currentId + 1
    });
  }

  handleTodoItemStatusModified(todoItemData) {
    const todoItems = this.state.todoItems.map((todoItem) => {
      if (todoItem.id === todoItemData.id) {
        return Object.assign(todoItem, todoItemData);
      } else {
        return todoItem;
      }
    });

    this.setState({
      todoItems: todoItems
    });
  }

  render() {
    return (
      <div className="App">
        <AddTodoItem onAddTodoItem={this.addTodoItem}/>
        <TodoItemsList 
          todoItems={this.state.todoItems}
          onTodoItemStatusModofied={this.handleTodoItemStatusModified}/>
      </div>
    );
  }
}

export default App;
