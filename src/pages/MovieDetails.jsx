import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SimilarMovies from "./SimilarMovies";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "a3094965ddb4a9cad1a0e1f43843be51";
const language = "tr-TR";

const MovieDetails = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [watchProviders, setWatchProviders] = useState([]);

  const { addToWatchList, removeFromWatchList, watchList } =
    useContext(UserContext);
  const isAddedToWatchList = watchList?.find((i) => i.id === movie?.id);

  // Movie detayları
  useEffect(() => {
    async function getMovie() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/${id}?api_key=${api_key}&language=${language}&append_to_response=credits&include_image_language=tr,null`
        );

        if (!response.ok) {
          throw new Error("Hata oluştu");
        }

        const data = await response.json();
        setMovie(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    getMovie();
  }, [id]);

  // Watch providers
  useEffect(() => {
    async function getWatchProviders() {
      try {
        const res = await fetch(
          `${apiUrl}/movie/${id}/watch/providers?api_key=${api_key}&language=tr-TR`
        );
        const data = await res.json();
        const providers = data.results?.TR || {};
        setWatchProviders(providers);
      } catch (err) {
        console.error("Watch providers fetch error:", err);
      }
    }
    getWatchProviders();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  const director = movie.credits.crew.find(
    (person) => person.job === "Director"
  );
  const writers = movie.credits.crew.filter((person) =>
    ["Screenplay", "Writer"].includes(person.job)
  );

  return (
    <div
      className={`movie-details ${
        isDark ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      {/* Hero Bölümü */}
      <div className="movie-hero-container">
        <div
          className="movie-hero d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <div className="hero-content container">
            <div className="row align-items-center justify-content-center">
              {/* Poster */}
              <div className="col-12 col-md-4 text-center text-md-start mb-4 mb-md-0">
                <img
                  id="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="img-fluid rounded shadow-lg border"
                  style={{
                    maxHeight: "400px",
                    background: isDark ? "#222" : "#eee",
                  }}
                />
              </div>

              {/* Film Bilgileri */}
              <div
                className="col-12 col-md-8 rounded p-4 p-md-5"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="d-flex align-items-center mb-2 flex-wrap gap-2 gap-md-3">
                  <h1 className="display-6 display-md-4 fw-bold mb-0 text-light">
                    {movie.title || movie.name}
                  </h1>
                  <span className="badge bg-info fs-6 py-1 py-md-2">
                    {movie.status === "Ended"
                      ? "Bitti"
                      : movie.status === "Returning Series"
                      ? "Devam Ediyor"
                      : movie.status}
                  </span>
                  <span
                    className="badge bg-danger fs-6 py-1 py-md-2"
                    title="İzleme listesine ekle"
                  >
                    {isAddedToWatchList ? (
                      <i
                        className="bi bi-bookmark-check-fill text-white fs-5 animate__animated animate__pulse"
                        style={{ cursor: "pointer" }}
                        title="İzleme listesinden çıkar"
                        onClick={() => removeFromWatchList(movie)}
                      />
                    ) : (
                      <i
                        className="bi bi-bookmark-plus-fill text-white fs-5 animate__animated animate__bounce"
                        style={{ cursor: "pointer" }}
                        title="İzleme listesine ekle"
                        onClick={() => addToWatchList(movie)}
                      />
                    )}
                  </span>
                </div>

                {movie.tagline && (
                  <p className="lead mb-3 mb-md-4 opacity-75 text-light fs-6 fs-md-5">
                    {movie.tagline}
                  </p>
                )}

                <div className="d-flex flex-wrap align-items-center gap-2 gap-md-3 mb-3 mb-md-4">
                  <span className="badge bg-warning fs-6 fs-md-5">
                    <i className="bi bi-star-fill me-1 me-md-2"></i>
                    {movie.vote_average?.toFixed(1)}
                  </span>
                  <span className="text-light fs-6 fs-md-5">
                    {new Date(
                      movie.release_date || movie.first_air_date
                    ).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-light fs-6 fs-md-5">
                    {movie.number_of_seasons
                      ? `${movie.number_of_seasons} sezon, `
                      : ""}
                    {movie.number_of_episodes
                      ? `${movie.number_of_episodes} bölüm`
                      : ""}
                  </span>
                  <div className="vr bg-light opacity-25 d-none d-md-block"></div>
                  <div className="d-flex flex-wrap gap-1 gap-md-2">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="badge bg-primary fs-6 fs-md-5"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="lead mb-3 mb-md-4 text-light fs-6 fs-md-5">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Oyuncular Bölümü */}
      <div className={isDark ? "py-5 bg-black" : "py-5 bg-white"}>
        <div className="container">
          <h2
            className={`h4 h-md-3 mb-4 ${isDark ? "text-light" : "text-dark"}`}
          >
            Oyuncular
          </h2>
          <div className="row g-3 g-md-4">
            {movie.credits?.cast?.slice(0, 6).map((actor) => (
              <div key={actor.id} className="col-6 col-md-4 col-lg-2">
                <div
                  className={`card ${
                    isDark
                      ? "bg-dark text-white border-secondary"
                      : "bg-light text-dark border"
                  } h-100`}
                >
                  <Link to={`/actor/${actor.id}`}>
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                      }
                      alt={actor.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="card-body p-2 p-md-3 text-center">
                    <Link
                      to={`/actor/${actor.id}`}
                      className={isDark ? "text-white" : "text-dark"}
                      style={{ textDecoration: "none", fontSize: "0.8rem" }}
                    >
                      {actor.name}
                    </Link>
                    <p className="card-text small opacity-75 mb-0 text-truncate fs-7 fs-md-6">
                      {actor.character}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benzer Filmler */}
      <SimilarMovies movieId={id} />
    </div>
  );
};

export default MovieDetails;
