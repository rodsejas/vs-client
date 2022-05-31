import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
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
  InputRightAddon,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export default function NewModel(props) {
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

    let imageData;
    let manualData;

    if (image) {
      // if image is uploaded - post it to supabase
      const { data, error } = await supabase.storage
        .from("vs")
        .upload(`models/${Date.now()}_${image.name}`, image);

      if (error) {
        console.log(error);
      }

      if (data) {
        imageData = data.Key;
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
        manualData = data.Key;
      }
    }

    postData = { ...postData, image: imageData, manual: manualData };

    const url = `${BASE_URL}${BASE_API}/models`;
    try {
      await axios.post(url, postData);
      navigate(`/models`);
    } catch (error) {
      console.log(error);
    }
  };

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
            justify="space-between"
          >
            <Box flexShrink={1}>
              <Text fontSize="lg" fontWeight="medium">
                Add Model To Inventory
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
                <Stack
                  spacing="6"
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl id="model_num" isRequired>
                    <FormLabel>Model Number</FormLabel>
                    <Input
                      type="text"
                      name="model_num"
                      placeholder="03278"
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="model_name" isRequired>
                    <FormLabel>Model Name</FormLabel>
                    <Input
                      type="text"
                      name="model_name"
                      placeholder="Condor Screw"
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
                  <FormControl id="standards">
                    <FormLabel>Standards</FormLabel>
                    <Input
                      type="text"
                      name="standards"
                      placeholder="EN 12275, EN 362"
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="lifespan_from_manufacture" isRequired>
                    <FormLabel>Lifespan from Manufacture</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="120"
                        name="lifespan_from_manufacture"
                        required
                        onInput={_handleChange}
                      />
                      <InputRightAddon children="months" />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="inspection_frequency" isRequired>
                    <FormLabel>Inspection Frequency</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        min="0"
                        max="12"
                        step="1"
                        placeholder="3"
                        name="inspection_frequency"
                        required
                        onInput={_handleChange}
                      />
                      <InputRightAddon children="months" />
                    </InputGroup>
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

                  <FormControl id="manual">
                    <FormLabel>Manual</FormLabel>
                    <Input
                      name="manual"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setManual(e.target.files[0])}
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
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
