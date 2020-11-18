import React from 'react';
import styled from 'styled-components';

const RandomSearchStyles = styled.div`
  button {
    cursor: pointer;
    background-color: #ff6542;
    font-size: 20px;
    position: relative;
    left: 35%;
    top: 15px;
    border-radius: 0.25em;
    :hover {
      background-color: ${(p) => p.color};
    }
  }
`;

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
    return (
      <RandomSearchStyles color={'gold'}>
        <button onClick={this.searchRandom} type="button">
          Search Random Quote
        </button>
      </RandomSearchStyles>
    );
  }
}

export default RandomSearch;
