import React from 'react';
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Main } from './layout/Main'

export default class App extends React.Component {
  state = {
    movieCollection: [],
    error: '',
    defaultMovieFilter: 'The Godfather'
  }

  fetchData = async () => {
    try {
      const queryString = new URLSearchParams({
        apikey: process.env.REACT_APP_MOVIES_API_KEY,
        s: this.state.defaultMovieFilter,
        plot: 'full'
      }).toString();

      const response = await fetch(
        `http://www.omdbapi.com/?${queryString}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.setState({movieCollection: data.Search });

    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { movieCollection } = this.state;

    return (
      <React.Fragment>
        <Header />
        <Main movieCollection={movieCollection} />
        <Footer />
      </React.Fragment>
    )
  }
}