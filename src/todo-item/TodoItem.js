import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
	function handleTodoItemStatusModified(event) {
		props.onTodoItemStatusModified({
			id: props.todoItem.id,
			completed: event.target.checked
		});
	}

	return (
		<div>
			<input type="checkbox" checked={props.todoItem.completed} onChange={handleTodoItemStatusModified} />
			<span className={props.todoItem.completed ? 'text-strike' : null}>
				{props.todoItem.name}
			</span>
		</div>
	);
}

export default TodoItem;
