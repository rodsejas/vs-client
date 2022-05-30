import React from "react";
// import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_API } from "../Constants";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Stat,
  StatNumber,
  StatGroup,
  StatLabel,
  Badge,
  Image,
} from "@chakra-ui/react";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [inspections, setInspections] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

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
    // <div>
    //   {equipment.map((e) => {
    //     return (
    //       <div key={e.id}>
    //         <p>Serial num: {e.serial_num}</p>
    //         <p>Manufacture date: {e.manufacture_date}</p>
    //         <p>End of Life: {e.end_of_life}</p>
    //         <p>Next Inspection Due : {e.next_inspection_due}</p>
    //         <p>Specification: {e.specification}</p>
    //         <p>Status {e.status}</p>
    //         {e.workers !== null ? (
    //           <p>
    //             {e.workers.first_name} {e.workers.last_name}
    //           </p>
    //         ) : (
    //           <p>No worker assigned</p>
    //         )}
    //         <Link to={`/equipment/${e.id}/edit`}>
    //           <button>Edit Equipment</button>
    //         </Link>
    //         <button onClick={_handleDelete}>Delete Equipment</button>
    //         <Link to={`/equipment/${e.id}/inspection/create`}>
    //           <button> New Inspection</button>
    //         </Link>
    //         {inspections.map((i) => {
    //           return (
    //             <Link key={i.id} to={`/inspection/${i.id}`}>
    //               <p>Inspection Date: {i.inspection_date}</p>
    //               <p>
    //                 Technician: {i.workers.first_name} {i.workers.last_name}
    //               </p>
    //               <p>Notes: {i.notes}</p>
    //               <p>Result: {i.has_passed ? "Suitable" : "Not Suitable"}</p>
    //             </Link>
    //           );
    //         })}
    //       </div>
    //     );
    //   })}
    // </div>
    <>
      <Stack
        spacing={2}
        pt={{ base: "4", md: "8" }}
        pl={{ base: "8", md: "16" }}
        direction="row"
      >
        <Box>
          <Image
            src="https://www.climbinganchors.com.au/assets/full/OCUNWBQ.jpg?20210309033228"
            alt="Harness"
            boxSize="333.25"
            boxShadow={useColorModeValue("sm", "sm-dark")}
            objectFit="cover"
            borderRadius="lg"
            fallbackSrc="https://via.placeholder.com/300"
          />
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
                            Ocun {e.models.model_name}
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
                        <Link to={`/equipment/${e.id}/edit`}>
                          <Button variant="primary">Edit Equipment</Button>
                        </Link>
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
                        <StatNumber fontSize="large">{e.serial_num}</StatNumber>
                      </Stat>

                      <Stat>
                        <StatLabel fontSize="small" color="muted">
                          Manufacturer
                        </StatLabel>
                        <StatNumber fontSize="large">Ocun</StatNumber>
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
                          {e.manufacture_date}
                        </StatNumber>
                      </Stat>

                      <Stat>
                        <StatLabel fontSize="small" color="muted">
                          Date Of First Use
                        </StatLabel>
                        <StatNumber fontSize="large">May 26 2022</StatNumber>
                      </Stat>

                      <Stat>
                        <StatLabel fontSize="small" color="muted">
                          Lifespan To
                        </StatLabel>
                        <StatNumber fontSize="large">May 26 2032</StatNumber>
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
                          EN 354, EN 795, EN 566{" "}
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
                          {e.next_inspection_due}
                        </StatNumber>
                      </Stat>
                    </StatGroup>
                    {/* <Divider /> */}
                    {/* <Link to={`/equipment/${e.id}/inspection/create`}>
                      <button> New Inspection</button>
                    </Link> */}

                    {/* INSPECTIONS TABLE */}

                    {/* {inspections.map((i) => {
                      return (
                        <Link key={i.id} to={`/inspection/${i.id}`}>
                          <p>Inspection Date: {i.inspection_date}</p>
                          <p>
                            Technician: {i.workers.first_name}{" "}
                            {i.workers.last_name}
                          </p>
                          <p>Notes: {i.notes}</p>
                          <p>
                            Result: {i.has_passed ? "Suitable" : "Not Suitable"}
                          </p>
                        </Link>
                      );
                    })} */}
                  </>
                );
              })}
            </Box>
          </Container>
        </Box>
      </Stack>
    </>
  );
}
