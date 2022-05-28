import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
// import { Link } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  // Icon,
  // Input,
  // InputGroup,
  // InputLeftElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import EquipmentsTable from "../components/EquipmentsTable";

export default function Equipments() {
  const [equipments, setEquipments] = useState([]);

  const fetchEquipments = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/equipments`);
    setEquipments(data);
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    // <>
    //   <Link to={`/equipment/create`}>
    //     <button>Create new equipment</button>
    //   </Link>

    //   {equipments.map((e) => {
    //     return (
    //       <Link key={e.id} to={`/equipment/${e.id}`}>
    //         <div>
    //           {e.models !== null ? (
    //             <h1>Model name: {e.models.model_name} </h1>
    //           ) : (
    //             <h1>No model assigned</h1>
    //           )}
    //           <p>Serial number: {e.serial_num}</p>
    //           {e.workers !== null ? (
    //             <p>
    //               Worker: {e.workers.first_name} {e.workers.last_name}{" "}
    //             </p>
    //           ) : (
    //             <p>No Worker assigned</p>
    //           )}
    //           <p>End of Life: {e.end_of_life}</p>
    //           <p>Next Inspection Due: {e.next_inspection_due}</p>
    //           <p>Status: {e.status}</p>
    //         </div>
    //       </Link>
    //     );
    //   })}
    // </>
    <>
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
                  Equipment List
                </Text>
                <Button variant="primary" rightIcon={<FiPlus />}>
                  Add New Equipment
                </Button>
              </Stack>
            </Box>
            <Box overflowX="auto">
              <EquipmentsTable equipments={equipments} />
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
                    Showing 1 to 5 of 42 results
                  </Text>
                )}
                <ButtonGroup
                  spacing="3"
                  justifyContent="space-between"
                  width={{
                    base: "full",
                    md: "auto",
                  }}
                  variant="secondary"
                >
                  <Button>Previous</Button>
                  <Button>Next</Button>
                </ButtonGroup>
              </HStack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
