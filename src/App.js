import React from 'react';
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Main } from './layout/Main'

export default class App extends React.Component {
  state = {
    movieCollection: [],
    error: '',
    movieFilter: '',
    movieType: '',
    loading: true
  }

  componentDidMount() {
    const savedFilter = localStorage.getItem('lastSearch');
      if (!!savedFilter && savedFilter.trim() !== '') {
        this.setState({ movieFilter: savedFilter }, () => {
          this.fetchData(savedFilter, this.state.movieType);
        });
      } else {
        this.fetchData('Code Geass');
      }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieFilter !== this.state.movieFilter) {
        localStorage.setItem('lastSearch', this.state.movieFilter);
    }
  }

  fetchData = async (title = this.state.movieFilter, type = this.state.movieType) => {
    this.setState({loading: true});
    const trimmedTitle = title.trim();
    if (trimmedTitle === '') {
      this.setState({ movieCollection: [], error: 'Введите название фильма' });
      return;
    }

    try {
      const queryString = new URLSearchParams({
        apikey: process.env.REACT_APP_MOVIES_API_KEY,
        s: trimmedTitle,
        type: type
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
        this.setState({ movieCollection: [], loading: false });
      } else {
        this.setState({ movieCollection: data.Search, loading: false });
      }

    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  handleKeyDown = (query) => {
    this.setState({movieFilter: query}, () => {
      this.fetchData(query, this.state.movieType);
    });
  }

  handleTypeChange = (type) => {
    this.setState({ movieType: type }, () => {
      this.fetchData(this.state.movieFilter, type);
    });
  }


  render() {
    const { movieCollection, movieType, loading } = this.state;

    return (
      <React.Fragment>
        <Header />
        <Main
          movieCollection={movieCollection}
          selectedType={movieType}
          onHandleKeyDown={this.handleKeyDown}
          onTypeChange={this.handleTypeChange}
          loading={loading}
        />
        <Footer />
      </React.Fragment>
    )
  }
}