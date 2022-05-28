import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Container,
  Text,
  StackDivider,
  Select,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export default function NewEquipment(props) {
  const [newEquipment, setNewEquipment] = useState({
    serial_num: "",
    model_id: "",
    worker_id: "",
    manufacture_date: null,
    date_of_first_use: null,
    end_of_life: null,
    specification: "",
    status: "Suitable",
  });

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
   * Call both functions
   */

  useEffect(() => {
    fetchModels();
    fetchWorkers();
  }, []);

  /**
   *
   */

  const navigate = useNavigate();

  const _handleChange = (e) => {
    setNewEquipment({ ...newEquipment, [e.target.name]: e.target.value });
  };

  console.log(newEquipment);

  const _handleSubmit = async (e) => {
    e.preventDefault();
    let postData;

    const handleNullLifespanTo = (lifespanMonths) => {
      const manufacture_date = newEquipment.manufacture_date;
      const endDate = moment(manufacture_date)
        .add(lifespanMonths, "M")
        .format("YYYY-MM-DD");
      return endDate;
    };

    const setNextInspectionDue = (inspectionFrequency) => {
      const dateOfFirstUse = newEquipment.date_of_first_use;
      const endDate = moment(dateOfFirstUse)
        .add(inspectionFrequency, "M")
        .format("YYYY-MM-DD");
      return endDate;
    };

    const model_id = newEquipment.model_id;
    const selectedModel = models.filter((e) => e.id === Number(model_id));
    const lifespanMonths = selectedModel[0].lifespan_from_manufacture;
    const inspectionFrequency = selectedModel[0].inspection_frequency;

    if (newEquipment.end_of_life === null) {
      postData = {
        ...newEquipment,
        end_of_life: handleNullLifespanTo(lifespanMonths),
      };
    } else {
      postData = { ...newEquipment };
    }

    if (newEquipment.date_of_first_use !== null) {
      postData = {
        ...postData,
        next_inspection_due: setNextInspectionDue(inspectionFrequency),
      };
    }

    const url = `${BASE_URL}${BASE_API}/equipments`;
    try {
      const { data } = await axios.post(url, postData);
      const id = data[0].id;
      navigate(`/equipment/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <p>Create equipment</p>
      <form onSubmit={_handleSubmit}>
        <label>
          <p>Serial Number</p>
          <input
            placeholder="Type in or scan barcode"
            type="text"
            name="serial_num"
            onInput={_handleChange}
          />
        </label>

        <label>
          <p>Model</p>
          <select name="model_id" onChange={_handleChange}>
            <option hidden={true}>Select a model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.model_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <p>Assign Worker</p>
          <select name="worker_id" onChange={_handleChange}>
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
            onInput={_handleChange}
            required
          />
        </label>
        <label>
          <p>Date of First Use</p>
          <input
            placeholder="Has not occurred yet"
            type="date"
            name="date_of_first_use"
            onInput={_handleChange}
          />
        </label>
        <label>
          <p>Lifespan To</p>
          <input
            placeholder="Unlimited"
            type="date"
            name="end_of_life"
            onInput={_handleChange}
          />
        </label>
        <label>
          <p>Specification</p>
          <input
            placeholder="E.g. size, colour, length, etc"
            type="text"
            name="specification"
            onInput={_handleChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form> */}
      <Container
        py={{
          base: "4",
          md: "8",
        }}
      >
        <Stack spacing="5" divider={<StackDivider />}>
          <Stack
            direction={{
              base: "column",
              lg: "row",
            }}
            spacing={{
              base: "5",
              lg: "8",
            }}
            justify="space-between"
          >
            {/* <form onSubmit={_handleSubmit}> */}
            <Box flexShrink={1}>
              <Text fontSize="lg" fontWeight="medium">
                Add Equipment To Inventory
              </Text>
              <Text color="muted" fontSize="sm">
                Leave date of first use blank if item has not been commissioned
                for use.
              </Text>
            </Box>
            <Box
              as="form"
              bg="bg-surface"
              boxShadow={useColorModeValue("sm", "sm-dark")}
              borderRadius="lg"
              {...props}
            >
              <Stack
                spacing="5"
                px={{
                  base: "4",
                  md: "6",
                }}
                py={{
                  base: "5",
                  md: "6",
                }}
              >
                {/*  FIRST ROW */}

                <FormControl id="model_id" isRequired>
                  <FormLabel>Model</FormLabel>
                  <Select name="model_id" onChange={_handleChange}>
                    <option hidden={true}>Select a model</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.model_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {/*  SECOND ROW */}

                <Stack
                  spacing="6"
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl id="serial_num">
                    <FormLabel>Serial Number</FormLabel>
                    <Input
                      type="text"
                      name="serial_num"
                      placeholder="Type in or scan barcode"
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="specification">
                    <FormLabel>Specification</FormLabel>
                    <Input
                      type="text"
                      name="specification"
                      placeholder="Size, colour, length, etc."
                      onInput={_handleChange}
                    />
                  </FormControl>
                </Stack>

                {/* THIRD ROW */}

                <FormControl id="firstName">
                  <FormLabel>Assign to Worker</FormLabel>
                  <Select name="worker_id" onChange={_handleChange}>
                    <option hidden={true}>Select a worker</option>
                    {workers.map((worker) => (
                      <option key={worker.id} value={worker.id}>
                        {worker.first_name} {worker.last_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {/* FOURTH ROW */}
                <Stack
                  spacing="6"
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl id="manufacture_date">
                    <FormLabel>Date Of Manufacture</FormLabel>
                    <Input
                      name="manufacture_date"
                      type="date"
                      placeholder="Not recorded"
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="date_of_first_use">
                    <FormLabel>Date of First Use</FormLabel>
                    <Input
                      name="date_of_first_use"
                      type="date"
                      placeholder="Has not occurred yet"
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="end_of_life">
                    <FormLabel>Lifespan To</FormLabel>
                    <Input
                      name="end_of_life"
                      type="date"
                      placeholder="Unlimited"
                      onInput={_handleChange}
                    />
                  </FormControl>
                </Stack>
              </Stack>
              <Divider />
              <Flex
                direction="row-reverse"
                py="4"
                px={{
                  base: "4",
                  md: "6",
                }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  rightIcon={<FiPlus />}
                  onClick={_handleSubmit}
                >
                  Add
                </Button>
              </Flex>
            </Box>
            {/* </form> */}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
