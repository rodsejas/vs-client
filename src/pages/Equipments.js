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

  if (equipments.length !== 0) {
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
                    Equipment List
                  </Text>
                  <Link to={`/equipment/create`}>
                    <Button variant="primary" rightIcon={<FiPlus />}>
                      Add New Equipment
                    </Button>
                  </Link>
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
                      Showing {equipments.length} results
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
    return (
      <div>
        {/* LOADING TABLE */}

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
              ></Box>
              <Box overflowX="auto" p="10px">
                <Stack>
                  <Skeleton
                    height="25px"
                    width="60vw"
                    startColor="#8fadc9"
                    endColor="#cadbeb"
                  />
                  <Skeleton
                    height="25px"
                    width="60vw"
                    startColor="#8fadc9"
                    endColor="#cadbeb"
                  />
                  <Skeleton
                    height="25px"
                    width="60vw"
                    startColor="#8fadc9"
                    endColor="#cadbeb"
                  />
                  <Skeleton
                    height="25px"
                    width="60vw"
                    startColor="#8fadc9"
                    endColor="#cadbeb"
                  />
                </Stack>
              </Box>
              <Box
                px={{
                  base: "4",
                  md: "6",
                }}
                pb="5"
              ></Box>
            </Stack>
          </Box>
        </Container>
      </div>
    );
  }
}
