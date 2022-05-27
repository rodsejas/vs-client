import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_API } from "../Constants";
import { Link } from "react-router-dom";

export default function Model() {
  const [model, setModel] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const fetchModel = async () => {
    const { data } = await axios.get(
      `${BASE_URL}${BASE_API}/model/${params.id}`
    );
    setModel(data);
  };

  const _handleDelete = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}${BASE_API}/model/${params.id}/`;
    try {
      await axios.delete(url, model);
      navigate(`/models`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchModel();
  }, []);

  return (
    <div>
      {model.map((m) => {
        return (
          <div key={m.id}>
            <h2>{m.model_name}</h2>
            <p>Manufacturer: {m.manufacturer}</p>
            <p>Model No: {m.model_num}</p>
            <p>Standards: {m.standards}</p>
            <Link to={`/model/${m.id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={_handleDelete}>Delete Model</button>
          </div>
        );
      })}
    </div>
  );
}
