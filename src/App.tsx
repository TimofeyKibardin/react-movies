import React, { useEffect, useState } from 'react';
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Main } from './layout/Main'
import { ApiItem } from './types/ApiItem';

interface MoviesApiResponse {
    Search?: ApiItem[];
    totalResults?: string;
    Response: 'True' | 'False';
    Error?: string;
}

export default function App() {
    const defaultFilters = {
        movie: 'Code Geass',
        type: 'all'
    }

    const [movieCollection, setMovieCollection] = useState<ApiItem[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [movieFilter, setMovieFilter] = useState<string>(() => {
        const savedTitleFilter = localStorage.getItem('lastTitleSearch');
        return savedTitleFilter && savedTitleFilter.trim() !== ''
            ? savedTitleFilter
            : defaultFilters.movie;
    });
    const [movieType, setMovieType] = useState<string>(() => {
        const savedTypeFilter = localStorage.getItem('lastTypeSearch');
        return savedTypeFilter && savedTypeFilter.trim() !== ''
            ? savedTypeFilter
            : defaultFilters.type;
    });

    // componentDidMount()
    useEffect(() => {
        fetchData(movieFilter, movieType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieFilter, movieType]);

    // componentDidUpdate(movieFilter)
    useEffect(() => {
        localStorage.setItem('lastTitleSearch', movieFilter);
    }, [movieFilter]);

    // componentDidUpdate(movieType)
    useEffect(() => {
        localStorage.setItem('lastTypeSearch', movieType);
    }, [movieType]);


    const fetchData = async (movieFilter: string, movieType: string) => {
        setLoading(true);
        setError('');

        // Пустое название фильма
        const trimmedTitle = movieFilter.trim().toLowerCase();
        if (trimmedTitle === '') {
            setMovieCollection([]);
            setError('Введите название фильма');
            setLoading(false);
            return;
        }

        try {
            const queryString = new URLSearchParams({
                apikey: `${process.env.REACT_APP_MOVIES_API_KEY ?? ''}`,
                s: String(trimmedTitle),
                type: String(movieType)
            }).toString();
            
            console.log(queryString);

            const response = await fetch(
                `http://www.omdbapi.com/?${queryString}`
            );

            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }

            const data: MoviesApiResponse = await response.json();

            if (data.Response === 'False') {
                setMovieCollection([]);
                setError(data.Error || 'Фильмы не найдены');
            } else {
                setMovieCollection(data.Search || []);
            }

        } catch (e) {
            const message = e instanceof Error ? e.message : String(e);
            setError(message);
            console.warn('Ошибка запроса...', error);
        } finally {
            setLoading(false);
        }
    }

    const handleTitleChange = (title: string) => {
        setMovieFilter(title);
        fetchData(movieFilter, movieType);
    };

    const handleTypeChange = (type: string) => {
        setMovieType(type);
        fetchData(movieFilter, movieType);
    };

    return (
        <React.Fragment>
            <Header />
            <Main
                movieCollection={movieCollection}
                selectedType={movieType}
                onHandleKeyDown={handleTitleChange}
                onTypeChange={handleTypeChange}
                loading={loading}
            />
            <Footer />
        </React.Fragment>
    );
}