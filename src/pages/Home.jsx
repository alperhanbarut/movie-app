import React from "react";
import SearchForm from "../components/SearchForm";
import "../Home.css";
import Movies from "./Movies";

const Home = () => {
  return (
    <>
      <div id="home">
        <div className="img-overlay">
          <div className="container pt-5">
            <div className="row">
              <div className="img-overlay d-flex justify-content-center align-items-center">
                <div className="col-12 col-lg-7 text-center text-white">
                  <h1 className="h2 fw-bold" id="welcoming-title">
                    Sinema Dünyasının Kapılarını Aralayın
                  </h1>
                  <p className="lead mb-4" id="welcoming-text">
                    Binlerce film, dizi ve unutulmaz karakter sizi bekliyor.
                    Favorilerinizi bulun ve kendi koleksiyonunuzu oluşturun!
                  </p>
                  <SearchForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Movies />{" "}
    </>
  );
};

export default Home;
