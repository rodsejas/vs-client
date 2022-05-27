import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL, BASE_API } from "../Constants";

export default function Worker() {
  const [worker, setWorker] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchWorker = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/worker/${params.id}`
      );
      setWorker(data);
    };
    fetchWorker();
  }, [params.id]);

  return (
    <div>
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
