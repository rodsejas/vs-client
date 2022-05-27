import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";

export default function EditModel() {
  const [model, setModel] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  const _handleChange = (e) => {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${BASE_URL}${BASE_API}/model/${params.id}/edit`;
    try {
      const { data } = await axios.put(url, model);
      const id = data[0].id;
      navigate(`/model/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/model/${params.id}`
      );
      const model = data[0];
      setModel(model);
    };
    fetchModel();
  }, [params.id]);

  return (
    <>
      <h1>Edit model</h1>
      <form onSubmit={_handleSubmit}>
        <label>
          <p>Model Number</p>
          <input
            type="text"
            name="model_num"
            defaultValue={model.model_num}
            onInput={_handleChange}
          />
        </label>

        <label>
          <p>Model Name</p>
          <input
            type="text"
            name="model_name"
            defaultValue={model.model_name}
            onInput={_handleChange}
          />
        </label>

        <label>
          <p>Manufacturer</p>
          <input
            type="text"
            name="manufacturer"
            defaultValue={model.manufacturer}
            onInput={_handleChange}
          />
        </label>

        <label>
          <p>Standards</p>
          <input
            type="text"
            name="standards"
            defaultValue={model.standards}
            onInput={_handleChange}
          />
        </label>

        <label>
          <p>Lifespan from Manufacture</p>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="120"
            name="lifespan_from_manufacture"
            defaultValue={model.lifespan_from_manufacture}
            required
            onInput={_handleChange}
          />{" "}
          months
        </label>

        <label>
          <p>Inspection Frequency</p>
          <input
            type="number"
            min="0"
            max="12"
            step="1"
            placeholder="4"
            name="inspection_frequency"
            defaultValue={model.inspection_frequency}
            onInput={_handleChange}
          />{" "}
          months
        </label>
        <br />
        <input type="submit" value="Update" />
      </form>
    </>
  );
}
