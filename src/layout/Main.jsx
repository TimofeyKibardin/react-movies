import { MovieList } from '../components/MovieList'
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';

function Main ({ movieCollection = [], onHandleKeyDown }) {
    return (
    <main className="container main">
      <Search onHandleKeyDown={onHandleKeyDown} />
      {
        movieCollection.length ? (
          <MovieList movieCollection={movieCollection}/>
        ) : <Preloader />
      }
    </main>
  );
}

export { Main }