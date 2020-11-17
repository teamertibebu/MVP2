import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import axios from 'axios';
import VideoListEntry from './VideoListEntry.jsx';

class App extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      videos: [],
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.videos !== this.state.videos) {
      console.log('prev', prevState.videos);
      console.log('now', this.state.videos);
      this.setState({
        videos: this.state.videos,
      });
    }
  }

  // handleChange(event) {
  //   const { value } = event.target;
  //   this.setState(() => {
  //     return {
  //       videos,
  //     };
  //   });
  // }

  handleSearch(showTitle) {
    axios
      .post('http://localhost:8080/', {
        showTitle,
      })
      .then((response) => {
        console.log('hello', response.data);
        this.setState({
          videos: response.data,
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Scenes From the Dead</h1>
        <Search onSearch={this.handleSearch} />
        <VideoListEntry videos={this.state.videos} />
      </div>
    );
  }
}

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
export default App;
