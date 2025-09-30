import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setAge(localStorage.getItem("age"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://68c3b7bb81ff90c8e619be6e.mockapi.io/crud/${id}`, {
        e_name: name,
        e_age: age,
        e_email: email,
      })
      .then(() => navigate("/read"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <div className="col-md-4 mx-auto mt-5">
        <Link to="/read">
          <button className="btn btn-primary mb-2">Read Data</button>
        </Link>
        <div className="bg-primary p-4 text-center text-white rounded-top">
          <h1>Update Data</h1>
        </div>
        <form onSubmit={handleUpdate} className="p-3 border rounded">
          <div className="mb-3">
            <label className="form-label">Enter Name:</label>
            <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Enter Age:</label>
            <input
              type="number"
              value={age || ""}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Enter Email:</label>
            <input
              type="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <input type="submit" value="Update" className="btn btn-success w-100" />
        </form>
      </div>
    </div>
  );
}

export default Edit;
