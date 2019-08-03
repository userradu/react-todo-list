import React from 'react';
import StatusFilter from '../StatusFilter/StatusFilter';
import './SearchTodoItems.css';

class SearchTodoItems extends React.Component {
    statusFilterOptions = ['All', 'Incomplete', 'Complete'];

    constructor(props) {
      super(props);
      this.state = {searchedText: ''};
      this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    handleSearchInputChange(event) {
      const searchedText = event.target.value;
      this.setState({
        searchedText: searchedText
      });
      this.props.onSearchInputChange(searchedText);
    }

    render() {
      const statusFilterItems = this.statusFilterOptions.map((option) =>
        <StatusFilter
          key={option}
          status={option}
          currentStatus={this.props.statusFilter}
          className="status-filter"
          onStatusFilterChanged={this.props.onStatusFilterChanged}/>
      );

      return (
        <div>
          <input
            type="text"
            placeholder="Search"
            value={this.state.searchedText}
            className={this.props.className}
            onChange={this.handleSearchInputChange}/>

            {statusFilterItems}
        </div>
      );
    }
}

export default SearchTodoItems;
