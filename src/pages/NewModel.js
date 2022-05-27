import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";

export default function NewModel() {
  const [model, setModel] = useState({
    model_num: "",
    model_name: "",
    manufacturer: "",
    category_id: "1",
    standards: "",
    lifespan_from_manufacture: "",
    inspection_frequency: "",
    image: "",
    manual: "",
  });

  const navigate = useNavigate();

  const _handleChange = (e) => {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${BASE_URL}${BASE_API}/models`;
    try {
      const { data } = await axios.post(url, model);
      const id = data[0].id;
      navigate(`/model/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Create model</h1>
      <form onSubmit={_handleSubmit}>
        <label>
          <p>Model Number</p>
          <input type="text" name="model_num" onInput={_handleChange} />
        </label>

        <label>
          <p>Model Name</p>
          <input type="text" name="model_name" onInput={_handleChange} />
        </label>

        <label>
          <p>Manufacturer</p>
          <input type="text" name="manufacturer" onInput={_handleChange} />
        </label>

        <label>
          <p>Standards</p>
          <input type="text" name="standards" onInput={_handleChange} />
        </label>

        <label>
          <p>Lifespan from Manufacture</p>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="120"
            name="lifespan_from_manufacture"
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
            placeholder="3"
            name="inspection_frequency"
            required
            onInput={_handleChange}
          />{" "}
          months
        </label>

        <br />
        <input type="submit" value="Create" />
      </form>
    </>
  );
}
