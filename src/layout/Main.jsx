import { MovieList } from '../components/MovieList'
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';

function Main ({ movieCollection = [], selectedType, onHandleKeyDown, onTypeChange, loading }) {

    return (
    <main className="container main">
      <Search
          onHandleKeyDown={onHandleKeyDown}
          onTypeChange={onTypeChange}
          selectedType={selectedType}
      />
      {
          loading ?
            <Preloader />
            : <MovieList movieCollection={movieCollection}/>
      }
    </main>
  );
}

export { Main }