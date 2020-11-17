import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RandomSearch from './RandomSearch.jsx';
import { FaveQuotesList } from './FaveQuotes.jsx';
import QuoteData from './QuoteData.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomQuote: '',
      faves: [],
    };

    // this.handleChange = this.handleChange.bind(this);
    this.searchRandom = this.searchRandom.bind(this);
    this.saveQuote = this.saveQuote.bind(this);
  }

  componentDidMount() {
    axios.post('http://localhost:8080/').then((response) => {
      console.log(response.data);
      this.setState({
        randomQuote: response.data,
        faves: response.data.faves,
      });
    });
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.randomQuote !== this.state.randomQuote) {
      this.setState({
        randomQuote: this.state.randomQuote,
      });

      if (prevState.faves.length !== this.state.faves.length) {
        this.setState({
          faves: this.state.faves,
        });
      }
    }
  }

  saveQuote(data) {
    axios
      .post('http://localhost:8080/save', { data: data })
      .then((response) => {
        console.log('hahaha', response);
        this.setState({
          faves: response.data,
        });
        console.log(this.state.faves, 'sjjsjsjsjsjsjs');
      });
  }

  searchRandom() {
    axios.post('http://localhost:8080/').then((response) => {
      this.setState({
        randomQuote: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>The Office Random Quote Generator</h1>
        <RandomSearch onSearch={this.searchRandom} />
        <QuoteData
          randomQuote={this.state.randomQuote}
          saveQuote={this.saveQuote}
        />
        {this.state.faves.length > 0 ? (
          <FaveQuotesList faves={this.state.faves} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
export default App;
