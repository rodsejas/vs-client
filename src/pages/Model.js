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
    const fetchModel = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/model/${params.id}`
      );
      setModel(data);
    };
    fetchModel();
  }, [params.id]);

  return (
    <div>
      {model.map((m) => {
        return (
          <div key={m.id}>
            <h2>{m.model_name}</h2>
            <p>Manufacturer: {m.manufacturer}</p>
            <p>Model No: {m.model_num}</p>
            <p>Standards: {m.standards}</p>
            <p>
              Image:{" "}
              {m.image ? (
                <img
                  src={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${m.image}`}
                  alt="model-img"
                />
              ) : (
                "No image uploaded"
              )}
            </p>
            <p>
              Manual:
              {m.manual ? (
                <a
                  href={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${m.manual}`}
                  target="_blank"
                  rel="noopener noreferrer" // added to remove warnings related to target=_blank
                >
                  <img
                    alt="thumbanil-files"
                    src={
                      "https://vertical-space.com/assets/3.3.1/images/generic-thumb.png"
                    }
                  />
                </a>
              ) : (
                "No manual available"
              )}
            </p>

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
