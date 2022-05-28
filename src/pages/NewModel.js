import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import { supabase } from "../supabase";

export default function NewModel() {
  const [model, setModel] = useState({
    model_num: "",
    model_name: "",
    manufacturer: "",
    category_id: "1",
    standards: "",
    lifespan_from_manufacture: "",
    inspection_frequency: "",
    image: "",
    manual: "",
  });
  const [image, setImage] = useState(null);
  const [manual, setManual] = useState(null);
  // const [pics, setPics] = useState(null);

  const navigate = useNavigate();

  const _handleChange = (e) => {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    let postData = { ...model };

    if (image) {
      // if image is uploaded - post it to supabase
      const { data, error } = await supabase.storage
        .from("vs")
        .upload(`models/${Date.now()}_${image.name}`, image);

      if (error) {
        console.log(error);
      }

      if (data) {
        postData = { ...model, image: data.Key };
      }
    }

    if (manual) {
      // if manual is uploaded - post it to supabase
      const { data, error } = await supabase.storage
        .from("vs")
        .upload(`models/${Date.now()}_${manual.name}`, manual);

      if (error) {
        console.log(error);
      }

      if (data) {
        postData = { ...model, manual: data.Key };
      }
    }

    // if (pics) {
    //   // trying to upload multiple images using loops
    //   debugger;
    //   console.log(pics);
    //   pics.forEach((p) => {
    //       const { data, error } = await supabase.storage
    //         .from("vs")
    //         .upload(`models/${Date.now()}_${p.name}`, p);

    //         if(data){
    //           postData = { ...model, pics: [].push(data.Key) };
    //         }
    //   });
    // }

    console.log(postData);
    const url = `${BASE_URL}${BASE_API}/models`;
    try {
      const { data } = await axios.post(url, postData);
      const id = data[0].id;
      navigate(`/model/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Create model</h1>
      <form onSubmit={_handleSubmit}>
        <label>
          <p>Model Number</p>
          <input type="text" name="model_num" onInput={_handleChange} />
        </label>

        <label>
          <p>Model Name</p>
          <input type="text" name="model_name" onInput={_handleChange} />
        </label>

        <label>
          <p>Manufacturer</p>
          <input type="text" name="manufacturer" onInput={_handleChange} />
        </label>

        <label>
          <p>Standards</p>
          <input type="text" name="standards" onInput={_handleChange} />
        </label>

        <label>
          <p>Lifespan from Manufacture</p>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="120"
            name="lifespan_from_manufacture"
            required
            onInput={_handleChange}
          />{" "}
          months
        </label>

        <label>
          <p>Inspection Frequency</p>
          <input
            type="number"
            min="0"
            max="12"
            step="1"
            placeholder="3"
            name="inspection_frequency"
            required
            onInput={_handleChange}
          />{" "}
          months
        </label>

        <label>
          <p>Image:</p>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <label>
          <p>Manual:</p>
          <input
            name="manual"
            type="file"
            accept="application/pdf"
            onChange={(e) => setManual(e.target.files[0])}
          />
        </label>

        {/* <label>
          <p> Select files:</p>{" "}
          <input
            type="file"
            name="pics"
            multiple
            onChange={(e) => setPics(e.target.files)}
          />
        </label> */}

        <br />
        <input type="submit" value="Create" />
      </form>
    </>
  );
}
