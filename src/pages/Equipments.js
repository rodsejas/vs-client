import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function Equipments() {
  const [equipments, setEquipments] = useState([]);

  const fetchEquipments = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/equipments`);
    setEquipments(data);
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  return (
    <>
      <NavBar />
      <Link to={`/equipment/create`}>
        <button>Create new equipment</button>
      </Link>

      {equipments.map((e) => {
        return (
          <Link key={e.id} to={`/equipment/${e.id}`}>
            <div>
              {e.models !== null ? (
                <h1>Model name: {e.models.model_name} </h1>
              ) : (
                <h1>No model assigned</h1>
              )}
              <p>Serial number: {e.serial_num}</p>
              {e.workers !== null ? (
                <p>
                  Worker: {e.workers.first_name} {e.workers.last_name}{" "}
                </p>
              ) : (
                <p>No Worker assigned</p>
              )}
              <p>End of Life: {e.end_of_life}</p>
              <p>Next Inspection Due: {e.next_inspection_due}</p>
              <p>Status: {e.status}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
