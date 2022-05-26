import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import NavBar from "../components/NavBar";

export default function EditEquipment() {
  const [currentEquipment, setCurrentEquipment] = useState({});
  const [updatedEquipment, setUpdatedEquipment] = useState({});

  const params = useParams();

  const fetchCurrentEquipment = async () => {
    const { data } = await axios.get(
      `${BASE_URL}${BASE_API}/equipment/${params.id}`
    );
    const equipment = data[0];
    setCurrentEquipment(equipment);
  };

  const fetchUpdatedEquipment = async () => {
    const { data } = await axios.get(
      `${BASE_URL}${BASE_API}/equipment/${params.id}/edit`
    );
    const equipment = data[0];
    setUpdatedEquipment(equipment);
  };

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
   * Call all the state setter functions
   */

  // eslint-disable-next-line
  useEffect(() => {
    fetchModels();
    fetchWorkers();
    fetchCurrentEquipment();
    fetchUpdatedEquipment();
  }, []);

  /**
   *
   */

  const navigate = useNavigate();

  const _handleChange = (e) => {
    setUpdatedEquipment({
      ...updatedEquipment,
      [e.target.name]: e.target.value,
    });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${BASE_URL}${BASE_API}/equipment/${params.id}/edit`;
    try {
      const { data } = await axios.put(url, updatedEquipment);
      const id = data[0].id;
      navigate(`/equipment/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <p>Edit equipment</p>
      <form onSubmit={_handleSubmit}>
        <label>
          <p>Serial Number</p>
          <input
            placeholder="Type in or scan barcode"
            type="text"
            name="serial_num"
            defaultValue={currentEquipment.serial_num}
            onInput={_handleChange}
          />
        </label>

        <label>
          <p>Model</p>

          <select
            name="model_id"
            onChange={_handleChange}
            value={
              Object.keys(currentEquipment).length !== 0
                ? updatedEquipment.model_id
                : "Loading"
            }
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.model_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <p>Assign Worker</p>
          <select
            name="worker_id"
            onChange={_handleChange}
            value={
              Object.keys(currentEquipment).length !== 0
                ? updatedEquipment.worker_id
                : "Loading"
            }
          >
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
            defaultValue={currentEquipment.manufacture_date}
            onInput={_handleChange}
          />
        </label>
        <label>
          <p>Date of First Use</p>
          <input
            placeholder="Has not occurred yet"
            type="date"
            name="date_of_first_use"
            defaultValue={currentEquipment.date_of_first_use}
            onInput={_handleChange}
          />
        </label>
        <label>
          <p>Lifespan To</p>
          <input
            placeholder="Unlimited"
            type="date"
            name="end_of_life"
            defaultValue={currentEquipment.end_of_life}
            onInput={_handleChange}
          />
        </label>
        <label>
          <p>Specification</p>
          <input
            placeholder="E.g. size, colour, length, etc"
            type="text"
            name="specification"
            defaultValue={currentEquipment.specification}
            onInput={_handleChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
