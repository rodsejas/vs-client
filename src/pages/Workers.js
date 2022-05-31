import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import { Link } from "react-router-dom";
import { Box, Button, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
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

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.800")}
      px={{ base: "6", md: "8" }}
      py="12"
    >
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
}
