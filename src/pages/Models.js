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
  Skeleton,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import ModelsTable from "../components/ModelsTable";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Models() {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/models`);
    setModels(data);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  if (models.length !== 0) {
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
                    Models Overview
                  </Text>

                  <Link to={`/model/create`}>
                    <Button variant="primary" rightIcon={<FiPlus />}>
                      Add New Model
                    </Button>
                  </Link>
                </Stack>
              </Box>
              <Box overflowX="auto">
                <ModelsTable models={models} />
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
                      Showing {models.length} results
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
