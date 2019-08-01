import React from 'react';

class SearchTodoItems extends React.Component {
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
      return (
        <div>
          <input
            type="text"
            placeholder="Search"
            value={this.state.searchedText}
            className={this.props.className}
            onChange={this.handleSearchInputChange}/>
        </div>
      );
    }
}

export default SearchTodoItems;
