import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function Workers() {
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/workers`);
    setWorkers(data);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <div>
      <NavBar />
      {workers.map((worker) => {
        return (
          <Link key={worker.id} to={`/worker/${worker.id}`}>
            <div>
              <h2>{worker.first_name}</h2>
              <p>{worker.last_name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
