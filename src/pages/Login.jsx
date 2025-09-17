import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  const email = useRef();
  const password = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleFormSubmit(e) {
    setEmailError(false);
    setPasswordError(false);

    e.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const emailIsInvalid = !emailValue.includes("@");
    const passwordIsInvalid = passwordValue.length < 6;

    let hasError = false;
    if (emailIsInvalid) {
      setEmailError(true);
      hasError = true;
    }
    if (passwordIsInvalid) {
      setPasswordError(true);
      hasError = true;
    }
    if (hasError) return;

    console.log({ email: emailValue, password: passwordValue });

    email.current.value = "";
    password.current.value = "";
  }

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-7 mx-auto">
          <div className={`card border ${cardColor}`}>
            <div className="card-header">
              <h1 className="h4 mb-0">Giriş Yap</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-Posta
                  </label>
                  <input
                    type="email"
                    className={`form-control${emailError ? " is-invalid" : ""}`}
                    id="email"
                    name="email"
                    ref={email}
                  />
                </div>
                {emailError && (
                  <div className="invalid-feedback d-block">
                    Geçersiz e-posta adresi.
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Şifre
                  </label>
                  <input
                    type="password"
                    name="password"
                    ref={password}
                    className={`form-control${
                      passwordError ? " is-invalid" : ""
                    }`}
                    id="password"
                  />
                  {passwordError && (
                    <div className="invalid-feedback d-block">
                      Şifre en az 6 karakter olmalıdır.
                    </div>
                  )}
                </div>
                <button type="submit" className={`btn btn-outline-${btnColor}`}>
                  Giriş Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
