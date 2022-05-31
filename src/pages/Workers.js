import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  SimpleGrid,
  Stack,
  Skeleton,
  Container,
} from "@chakra-ui/react";
import { CardWithAvatar } from "../components/CardWithAvatar";
import { UserInfo } from "../components/UserInfo";

export default function Workers() {
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    const { data } = await axios.get(`${BASE_URL}${BASE_API}/workers`);
    setWorkers(data);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  if (workers.length !== 0) {
    return (
      <Box px={{ base: "6", md: "8" }} py="12">
        <Box as="section" maxW={{ base: "xs", md: "3xl" }} mx="auto">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
            {workers.map((worker) => {
              const { first_name, last_name } = worker;
              return (
                <CardWithAvatar key={first_name} avatarProps={{ first_name }}>
                  <UserInfo
                    mt="3"
                    first_name={first_name}
                    last_name={last_name}
                  />
                  <Link key={worker.id} to={`/worker/${worker.id}`}>
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      rounded="full"
                      size="sm"
                      width="full"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                </CardWithAvatar>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>
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
                    width="75vw"
                    startColor="#8fadc9"
                    endColor="#cadbeb"
                  />
                  <Skeleton
                    height="25px"
                    width="75vw"
                    startColor="#8fadc9"
                    endColor="#cadbeb"
                  />
                  <Skeleton
                    height="25px"
                    width="75vw"
                    startColor="#8fadc9"
                    endColor="#cadbeb"
                  />
                  <Skeleton
                    height="25px"
                    width="75vw"
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
