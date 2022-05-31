import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditEquipment(props) {
  const [currentEquipment, setCurrentEquipment] = useState({});
  const [updatedEquipment, setUpdatedEquipment] = useState({});
  const [inspections, setInspections] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

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
   * Call all the state setter functions
   */

  // eslint-disable-next-line
  useEffect(() => {
    fetchModels();
    fetchWorkers();
    const fetchCurrentEquipment = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/equipment/${params.id}`
      );
      const equipment = data[0];
      setCurrentEquipment(equipment);
    };

    const fetchUpdatedEquipment = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/equipment/${params.id}/edit`
      );
      const equipment = data[0];
      setUpdatedEquipment(equipment);
    };

    const fetchInspections = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/equipment/${params.id}/inspections`
      );
      setInspections(data);
    };

    fetchInspections();
    fetchCurrentEquipment();
    fetchUpdatedEquipment();
  }, [params.id]);

  const _handleChange = (e) => {
    setUpdatedEquipment({
      ...updatedEquipment,
      [e.target.name]: e.target.value,
    });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    let postData;

    const setLifespanTo = (lifespanMonths) => {
      const manufacture_date = updatedEquipment.manufacture_date;
      const endDate = moment(manufacture_date)
        .add(lifespanMonths, "M")
        .format("YYYY-MM-DD");
      return endDate;
    };

    const setNextInspectionDue = (inspectionFrequency) => {
      const dateOfFirstUse = updatedEquipment.date_of_first_use;
      const endDate = moment(dateOfFirstUse)
        .add(inspectionFrequency, "M")
        .format("YYYY-MM-DD");
      return endDate;
    };

    const model_id = updatedEquipment.model_id;
    const selectedModel = models.filter((e) => e.id === Number(model_id));
    const lifespanMonths = selectedModel[0].lifespan_from_manufacture;
    const inspectionFrequency = selectedModel[0].inspection_frequency;

    if (
      updatedEquipment.manufacture_date !== currentEquipment.manufacture_date ||
      Number(updatedEquipment.model_id) !== Number(currentEquipment.model_id)
    ) {
      postData = {
        ...updatedEquipment,
        end_of_life: setLifespanTo(lifespanMonths),
      };
    } else {
      postData = { ...updatedEquipment };
    }

    if (
      updatedEquipment.date_of_first_use !== null &&
      !inspections.length > 0
    ) {
      postData = {
        ...postData,
        next_inspection_due: setNextInspectionDue(inspectionFrequency),
      };
    }

    const url = `${BASE_URL}${BASE_API}/equipment/${params.id}/edit`;
    try {
      const { data } = await axios.put(url, postData);
      const id = data[0].id;
      navigate(`/equipment/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
                Edit basic equipment data
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
                  <Select
                    name="model_id"
                    onChange={_handleChange}
                    value={
                      Object.keys(currentEquipment).length !== 0
                        ? updatedEquipment.model_id
                        : "Loading"
                    }
                  >
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
                      placeholder="Type in or scan barcode"
                      type="text"
                      name="serial_num"
                      defaultValue={currentEquipment.serial_num}
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="specification">
                    <FormLabel>Specification</FormLabel>
                    <Input
                      type="text"
                      name="specification"
                      placeholder="Size, colour, length, etc."
                      defaultValue={currentEquipment.specification}
                      onInput={_handleChange}
                    />
                  </FormControl>
                </Stack>

                {/* THIRD ROW */}

                <FormControl id="worker_id" isRequired>
                  <FormLabel>Assign to Worker</FormLabel>
                  <Select
                    name="worker_id"
                    onChange={_handleChange}
                    value={
                      Object.keys(currentEquipment).length !== 0
                        ? updatedEquipment.worker_id
                        : "Loading"
                    }
                  >
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
                  <FormControl id="manufacture_date" isRequired>
                    <FormLabel>Manufacture Date</FormLabel>
                    <Input
                      name="manufacture_date"
                      type="date"
                      placeholder="Not recorded"
                      defaultValue={currentEquipment.manufacture_date}
                      max={`${moment().format("YYYY-MM-DD")}`}
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="date_of_first_use">
                    <FormLabel>Date of First Use</FormLabel>
                    <Input
                      name="date_of_first_use"
                      type="date"
                      placeholder="Has not occurred yet"
                      defaultValue={currentEquipment.date_of_first_use}
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="end_of_life">
                    <FormLabel>Lifespan To</FormLabel>
                    <Input
                      name="end_of_life"
                      type="date"
                      placeholder="Unlimited"
                      defaultValue={currentEquipment.end_of_life}
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
                  Update
                </Button>
              </Flex>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
