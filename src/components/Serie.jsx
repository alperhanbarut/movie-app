import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";

export default function Serie({ serieObj }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { watchList, removeFromWatchList, addToWatchList } =
    useContext(UserContext);
  const isAddedToWatchList = watchList?.find((i) => i.id === serieObj?.id);

  const posterUrl = serieObj.poster_path
    ? "https://image.tmdb.org/t/p/original/" + serieObj.poster_path
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";

  return (
    <div className="col">
      <div className="card movie position-relative h-100 shadow-sm">
        <div
          style={{ height: "300px", overflow: "hidden", position: "relative" }}
        >
          {isAddedToWatchList ? (
            <span
              className="position-absolute top-0 start-0 m-2"
              style={{ zIndex: 2 }}
            >
              <i
                className="bi bi-bookmark-check-fill text-white fs-5 animate__animated animate__pulse"
                style={{
                  cursor: "pointer",
                  filter: "drop-shadow(0 0 2px #222)",
                }}
                title="Listede - Çıkarmak için tıkla"
                onClick={() => removeFromWatchList(serieObj)}
              ></i>
            </span>
          ) : (
            <span
              className="position-absolute top-0 start-0 m-2"
              style={{ zIndex: 2 }}
            >
              <i
                className="bi bi-bookmark-plus text-white fs-5"
                style={{
                  cursor: "pointer",
                  filter: "drop-shadow(0 0 2px #222)",
                }}
                title="Listeye eklemek için tıkla"
                onClick={() => addToWatchList(serieObj)}
              ></i>
            </span>
          )}

          <Link
            to={`/series/${serieObj.id}`}
            className="stretched-link"
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 0);
            }}
          >
            <img
              src={posterUrl}
              alt={serieObj.name}
              className="card-img-top h-100 w-100"
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>
        <div
          className="card-body d-flex flex-column justify-content-between"
          style={{
            backgroundColor: isDark ? "#2d3339" : "#fff",
            color: isDark ? "white" : "black",
          }}
        >
          <h2 className="h6 card-title mb-0 text-center mb-3">
            {serieObj.name}
          </h2>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <small style={{ color: isDark ? "#dddadaff" : "#6c757d" }}>
              {serieObj.first_air_date?.split("-")[0]}
            </small>
            <span className="badge bg-primary">
              {typeof serieObj.vote_average === "number"
                ? serieObj.vote_average.toFixed(1)
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
