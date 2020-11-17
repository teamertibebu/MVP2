import React from 'react';

class RandomSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      character: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchRandom = this.searchRandom.bind(this);
    // this.searchByChar = this.searchByChar.bind(this);
  }

  handleChange(e) {
    // this.setState({
    //   character: e.target.value,
    // });
    // console.log(this.state.character);
  }

  // searchRandom() {}

  searchRandom() {
    const { onSearch } = this.props;
    onSearch();
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

export default RandomSearch;
