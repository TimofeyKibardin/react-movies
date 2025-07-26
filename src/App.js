import React from 'react';
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Main } from './layout/Main'
import movies_offline from './movies_offline.json' 

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
    const trimmedTitle = title.trim().toLowerCase();
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
      // this.setState({ error: error.message });
      console.warn('Ошибка запроса, пробуем подгрузить локальные данные...', error);

      try {
        const allData = Array.isArray(movies_offline.Search)
          ? movies_offline.Search
          : Array.isArray(movies_offline)
            ? movies_offline
            : [];

        const trimmedTitle = title.trim().toLowerCase();

        const filtered = allData.filter((movie) => {
          const titleMatch = movie.Title?.toLowerCase().includes(trimmedTitle);
          const typeMatch = type ? movie.Type === type : true;
          return titleMatch && typeMatch;
        });

        console.log('Filtered:', filtered);

        this.setState({
          movieCollection: filtered,
          loading: false,
        });
      } catch (fallbackError) {
        console.warn('Ошибка загрузки локального файла:', fallbackError);
        this.setState({ movieCollection: [], loading: false});
      }
    }
  }
  
  exportToFile = () => {
    const { movieCollection } = this.state;

    if (!movieCollection || movieCollection.length === 0) {
      alert("Нет данных для экспорта");
      return;
    }

    const blob = new Blob([JSON.stringify(movieCollection, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `movies_${new Date().toISOString().slice(0,10)}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

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
          onExport={this.exportToFile}
          loading={loading}
        />
        <Footer />
      </React.Fragment>
    )
  }
}