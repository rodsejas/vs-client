import React from "react";
// import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_API } from "../Constants";
import { Link } from "react-router-dom";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [inspections, setInspections] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const _handleDelete = async (e) => {
    e.preventDefault();

    const url = `${BASE_URL}${BASE_API}/equipment/${params.id}/`;
    try {
      await axios.delete(url, equipment);
      navigate(`/equipments`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/equipment/${params.id}`
      );
      setEquipment(data);
    };

    const fetchInspections = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/equipment/${params.id}/inspections`
      );
      setInspections(data);
    };
    fetchEquipment();
    fetchInspections();
  }, [params.id]);

  return (
    <div>
<<<<<<< HEAD
      <NavBar />

=======
>>>>>>> e2894cbb91749654d5a8def2b8cfa21db85ed9b7
      {equipment.map((e) => {
        return (
          <div key={e.id}>
            <p>Serial num: {e.serial_num}</p>
            <p>Manufacture date: {e.manufacture_date}</p>
            <p>Specification: {e.specification}</p>
            <p>Status {e.status}</p>
            {e.workers !== null ? (
              <p>
                {e.workers.first_name} {e.workers.last_name}
              </p>
            ) : (
              <p>No worker assigned</p>
            )}
            <Link to={`/equipment/${e.id}/edit`}>
              <button>Edit Equipment</button>
            </Link>
            <button onClick={_handleDelete}>Delete Equipment</button>
            <Link to={`/equipment/${e.id}/inspection/create`}>
              <button> New Inspection</button>
            </Link>
            {inspections.map((i) => {
              return (
                <Link key={i.id} to={`/inspection/${i.id}`}>
                  <p>Inspection Date: {i.inspection_date}</p>
                  <p>
                    Technician: {i.workers.first_name} {i.workers.last_name}
                  </p>
                  <p>Notes: {i.notes}</p>
                  <p>Result: {i.has_passed ? "Suitable" : "Not Suitable"}</p>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
