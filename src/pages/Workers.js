import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { CardWithAvatar } from "../components/CardWithAvatar";
import { UserInfo } from "../components/UserInfo";
import LoadingSpinner from "../components/LoadingSpinner";

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
      <Box px={{ base: "6", md: "8" }} py="12" flex="1" overflowX="auto">
        <Box as="section" maxW={{ base: "xs", md: "3xl" }} mx="auto">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
            {workers.map(
              ({ first_name, last_name, email_id, phone_num, photo }) => {
                return (
                  <CardWithAvatar key={first_name} avatarProps={{ photo }}>
                    <UserInfo
                      mt="3"
                      first_name={first_name}
                      last_name={last_name}
                    />
                    <Text>{email_id}</Text>
                    <Text>{phone_num}</Text>
                  </CardWithAvatar>
                );
              }
            )}
          </SimpleGrid>
        </Box>
      </Box>
    );
  } else {
    {
      /* LOADING */
    }

    return <LoadingSpinner />;
  }
}
