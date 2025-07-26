import { MovieCard } from './MovieCard'

function MovieList({ movieCollection = [] }) {
    // Сортировка по году (по убыванию: от новых к старым)
    const sortedMovies = [...movieCollection].sort((a, b) => {
        const yearA = parseInt(a.Year) || 0;
        const yearB = parseInt(b.Year) || 0;
        return yearB - yearA;
    });

  
    return (
        <div style={style}>
            {sortedMovies.length ?
                    (sortedMovies
                        .filter(movie => !!movie.imdbID)
                        .map(movie => <MovieCard key={movie.imdbID} movie={movie} />))
                    : <h4>Nothing found...</h4>
            }
        </div>
    );
}

export { MovieList };

const style = {
    display: 'grid', // элементы внутри будут располагаться по сетке
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 240px))',
    gap: '2rem', // Отступ между ячейками сетки (и по вертикали, и по горизонтали).
    backgroundColor: 'transparent', // Фон контейнера — прозрачный.
    boxSizing: 'border-box' // Задаёт способ вычисления размеров элемента
};