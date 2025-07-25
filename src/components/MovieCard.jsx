import placeholderImage from '../assets/placeholder.png';

function MovieCard({ movie }) {
    const posterSrc = movie.Poster !== 'N/A' ? movie.Poster : placeholderImage;

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

export { MovieCard };


const cardStyle = {
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

const imageWrapperStyle = {
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

const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
};

const titleStyle = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textAlign: 'center'
};

const detailStyle = {
    fontSize: '0.9rem',
    textAlign: 'center',
    color: '#666'
};