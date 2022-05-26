import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import NavBar from "../components/NavBar";

export default function NewEquipment() {
  const [newEquipment, setNewEquipment] = useState({
    serial_num: "",
    model_id: "",
    worker_id: "",
    manufacture_date: null,
    date_of_first_use: null,
    end_of_life: null,
    specification: "",
    status: "Suitable",
  });

  /**
   * Fetch models for dropdown menu
   */
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/models/dropdown`);
    setModels(data);
  };

  /**
   * Fetch workers for dropdown menu
   */

  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/workers/dropdown`);
    setWorkers(data);
  };

  /**
   * Call both functions
   */

  useEffect(() => {
    fetchModels();
    fetchWorkers();
  }, []);

  /**
   *
   */

  const navigate = useNavigate();

  const _handleChange = (e) => {
    setNewEquipment({ ...newEquipment, [e.target.name]: e.target.value });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${BASE_URL}${BASE_API}/equipments`;
    try {
      const { data } = await axios.post(url, newEquipment);
      const id = data[0].id;
      navigate(`/equipment/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <p>Create equipment</p>
      <form onSubmit={_handleSubmit}>
        <label>
          <p>Serial Number</p>
          <input
            placeholder="Type in or scan barcode"
            type="text"
            name="serial_num"
            onInput={_handleChange}
          />
        </label>

        <label>
          <p>Model</p>
          <select name="model_id" onChange={_handleChange}>
            <option hidden={true}>Select a model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.model_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <p>Assign Worker</p>
          <select name="worker_id" onChange={_handleChange}>
            <option hidden={true}>Select a worker</option>
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.first_name} {worker.last_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <p>Date of Manufacture</p>
          <input
            placeholder="Not recorded"
            type="date"
            name="manufacture_date"
            onInput={_handleChange}
          />
        </label>
        <label>
          <p>Date of First Use</p>
          <input
            placeholder="Has not occurred yet"
            type="date"
            name="date_of_first_use"
            onInput={_handleChange}
          />
        </label>
        <label>
          <p>Lifespan To</p>
          <input
            placeholder="Unlimited"
            type="date"
            name="end_of_life"
            onInput={_handleChange}
          />
        </label>
        <label>
          <p>Specification</p>
          <input
            placeholder="E.g. size, colour, length, etc"
            type="text"
            name="specification"
            onInput={_handleChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
