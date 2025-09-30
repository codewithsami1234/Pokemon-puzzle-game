import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://68c3b7bb81ff90c8e619be6e.mockapi.io/crud", {
        e_name: name,
        e_age: age,
        e_email: email,
      })
      .then(() => {
        navigate("/read");
      });
  };

  return (
    <div className="row">
      <div className="col-md-4 mx-auto mt-5">
        <Link to="/read">
          <button className="btn btn-primary mb-2">Read Data</button>
        </Link>
        <div className="bg-primary p-4 text-center text-white rounded-top">
          <h1>Create Data</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-3 border rounded">
          <div className="mb-3">
            <label className="form-label">Enter Name:</label>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Enter Age:</label>
            <input
              type="number"
              placeholder="Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Enter Email:</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-success w-100"
          />
        </form>
      </div>
    </div>
  );
}

export default Create;
