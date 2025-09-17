import Serie from "./Serie";

export default function SeriesList({ series, title }) {
  return (
    <div className="container-fluid py-5 px-4" style={{ maxWidth: "1600px" }}>
      {series.length === 0 ? (
        <div className="text-center">Dizi bulunamadı</div>
      ) : (
        <div
          id="series-list"
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 justify-content-center"
        >
          {series.map((s, index) => (
            <Serie key={index} serieObj={s} />
          ))}
        </div>
      )}
    </div>
  );
}
