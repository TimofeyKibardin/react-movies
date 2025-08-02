import { MovieList } from '../components/MovieList'
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';
import { ApiItem } from '../types/ApiItem';

// Пропсы компонента Main
interface MainProps {
    movieCollection: ApiItem[];
    selectedType: string;
    onHandleKeyDown: (title: string) => void;
    onTypeChange: (type: string) => void;
    loading: boolean;
}

export function Main({
    movieCollection = [],
    selectedType,
    onHandleKeyDown,
    onTypeChange,
    loading,
}: MainProps) {

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