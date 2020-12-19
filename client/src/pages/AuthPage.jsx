import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export default function AuthPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, clearError, request } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Links Shortener</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authentication</span>
            <div className="input-field">
              <input
                placeholder="Enter email"
                id="email"
                type="text"
                name="email"
                value={form.email}
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="first_name">Email</label>
            </div>

            <div className="input-field">
              <input
                placeholder="Enter password"
                id="password"
                type="password"
                name="password"
                value={form.password}
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="first_name">Password</label>
            </div>
          </div>
          <div className="card-action">
            <button
              disabled={loading}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
            >
              Log In
            </button>
            <button
              onClick={registerHandler}
              className="btn grey lighten-1 black-text"
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
