import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      character: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchRandom = this.searchByChar.bind(this);
    this.searchByChar = this.searchByChar.bind(this);
  }

  handleChange(e) {
    this.setState({
      character: e.target.value,
    });
  }

  searchRandom() {}

  searchByChar() {
    const { onSearch } = this.props;
    const { character } = this.state;
    onSearch(character);
  }

  render() {
    const { character } = this.state;

    return (
      <div>
        <button onClick={this.searchRandom} type="button">
          Search Random Quote
        </button>
      </div>
    );
  }
}

export default Search;
