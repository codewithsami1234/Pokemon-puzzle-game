import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Read() {
  const [apiData, setApiData] = useState([]);

  const getData = () => {
    axios
      .get("https://68c3b7bb81ff90c8e619be6e.mockapi.io/crud")
      .then((res) => setApiData(res.data));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete data?")) {
      axios.delete(`https://68c3b7bb81ff90c8e619be6e.mockapi.io/crud/${id}`).then(() => getData());
    }
  };

  const setDataToStorage = (id, name, age, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10 mx-auto mt-5">
        <Link to="/create">
          <button className="btn btn-success mb-3">Create New Data</button>
        </Link>

        <table className="table table-bordered table-striped table-dark table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>AGE</th>
              <th>EMAIL</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.e_name}</td>
                <td>{item.e_age}</td>
                <td>{item.e_email}</td>
                <td>
                  <Link to="/edit">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        setDataToStorage(item.id, item.e_name, item.e_age, item.e_email)
                      }
                    >
                      EDIT
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Read;
