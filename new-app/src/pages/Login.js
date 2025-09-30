import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = "https://68c3b7bb81ff90c8e619be6e.mockapi.io/pokemonGame";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);

    try {
      const res = await axios.get(baseURL);
      let user = res.data.find((u) => u.e_email === email);

      if (!user) {
        const newUser = {
          e_name: name || "New User",
          e_age: 0,
          e_email: email,
        };
        const createRes = await axios.post(baseURL, newUser);
        user = createRes.data;
      }

      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.e_name);

      navigate("/game");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Play Pokémon Puzzle Game</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${!name && loading ? "is-invalid" : ""}`}
            id="floatingName"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="floatingName">Name</label>
          {!name && loading && (
            <div className="invalid-feedback">Name is required</div>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control ${!email && loading ? "is-invalid" : ""}`}
            id="floatingEmail"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingEmail">Email</label>
          {!email && loading && (
            <div className="invalid-feedback">Email is required</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login / Register"}
        </button>
      </form>
    </div>
  );
}

export default Login;
