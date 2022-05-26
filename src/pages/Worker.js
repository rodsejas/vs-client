import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL, BASE_API } from "../Constants";
import NavBar from "../components/NavBar";

export default function Worker() {
  const [worker, setWorker] = useState([]);
  const params = useParams();

  const fetchWorker = async () => {
    const { data } = await axios.get(
      `${BASE_URL}${BASE_API}/worker/${params.id}`
    );
    setWorker(data);
  };

  useEffect(() => {
    fetchWorker();
  }, []);

  return (
    <div>
      <NavBar />
      {worker.map((w) => {
        return (
          <div key={w.id}>
            <p>{w.first_name}</p>
            <p>{w.last_name}</p>
          </div>
        );
      })}
    </div>
  );
}
