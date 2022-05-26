import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function Models() {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/models`);
    setModels(data);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <>
      <NavBar />
      <Link to={`/model/create`}>
        <button>Create new model</button>
      </Link>

      {models.map((m) => {
        return (
          <Link key={m.id} to={`/model/${m.id}`}>
            <div>
              <h2>{m.model_name}</h2>
            </div>
          </Link>
        );
      })}
    </>
  );
}
