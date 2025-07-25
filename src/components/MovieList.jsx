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
            {
                sortedMovies
                    .filter(movie => !!movie.imdbID)
                    .map(movie => <MovieCard key={movie.imdbID} movie={movie} />)
            }
        </div>
    );
}

export { MovieList };

const style = {
    display: 'grid', // элементы внутри будут располагаться по сетке
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        // repeat(...) — повторение шаблона для колонок;
        // auto-fit — автоматически вставляет столько колонок, сколько влезет по ширине;
        // minmax(240px, 1fr) — каждая колонка:
        //  минимум 240px (чтобы не была слишком маленькой),
        //  максимум 1fr — т.е. растягивается равномерно, чтобы занять всё доступное место.
    gap: '2rem', // Отступ между ячейками сетки (и по вертикали, и по горизонтали).
    // padding: '2rem', // Внутренний отступ от краёв контейнера до сетки.
    backgroundColor: 'transparent', // Фон контейнера — прозрачный.
    boxSizing: 'border-box' // Задаёт способ вычисления размеров элемента
        // 'border-box': padding и border входят в width и height. Предотвращает "выпирание" блока за пределы контейнера.
};