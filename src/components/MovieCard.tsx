import placeholderImage from '../assets/placeholder.png';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const posterSrc: string = movie.Poster && movie.Poster !== 'N/A'
        ? movie.Poster
        : placeholderImage;

    return (
        <div style={cardStyle}>
            <div style={imageWrapperStyle}>
                <img
                    src={posterSrc}
                    alt={movie.Title}
                    style={imageStyle}
                />
            </div>
            <div style={titleStyle}>{movie.Title}</div>
            <div style={detailStyle}>{movie.Type}</div>
            <div style={detailStyle}>Year: {movie.Year || '-'}</div>
        </div>
  );
}


const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1rem',
    color: '#333',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease',
    overflow: 'hidden',
    height: '100%' // карточка растягивается до высоты grid-ячейки
  };

const imageWrapperStyle: React.CSSProperties = {
    width: '100%',
    height: '350px',
    overflow: 'hidden',
    borderRadius: '8px',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
};

const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
};

const titleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textAlign: 'center'
};

const detailStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    textAlign: 'center',
    color: '#666'
};