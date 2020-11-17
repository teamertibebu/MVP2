import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTitle: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      showTitle: e.target.value,
    });
  }

  handleClick() {
    const { onSearch } = this.props;
    const { showTitle } = this.state;

    onSearch(showTitle);
  }

  render() {
    const { showTitle } = this.state;
    // console.log(showTitle);

    return (
      <div>
        <input value={showTitle} onChange={this.handleChange} />
        <button onClick={this.handleClick} type="button">
          Search Deleted Scenes
        </button>
      </div>
    );
  }
}

export default Search;
