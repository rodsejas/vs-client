import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase";
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
  InputGroup,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export default function NewInspection(props) {
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
          >
            <Box flexShrink={1}>
              <Text fontSize="lg" fontWeight="medium">
                Inspection record
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
                {/*  ZEROTH ROW */}
                <Stack
                  spacing="6"
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl id="note" isRequired>
                    <FormLabel>Note</FormLabel>
                    <RadioGroup defaultValue="2">
                      <Stack spacing={5} direction="row">
                        <Radio
                          colorScheme="green"
                          name="status"
                          value="true"
                          onChange={_handleRadioInput}
                        >
                          Suitable
                        </Radio>
                        <Radio
                          colorScheme="red"
                          name="status"
                          value="false"
                          onChange={_handleRadioInput}
                        >
                          Not suitable
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Stack>

                {/*  FIRST ROW */}
                <Stack
                  spacing="6"
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl id="noote" isRequired>
                    <FormLabel>Note</FormLabel>
                    <Textarea
                      placeholder="Enter the inspection notes.."
                      type="text"
                      name="notes"
                      onInput={_handleChange}
                    />
                  </FormControl>
                </Stack>

                {/*  SECOND ROW */}

                <Stack
                  spacing="6"
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl id="manufacture_date" isRequired>
                    <FormLabel>Date of inspection </FormLabel>
                    <Input
                      name="inspection_date"
                      type="date"
                      placeholder="Not recorded"
                      max={`${moment().format("YYYY-MM-DD")}`}
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="worker_id" isRequired>
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
                </Stack>

                {/* THIRD ROW */}
                <Stack
                  spacing="6"
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl id="image">
                    <FormLabel>Image</FormLabel>
                    <InputGroup>
                      <Input
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </InputGroup>
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
                  Confirm
                </Button>
              </Flex>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
