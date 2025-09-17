import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { ThemeContext } from "../contexts/ThemeContext";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "a3094965ddb4a9cad1a0e1f43843be51";
const language = "tr-TR";

const ActorDetails = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { id } = useParams();

  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getActor() {
      try {
        // Actor detayları
        const resActor = await fetch(
          `${apiUrl}/person/${id}?api_key=${api_key}&language=${language}`
        );
        if (!resActor.ok) throw new Error("Actor bulunamadı");
        const actorData = await resActor.json();
        setActor(actorData);

        // Actor film ve dizi kredileri
        const resCredits = await fetch(
          `${apiUrl}/person/${id}/movie_credits?api_key=${api_key}&language=${language}`
        );
        if (!resCredits.ok) throw new Error("Film bilgisi alınamadı");
        const creditsData = await resCredits.json();
        // En popüler 6 film/dizi
        const sortedCredits = creditsData.cast
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6);
        setCredits(sortedCredits);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getActor();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={isDark ? "bg-dark text-white" : "bg-light text-dark"}>
      <div className="container py-5">
        <div className="row mb-5">
          {/* Actor Fotoğraf */}
          <div className="col-md-4 text-center mb-4">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              }
              alt={actor.name}
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Actor Bilgileri */}
          <div className="col-md-8">
            <h1 className="mb-3">{actor.name}</h1>
            {actor.biography && (
              <p
                className="mb-4"
                style={{ lineHeight: "1.6", textAlign: "justify" }}
              >
                {actor.biography}
              </p>
            )}

            <div className="row row-cols-1 row-cols-md-2 g-3">
              {actor.birthday && (
                <div className="col">
                  <div
                    className={`p-3 rounded ${
                      isDark ? "bg-secondary text-white" : "bg-light text-dark"
                    } shadow-sm`}
                  >
                    <i className="bi bi-calendar3 me-2"></i>
                    <strong>Doğum Tarihi:</strong> {actor.birthday}
                  </div>
                </div>
              )}
              {actor.place_of_birth && (
                <div className="col">
                  <div
                    className={`p-3 rounded ${
                      isDark ? "bg-secondary text-white" : "bg-light text-dark"
                    } shadow-sm`}
                  >
                    <i className="bi bi-geo-alt me-2"></i>
                    <strong>Doğum Yeri:</strong> {actor.place_of_birth}
                  </div>
                </div>
              )}
              {actor.deathday && (
                <div className="col">
                  <div
                    className={`p-3 rounded ${
                      isDark ? "bg-secondary text-white" : "bg-light text-dark"
                    } shadow-sm`}
                  >
                    <i className="bi bi-heartbreak me-2"></i>
                    <strong>Ölüm Tarihi:</strong> {actor.deathday}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Oynadığı Popüler Filmler */}
        {credits.length > 0 && (
          <div className="mb-5">
            <h2 className={`h3 mb-4 ${isDark ? "text-light" : "text-dark"}`}>
              Oynadığı Popüler Filmler & Diziler
            </h2>
            <div className="row g-4">
              {credits.map((credit) => (
                <div key={credit.id} className="col-6 col-md-4 col-lg-2">
                  <div
                    className={`card ${
                      isDark
                        ? "bg-dark text-white border-secondary"
                        : "bg-light text-dark border"
                    } h-100`}
                  >
                    <Link to={`/movies/${credit.id}`}>
                      <img
                        src={
                          credit.poster_path
                            ? `https://image.tmdb.org/t/p/w185/${credit.poster_path}`
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                        }
                        alt={credit.title || credit.name}
                        className="card-img-top"
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                    </Link>
                    <div className="card-body p-2">
                      <h6 className="card-title mb-1">
                        <Link
                          to={`/movies/${credit.id}`}
                          className={isDark ? "text-white" : "text-dark"}
                          style={{ textDecoration: "none" }}
                        >
                          {credit.title || credit.name}
                        </Link>
                      </h6>
                      <p className="card-text small opacity-75">
                        {credit.character}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorDetails;
