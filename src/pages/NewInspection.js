import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function NewInspection() {
  const params = useParams();
  const navigate = useNavigate();
  const [inspection, setInspection] = useState({
    notes: "",
    inspection_date: "",
    has_passed: false,
    worker_id: "",
    equipment_id: params.id,
    image: "",
  });
  const [equipment, setEquipment] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [image, setImage] = useState(null);

  const fetchWorkers = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/workers/dropdown`);
    setWorkers(data);
  };

  const _handleChange = (e) => {
    setInspection({ ...inspection, [e.target.name]: e.target.value });
  };

  const _handleRadioInput = (e) => {
    if (e.target.value === "true") {
      setInspection({ ...inspection, has_passed: true });
    } else {
      setInspection({ ...inspection, has_passed: false });
    }
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();

    const setNextInspectionDue = (inspectionFrequency) => {
      const lastInspectionDate = inspection.inspection_date;
      const endDate = moment(lastInspectionDate)
        .add(inspectionFrequency, "M")
        .format("YYYY-MM-DD");
      return endDate;
    };

    const inspection_frequency = equipment[0].models.inspection_frequency;
    const nextInspectionDue = setNextInspectionDue(inspection_frequency);
    const patchData = { next_inspection_due: nextInspectionDue };

    // updating the equipment's next inspection due date
    const patchUrl = `${BASE_URL}${BASE_API}/equipment/${params.id}/inspections`;
    try {
      await axios.patch(patchUrl, patchData);
    } catch (error) {
      console.log(error);
    }

    // uploading inspection image to supabase "inspection" bucket
    let imageData;

    if (image) {
      // if image is uploaded - post it to supabase
      const { data, error } = await supabase.storage
        .from("vs")
        .upload(`inspections/${Date.now()}_${image.name}`, image);

      if (error) {
        console.log(error);
      }

      if (data) {
        imageData = data.Key;
      }
    }

    let postData = { ...inspection, image: imageData };
    console.log(postData);

    const url = `${BASE_URL}${BASE_API}/inspections`;
    try {
      await axios.post(url, postData);
      navigate(`/equipment/${inspection.equipment_id}`);
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
    fetchEquipment();
    fetchWorkers();
  }, [params.id]);

  return (
    <>
      <form onSubmit={_handleSubmit}>
        <label>
          <p>Notes</p>
          <textarea
            placeholder="Enter the inspection notes.."
            type="text"
            name="notes"
            onInput={_handleChange}
          />
        </label>

        <label>
          <p> Attach image:</p>{" "}
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <label>
          <p>Assign Worker</p>
          <select name="worker_id" required onChange={_handleChange}>
            <option hidden={true} value="">
              Select a worker
            </option>
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.first_name} {worker.last_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <p>Inspection Date</p>
          <input
            placeholder="Not recorded"
            type="date"
            max={`${moment().format("YYYY-MM-DD")}`}
            name="inspection_date"
            onInput={_handleChange}
            required
          />
        </label>
        <br />
        <br />
        <label>
          <input
            type="radio"
            name="status"
            value="true"
            required
            onChange={_handleRadioInput}
          />{" "}
          Suitable
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="false"
            onChange={_handleRadioInput}
          />{" "}
          Not Suitable
        </label>

        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
