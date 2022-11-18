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
  Stack,
  Text,
  useBreakpointValue,
  InputGroup,
  Icon,
  Input,
  InputLeftElement,
  Skeleton,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner";
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

  if (inspections.length !== 0) {
    return (
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
          flex="1"
          overflowX="auto"
        >
          <Box
            bg="bg-surface"
            boxShadow={{
              base: "none",
              md: "sm",
            }}
            borderRadius={{
              base: "none",
              md: "lg",
            }}
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
                    Inspections Overview
                  </Text>

                  <InputGroup maxW="xs">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiSearch} color="muted" boxSize="5" />
                    </InputLeftElement>
                    <Input placeholder="Search" />
                  </InputGroup>
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
                      Showing {inspections.length} results
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
  } else {
    return <LoadingSpinner />;
  }
}
