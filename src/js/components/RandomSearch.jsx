import React from 'react';

class RandomSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      character: '',
    };
    // this.handleChange = this.handleChange.bind(this);
    this.searchRandom = this.searchRandom.bind(this);
  }

  searchRandom() {
    const { onSearch } = this.props;
    onSearch();
  }

  render() {
    const { character } = this.state;
    console.log('here', this.props.showSaveButton);
    return (
      <div>
        <button
          style={{ cursor: 'pointer' }}
          onClick={this.searchRandom}
          type="button"
        >
          Search Random Quote
        </button>
      </div>
    );
  }
}

export default RandomSearch;
