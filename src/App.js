import React from 'react';
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Main } from './layout/Main'

export default class App extends React.Component {
  state = {
    movieCollection: [],
    error: '',
    movieFilter: 'Code Geass'
  }

  fetchData = async (title = this.state.movieFilter) => {
    const trimmedTitle = title.trim();
    if (trimmedTitle === '') {
      this.setState({ movieCollection: [], error: 'Введите название фильма' });
      return;
    }

    try {
      const queryString = new URLSearchParams({
        apikey: process.env.REACT_APP_MOVIES_API_KEY,
        s: trimmedTitle
      }).toString();

      console.log(queryString);

      const response = await fetch(
        `http://www.omdbapi.com/?${queryString}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.Response === 'False') {
        this.setState({ movieCollection: [], error: data.Error });
      } else {
        this.setState({ movieCollection: data.Search, error: '' });
      }

    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  handleKeyDown = (query) => {
    this.setState({movieFilter: query}, () => {
      this.fetchData(query);
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { movieCollection } = this.state;

    return (
      <React.Fragment>
        <Header />
        <Main movieCollection={movieCollection} onHandleKeyDown={this.handleKeyDown} />
        <Footer />
      </React.Fragment>
    )
  }
}