import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

import InspectionsTable from "../components/InspectionsTable";

export default function Inspections() {
  const [inspections, setInspections] = useState([]);

  const fetchInspections = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/inspections`);
    setInspections(data);
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <>
      {/* {inspections.map((i) => {
        return (
          <Link key={i.id} to={`/inspection/${i.id}`}>
            <div>
              <p>{i.inspection_date}</p>
              <p>{i.equipments.serial_num}</p>
              <p>{i.equipments.models.model_name}</p>
              <p>
                {i.workers.first_name} {i.workers.last_name}
              </p>
              <p> {i.has_passed ? "Suitable" : "Not suitable"}</p>
              <p>.............</p>
            </div>
          </Link>
        );
      })} */}

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
                  Inspections
                </Text>
              </Stack>
            </Box>
            <Box overflowX="auto">
              <InspectionsTable inspections={inspections} />
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
