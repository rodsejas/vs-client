import axios from "axios";
import { BASE_URL, BASE_API } from "../Constants";
import { useState, useEffect } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { CardWithAvatar } from "../components/CardWithAvatar";
import { UserInfo } from "../components/UserInfo";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkers = () => {
    axios
      .get(`${BASE_URL}${BASE_API}/workers`)
      .then((res) => setWorkers(res.data))
      .catch((err) => setError(err.message))
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  if (workers.length === 0) {
    return <LoadingSpinner />;
  }

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
}
