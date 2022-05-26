import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function Inspections() {
  const [inspections, setInspections] = useState([]);

  const fetchInspections = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/inspections`);
    setInspections(data);
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  return (
    <>
      <NavBar />
      {inspections.map((i) => {
        return (
          <Link key={i.id} to={`/inspection/${i.id}`}>
            <div>
              <p>{i.inspection_date}</p>
              <p>{i.equipments.serial_num}</p>
              <p>{i.equipments.models.model_name}</p>
              <p>
                {i.workers.first_name} {i.workers.last_name}
              </p>
              <p> {i.has_passed ? "Suitable" : "Not suitable"}</p>
              <p>.............</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
