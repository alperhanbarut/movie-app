import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SeriesList from "../components/SeriesList";
import Pagination from "../components/Pagination";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "a3094965ddb4a9cad1a0e1f43843be51";
const language = "tr-TR";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getSeries() {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/tv/popular?api_key=${api_key}&page=${currentPage}&language=${language}`
        );
        if (!response.ok) throw new Error("Hata oluştu");
        const data = await response.json();
        if (data.results) {
          setSeries(data.results);
          setTotalPages(data.total_pages);
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    getSeries();
  }, [currentPage]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <SeriesList series={series} title={"Popüler Diziler"} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        query=""
        setSearchParams={({ page }) => setCurrentPage(page)}
      />
    </>
  );
};

export default Series;
