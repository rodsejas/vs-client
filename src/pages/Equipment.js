import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_API } from "../Constants";
import { Link as LinkRoutes } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  Stat,
  StatNumber,
  useBreakpointValue,
  StatGroup,
  StatLabel,
  Badge,
  Image,
  Avatar,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Link,
  Tr,
} from "@chakra-ui/react";

import { FiPlus } from "react-icons/fi";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [inspections, setInspections] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const _handleDelete = async (e) => {
    e.preventDefault();

    const url = `${BASE_URL}${BASE_API}/equipment/${params.id}`;
    try {
      await axios.delete(url, equipment);
      navigate(`/equipments`);
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

    const fetchInspections = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/equipment/${params.id}/inspections`
      );
      setInspections(data);
    };

    fetchEquipment();
    fetchInspections();
  }, [params.id]);

  return (
    <>
      <VStack>
        <Stack
          spacing={2}
          pt={{ base: "4", md: "8" }}
          pl={{ base: "8", md: "16" }}
          direction="row"
        >
          <Box>
            {equipment.map((e) => {
              return (
                <Image
                  src={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${e.image}`}
                  alt="Equipment Image"
                  boxSize="333.25"
                  boxShadow="sm"
                  objectFit="cover"
                  borderRadius="lg"
                  fallbackSrc="https://via.placeholder.com/300?text=No+Image+Uploaded"
                />
              );
            })}
          </Box>
          <Box
            as="section"
            // pt={{ base: "4", md: "8" }}
            // pb={{ base: "12", md: "24" }}
          >
            <Container>
              <Box
                bg="bg-surface"
                px={{ base: "4", md: "6" }}
                py="5"
                boxShadow={useColorModeValue("sm", "sm-dark")}
                borderRadius="lg"
              >
                {/* HEADING ROW */}

                {equipment.map((e) => {
                  return (
                    <>
                      <Stack
                        spacing="4"
                        direction={{ base: "column", sm: "row" }}
                        justify="space-between"
                        p="3"
                      >
                        <Stack spacing="1">
                          <HStack spacing="4">
                            <Text fontSize="xl" fontWeight="medium">
                              {e.models.manufacturer} {e.models.model_name}
                            </Text>
                            <Badge
                              colorScheme={
                                e.status === "Suitable" ? "green" : "red"
                              }
                            >
                              {e.status}
                            </Badge>
                          </HStack>
                          <Text color="muted" fontSize="sm">
                            {e.specification}
                          </Text>
                        </Stack>
                        <Stack direction="row" spacing="3">
                          <LinkRoutes to={`/equipment/${e.id}/edit`}>
                            <Button variant="primary">Edit Equipment</Button>
                          </LinkRoutes>
                          <Button colorScheme="red" onClick={_handleDelete}>
                            Delete
                          </Button>
                        </Stack>
                      </Stack>
                      <Divider />

                      {/* FIRST ROW STAT GROUP*/}

                      <StatGroup p="3">
                        <Stat>
                          <StatLabel fontSize="small" color="muted">
                            Serial Number
                          </StatLabel>
                          <StatNumber fontSize="large">
                            {e.serial_num}
                          </StatNumber>
                        </Stat>

                        <Stat>
                          <StatLabel fontSize="small" color="muted">
                            Manufacturer
                          </StatLabel>
                          <StatNumber fontSize="large">
                            {e.models.manufacturer}
                          </StatNumber>
                        </Stat>

                        <Stat>
                          <StatLabel fontSize="small" color="muted">
                            Assigned User
                          </StatLabel>
                          <StatNumber fontSize="large">
                            {e.workers.first_name} {e.workers.last_name}
                          </StatNumber>
                        </Stat>
                      </StatGroup>

                      <Divider />

                      {/* SECOND ROW STAT GROUP*/}

                      <StatGroup p="3">
                        <Stat>
                          <StatLabel fontSize="small" color="muted">
                            Date Of Manufacture
                          </StatLabel>
                          <StatNumber fontSize="large">
                            {moment(e.manufacture_date).format("MMM Do YYYY")}
                          </StatNumber>
                        </Stat>

                        <Stat>
                          <StatLabel fontSize="small" color="muted">
                            Date Of First Use
                          </StatLabel>
                          <StatNumber fontSize="large">
                            {moment(e.date_of_first_use).format("MMM Do YYYY")}
                          </StatNumber>
                        </Stat>

                        <Stat>
                          <StatLabel fontSize="small" color="muted">
                            Lifespan To
                          </StatLabel>
                          <StatNumber fontSize="large">
                            {moment(e.end_of_life).format("MMM Do YYYY")}
                          </StatNumber>
                        </Stat>
                      </StatGroup>

                      <Divider />

                      {/* THIRD ROW STAT GROUP*/}

                      <StatGroup p="3">
                        <Stat>
                          <StatLabel fontSize="small" color="muted">
                            Standards
                          </StatLabel>
                          <StatNumber fontSize="large">
                            {e.models.standards}
                          </StatNumber>
                        </Stat>

                        <Stat>
                          <StatLabel fontSize="small" color="muted">
                            Model Number
                          </StatLabel>
                          <StatNumber fontSize="large">03499</StatNumber>
                        </Stat>

                        <Stat>
                          <StatLabel fontSize="small" color="muted">
                            Next Inspection Due
                          </StatLabel>
                          <StatNumber fontSize="large">
                            {moment(e.next_inspection_due).format(
                              "MMM Do YYYY"
                            )}
                          </StatNumber>
                        </Stat>
                      </StatGroup>
                    </>
                  );
                })}
              </Box>
            </Container>
          </Box>
        </Stack>

        {/* INSPECTIONS TABLE */}

        <Container
          py={{
            base: "4",
            md: "8",
          }}
          px={{
            base: "0",
            md: 8,
          }}
        >
          <Box
            bg="bg-surface"
            boxShadow={{
              base: "none",
              md: useColorModeValue("sm", "sm-dark"),
            }}
            borderRadius={useBreakpointValue({
              base: "none",
              md: "lg",
            })}
          >
            <Stack spacing="5">
              <Box
                px={{
                  base: "4",
                  md: "6",
                }}
                pt="5"
              >
                <Stack
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                  justify="space-between"
                >
                  <Text fontSize="lg" fontWeight="medium">
                    Record of Inspections
                  </Text>
                  <LinkRoutes to={`/equipment/${params.id}/inspection/create`}>
                    <Button variant="primary" rightIcon={<FiPlus />}>
                      Add New Inspection
                    </Button>
                  </LinkRoutes>
                </Stack>
              </Box>

              {/* Inspections Table */}

              <Box overflowX="auto">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>
                        <HStack spacing="3">
                          <HStack spacing="1">
                            <Text>Inspection Record</Text>
                          </HStack>
                        </HStack>
                      </Th>
                      <Th>Date of Inspection</Th>
                      <Th>Technician</Th>
                      <Th>Notes</Th>
                      <Th>Result</Th>
                      <Th>Photos</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {inspections.map((i) => (
                      <Tr key={i.id}>
                        <Td>
                          <HStack spacing="3">
                            <Box>
                              <Text fontWeight="medium">{i.id}</Text>
                              <Text color="muted">Record ID</Text>
                            </Box>
                          </HStack>
                        </Td>
                        <Td>
                          <Text color="muted">
                            {moment(i.inspection_date).format("MMM Do YYYY")}
                          </Text>
                        </Td>
                        <Td>
                          <Text color="muted">
                            {i.workers.first_name} {i.workers.last_name}
                          </Text>
                        </Td>
                        <Td>
                          <Text color="muted">{i.notes}</Text>
                        </Td>

                        <Td>
                          <Badge colorScheme={i.has_passed ? "green" : "red"}>
                            {i.has_passed ? "Passed" : "Failed"}
                          </Badge>
                        </Td>
                        <Td>
                          {i.image ? (
                            <Link
                              href={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${i.image}`}
                              isExternal
                            >
                              <Avatar
                                src={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${i.image}`}
                              />
                            </Link>
                          ) : (
                            "No image"
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
              <Box
                px={{
                  base: "4",
                  md: "6",
                }}
                pb="5"
              >
                <HStack spacing="3" justify="space-between">
                  {!isMobile && (
                    <Text color="muted" fontSize="sm">
                      Showing {inspections.length} results
                    </Text>
                  )}
                </HStack>
              </Box>
            </Stack>
          </Box>
        </Container>
      </VStack>
    </>
  );
}
