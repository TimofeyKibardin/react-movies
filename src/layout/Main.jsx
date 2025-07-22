import { MovieList } from '../components/MovieList'

function Main ({ movieCollection = [] }) {
    return (
    <main className="container main">
        <MovieList movieCollection={movieCollection}/>
      {/* {movies.length ? (
        movieCollection.map((movie) => (
          <div key={movie.imdbID} className="card">
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} style={{ width: '200px' }} />
          </div>
        ))
      ) : (
        <h3>Nothing found</h3>
      )} */}
    </main>
  );
}

export { Main }