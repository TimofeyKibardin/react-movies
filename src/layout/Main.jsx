import { MovieList } from '../components/MovieList'

function Main ({ movieCollection = [] }) {
  console.log(JSON.stringify(movieCollection));
    return (
    <main className="container main">
        <MovieList movieCollection={movieCollection}/>
    </main>
  );
}

export { Main }