import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Form responsible for sign up of a new user
const Signup = ({ handleUser }) => {
  const navigator = useNavigate();
  const [errors, setErrors] = useState([]);
  const [signUpFormData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  // Monitors change in form input and sets them to state under the variable loginFormData
  function handleInputs(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...signUpFormData,
      [name]: value,
    });
  }
  // This POST request creates a user on the database and logs in a user to the program
  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://trial1-cksf.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpFormData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => handleUser(user));
        setFormData({
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        navigator("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="text-center form-body">
      <div className="container">
        <div className="py-md-5 py-2"></div>
        <div className="col-md-6 col-10 m-auto mt-5">
          <form
            className="row g-3 needs-validation faded-bg-light fw-bold theme-light-mellow-color"
            onSubmit={handleSubmit}
            novalidate
          >
            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                onChange={handleInputs}
                name="username"
                value={signUpFormData.username}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleInputs}
                name="email"
                value={signUpFormData.email}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleInputs}
                name="password"
                value={signUpFormData.password}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password_confirmation" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password_confirmation"
                onChange={handleInputs}
                name="password_confirmation"
                value={signUpFormData.password_confirmation}
                required
              />
            </div>
            <Link to="/login">Already have an account?</Link>
            <div className="col-12">
              <button type="submit" className="btn-style">
                Sign Up
              </button>
            </div>
            <ul>
              {errors.length > 0
                ? errors.map((err) => (
                    <li key={err} className="error-list">
                      {err}
                    </li>
                  ))
                : null}
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
