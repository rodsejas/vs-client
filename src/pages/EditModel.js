import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Image,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export default function EditModel(props) {
  const [model, setModel] = useState({});
  const [image, setImage] = useState(null);
  const [manual, setManual] = useState(null);

  const params = useParams();
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

    const url = `${BASE_URL}${BASE_API}/model/${params.id}/edit`;
    try {
      await axios.put(url, postData);
      navigate(`/models`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/model/${params.id}`
      );
      const model = data[0];
      setModel(model);
    };
    fetchModel();
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
            justify="space-around"
          >
            <Box flexShrink={1}>
              <Text fontSize="lg" fontWeight="medium">
                Edit Model
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
                      defaultValue={model.model_num}
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="model_name" isRequired>
                    <FormLabel>Model Name</FormLabel>
                    <Input
                      type="text"
                      name="model_name"
                      placeholder="Condor Screw"
                      defaultValue={model.model_name}
                      onInput={_handleChange}
                    />
                  </FormControl>
                  <FormControl id="manufacturer" isRequired>
                    <FormLabel>Manufacturer</FormLabel>
                    <Input
                      type="text"
                      name="manufacturer"
                      placeholder="Ocun"
                      defaultValue={model.manufacturer}
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
                      defaultValue={model.standards}
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
                        defaultValue={model.lifespan_from_manufacture}
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
                        defaultValue={model.inspection_frequency}
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
                  <FormControl>
                    <FormLabel>Image</FormLabel>

                    <Box>
                      {model.image ? (
                        <>
                          <Image
                            src={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${model.image}`}
                            alt="model-img"
                            boxSize="300"
                          />
                          {model.image.split("").slice(24).join("")}
                        </>
                      ) : (
                        <Image
                          src="https://via.placeholder.com/300"
                          alt="model-img"
                          boxSize="300"
                        />
                      )}
                    </Box>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Manual</FormLabel>
                    {model.manual ? (
                      <>
                        <a
                          href={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${model.manual}`}
                          target="_blank"
                          rel="noopener noreferrer" // added to remove warnings related to target=_blank
                        >
                          <Image
                            alt="thumbanil-files"
                            src="https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/thumbnails/file-thumbnail.png"
                            boxSize="300"
                            fallbackSrc="https://via.placeholder.com/300"
                          />
                          {model.manual.split("").slice(24).join("")}{" "}
                        </a>

                        {/* To show the file name */}
                      </>
                    ) : (
                      <Image
                        alt="thumbanil-files"
                        boxSize="300"
                        src="https://via.placeholder.com/300"
                      />
                    )}
                  </FormControl>
                </Stack>

                {/* FOURTH ROW */}
                <Stack
                  spacing="6"
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl id="image">
                    <FormLabel>Upload Image</FormLabel>
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
                    <FormLabel>Upload Manual</FormLabel>
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
                  Update
                </Button>
              </Flex>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
