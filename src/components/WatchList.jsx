import { Link } from "react-router-dom";
import WatchListMovie from "./WatchListMovie";

export default function WatchList({ movies, removeFromWatchList }) {
  const movieList = movies.filter((m) => m.title);
  const seriesList = movies.filter((m) => m.name);

  return (
    <div className="container py-3 watch-list" style={{ minHeight: "100vh" }}>
      <h1 className="mb-4 h3">İzleme Listem</h1>

      {/* Filmler */}
      <h2 className="mb-3 h5">Filmler</h2>
      {movieList.length === 0 ? (
        <div className="mb-4">Film bulunamadı</div>
      ) : (
        <div
          id="movie-list"
          className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-1 g-lg-3 mb-4"
        >
          {movieList.map((m, index) => (
            <div key={`movie-link-${index}`} className="col">
              <Link to={`/movies/${m.id}`} style={{ textDecoration: "none" }}>
                <WatchListMovie
                  movieObj={m}
                  removeFromWatchList={removeFromWatchList}
                />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Diziler */}
      <h2 className="mb-3 h5">Diziler</h2>
      {seriesList.length === 0 ? (
        <div>Dizi bulunamadı</div>
      ) : (
        <div
          id="series-list"
          className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-1 g-lg-3"
        >
          {seriesList.map((s, index) => (
            <div key={`series-link-${index}`} className="col">
              <Link to={`/series/${s.id}`} style={{ textDecoration: "none" }}>
                <WatchListMovie
                  movieObj={s}
                  removeFromWatchList={removeFromWatchList}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
