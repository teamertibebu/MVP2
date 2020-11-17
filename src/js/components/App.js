import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import RandomQuote from './RandomQuote.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomQuote: '',
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.saveQuote = this.saveQuote.bind(this);
  }

  componentDidMount() {
    axios.post('http://localhost:8080/').then((response) => {
      this.setState({
        randomQuote: response.data,
      });
    });
  }

  // componentDidUpdate(prevProp, prevState) {
  //   if (prevState.randomQuote !== this.state.randomQuote) {
  //     this.setState({
  //       randomQuote: this.state.randomQuote,
  //     });
  //   }
  // }

  saveQuote(data) {
    console.log('innnnnn', data);
    axios
      .post('http://localhost:8080/save', { data: data })
      .then((response) => {
        console.log('axios');
      });
  }

  handleSearch(character) {
    axios
      .post('http://localhost:8080/', {
        character,
      })
      .then((response) => {
        this.setState({
          randomQuote: response.data,
        });
      });
  }

  render() {
    return (
      <div>
        <h1>The Office Random Quote Generator</h1>
        <Search onSearch={this.handleSearch} />
        <RandomQuote
          randomQuote={this.state.randomQuote}
          saveQuote={this.saveQuote}
        />
      </div>
    );
  }
}

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
export default App;
