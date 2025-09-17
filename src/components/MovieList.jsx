import Movie from "./Movie";

export default function MovieList({ movies, title }) {
  return (
    <div className="container-fluid py-5 px-4" style={{ maxWidth: "1600px" }}>
      {movies.length == 0 ? (
        <div className="text-center">Film bulunamadı</div>
      ) : (
        <div
          id="movie-list"
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 justify-content-center"
        >
          {movies.map((m, index) => (
            <Movie key={index} movieObj={m} />
          ))}
        </div>
      )}
    </div>
  );
}
