import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SeriesList from "../components/SeriesList";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "a3094965ddb4a9cad1a0e1f43843be51";
const page = 1;
const language = "tr-TR";

const SimilarSeries = ({ serieId }) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSeries() {
      try {
        const response = await fetch(
          `${apiUrl}/tv/${serieId}/similar?api_key=${api_key}&page=${page}&language=${language}`
        );

        if (!response.ok) {
          throw new Error("Hata oluştu");
        }

        const data = await response.json();

        if (data.results) {
          setSeries(data.results);
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    if (serieId) {
      getSeries();
    }
  }, [serieId]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return <SeriesList series={series} title={"Benzer Diziler"} />;
};

export default SimilarSeries;
