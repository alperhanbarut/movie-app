export default function WatchListButton({ movies, onSetIsWatchListOpen }) {
  return (
    <div className="mb-2 mb-lg-0 ms-1">
      <button
        onClick={() => onSetIsWatchListOpen((prevState) => !prevState)}
        type="button"
        className="btn btn-outline-primary position-relative d-flex align-items-center gap-2 shadow-sm"
        style={{
          borderRadius: "2rem",
          padding: "0.5rem 1.2rem",
          fontWeight: "bold",
        }}
        title="İzleme Listem"
      >
        <i className="bi bi-bookmark-star-fill fs-5 text-warning animate__animated animate__bounce"></i>
        <span className="ms-1">İzleme Listem</span>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow">
          {movies.length}
        </span>
      </button>
    </div>
  );
}
