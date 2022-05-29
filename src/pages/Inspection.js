import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import { useParams } from "react-router-dom";

export default function Inspection() {
  const [inspection, setInspection] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchInspection = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/inspection/${params.id}/`
      );
      const inspection = data[0];
      setInspection(inspection);
    };
    fetchInspection();
  }, [params.id]);

  return (
    <>
      {Object.keys(inspection).length !== 0 ? (
        <div>
          <p>{inspection.inspection_date}</p>
          <p>{inspection.equipments.serial_num}</p>
          <p>{inspection.equipments.models.model_name}</p>
          <p>
            {inspection.workers.first_name} {inspection.workers.last_name}
          </p>
          <p>{inspection.notes}</p>
          <p>
            Image:{" "}
            {inspection.image ? (
              <img
                src={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${inspection.image}`}
                alt="inspection-img"
              />
            ) : (
              "No image uploaded"
            )}
          </p>
          <p>{inspection.has_passed ? "Suitable" : "Not suitable"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
