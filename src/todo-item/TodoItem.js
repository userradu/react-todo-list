import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
	function handleTodoItemStatusModified(event) {
		props.onTodoItemStatusModified({
			id: props.todoItem.id,
			status: event.target.checked ? 'Complete' : 'Incomplete'
		});
	}

	return (
		<div>
      <input
        type="checkbox"
        checked={props.todoItem.status === 'Complete'}
        onChange={handleTodoItemStatusModified} />
			<span className={props.todoItem.status === 'Complete' ? 'text-strike' : null}>
				{props.todoItem.name}
			</span>
		</div>
	);
}

export default TodoItem;
