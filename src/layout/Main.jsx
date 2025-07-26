import { MovieList } from '../components/MovieList'
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';
import { Button } from "@mui/material";

function Main ({ movieCollection = [], selectedType, onHandleKeyDown, onTypeChange, onExport, loading }) {

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

      {/* <Button
        onClick={onExport}
        variant="contained"
        disabled={movieCollection.length === 0}
        sx={{ marginTop: 2 }}
      >
        Скачать список фильмов
      </Button> */}
    </main>
  );
}

export { Main }