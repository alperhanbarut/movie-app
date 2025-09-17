import { useContext, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Register() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    console.log(formData.get("name"));
    console.log(formData.get("email"));
    console.log(formData.get("password"));
    console.log(formData.get("repassword"));
    console.log(formData.get("repassword"));
    console.log(formData.getAll("hobbies"));

    const hobbies = formData.getAll("hobbies");
    const data = Object.fromEntries(formData.entries());
    data.hobbies = hobbies;
    console.log(data);
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
          <div className={`card border ${cardColor}`}>
            <div className="card-header">
              <h1 className="h4 mb-0">Kayıt Ol</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    İsim
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-Posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Şifre
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Şifre Tekrar
                      </label>
                      <input
                        type="password"
                        name="repassword"
                        id="repassword"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <button className={`btn btn-outline-${btnColor} w-100`}>
                  Kayıt Ol
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
