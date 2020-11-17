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
      showButton: false,
    };

    this.showByUser = this.showByUser.bind(this);
    this.searchRandom = this.searchRandom.bind(this);
    this.saveQuote = this.saveQuote.bind(this);
    this.showAllFaves = this.showAllFaves.bind(this);
    this.deleteFromFaves = this.deleteFromFaves.bind(this);
  }

  componentDidMount() {
    axios.post('http://localhost:8080/').then((response) => {
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
    if (this.state.showButton === true) {
      this.setState({
        showButton: !this.state.showButton,
        faves: this.state.faves,
      });
    }
    axios
      .post('http://localhost:8080/save', { data: data })
      .then((response) => {
        this.setState({
          faves: response.data,
        });
      });
  }

  deleteFromFaves(quoteObj) {
    axios
      .delete('http://localhost:8080/delete', {
        data: { quoteObj },
      })
      .then((response) => {
        console.log(response.data);
        console.log('Quote Has Been Deleted');
        this.setState({
          faves: response.data,
        });
      });
  }

  showAllFaves() {
    axios.post('http://localhost:8080/').then((response) => {
      this.setState({
        faves: response.data.faves,
      });
    });
    this.setState({
      showButton: false,
    });
  }

  showByUser(user) {
    this.setState({
      showButton: true,
    });
    axios
      .post('http://localhost:8080/showByUser', { user: user })
      .then((response) => {
        this.setState({
          faves: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
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
          showButton={this.state.showButton}
          showAllFaves={this.showAllFaves}
        />
        {this.state.faves.length > 0 ? (
          <FaveQuotesList
            faves={this.state.faves}
            showByUser={this.showByUser}
            deleteFromFaves={this.deleteFromFaves}
          />
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
