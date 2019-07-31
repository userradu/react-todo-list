import React from 'react';
import './AddTodoItem.css';

class AddTodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {itemName: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		this.setState({itemName: event.target.value});
	}

	handleClick() {
		if (this.state.itemName !== '') {
			this.props.onAddTodoItem(this.state.itemName);
			this.setState({itemName: ''});
		}
	}

	render() {
		return (
			<div className="add-todo-section">
				<input type="text" value={this.state.itemName} onChange={this.handleChange}/>
				<button onClick={this.handleClick}>Add</button>
			</div>
		);
	}
}

export default AddTodoItem;