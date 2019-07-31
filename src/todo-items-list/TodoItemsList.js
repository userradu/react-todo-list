import React from 'react';
import TodoItem from '../todo-item/TodoItem';
import './TodoItemsList.css';

function TodoItemsList(props) {
	const todoItems = props.todoItems.map((todoItem) =>
		<TodoItem
			key={todoItem.id}
			todoItem={todoItem}
			onTodoItemStatusModofied={props.onTodoItemStatusModofied} />
	);

	return (
		<div className="todo-items-list-section">
			<ul>{todoItems}</ul>
		</div>
	);
}

export default TodoItemsList;