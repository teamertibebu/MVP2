import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RandomSearch from './RandomSearch.jsx';
import { FaveQuotesList } from './FaveQuotes.jsx';
import QuoteData from './QuoteData.jsx';
import axios from 'axios';
import FavesCount from './FavesCount.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomQuote: '',
      faves: [],
      showButton: false,
      showSaveButton: true,
      character: '',
      count: 0,
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
        count: this.state.faves.length,
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
        // showButton: !this.state.showButton,
        faves: this.state.faves,
      });
    }
    axios
      .post('http://localhost:8080/save', {
        data: data,
        showButton: this.state.showButton,
      })
      .then((response) => {
        let count = ++this.state.count;
        console.log(count);

        this.setState({
          faves: response.data,
          count: count,
        });
      });
  }

  deleteFromFaves(quoteObj) {
    let showButtonBool = this.state.showButton;
    let count = --this.state.count;

    axios
      .delete('http://localhost:8080/delete', {
        data: { quoteObj, showButtonBool },
      })
      .then((response) => {
        this.setState({
          faves: response.data.remainingQuotes,
          count: count,
          showSaveButton: true,
          showButton: false,
        });

        if (response.data.mainList) {
          this.setState({
            showButton: false,
            character: '',
            count: count,
            showSaveButton: true,
          });
        }
      });
  }

  showAllFaves() {
    this.setState({
      character: '',
      showSaveButton: true,
    });
    axios.post('http://localhost:8080/').then((response) => {
      this.setState({
        faves: response.data.faves,
      });
    });
    this.setState({
      showButton: false,
      showSaveButton: true,
    });
  }

  showByUser(user) {
    this.setState({
      showButton: true,
      character: user.character,
      showSaveButton: false,
    });
    axios
      .post('http://localhost:8080/showByUser', { user: user })
      .then((response) => {
        this.setState({
          faves: response.data,
          showSaveButton: false,
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
        <RandomSearch
          onSearch={this.searchRandom}
          showSaveButton={this.state.showSaveButton}
        />
        <QuoteData
          showSaveButton={this.state.showSaveButton}
          randomQuote={this.state.randomQuote}
          saveQuote={this.saveQuote}
          showButton={this.state.showButton}
          showAllFaves={this.showAllFaves}
        />
        <FavesCount count={this.state.count} />
        {this.state.faves.length > 0 ? (
          <FaveQuotesList
            character={this.state.character}
            faves={this.state.faves}
            showByUser={this.showByUser}
            deleteFromFaves={this.deleteFromFaves}
            count={this.state.count}
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
