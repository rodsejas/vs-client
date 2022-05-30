import {
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Card } from "../components/Card";

const Home = () => {
  return (
    <>
      <Container py="8" flex="1">
        <Stack
          spacing={{
            base: "8",
            lg: "6",
          }}
        >
          <Stack
            spacing="4"
            direction={{
              base: "column",
              lg: "row",
            }}
            justify="space-between"
            align={{
              base: "start",
              lg: "center",
            }}
          >
            <Stack spacing="1">
              <Heading
                size={useBreakpointValue({
                  base: "xs",
                  lg: "sm",
                })}
                fontWeight="medium"
                textAlign="left"
              >
                Dashboard
              </Heading>
              <Text color="muted">Metrics at a glance</Text>
            </Stack>
          </Stack>
          <Stack
            spacing={{
              base: "5",
              lg: "6",
            }}
          >
            <SimpleGrid
              columns={{
                base: 1,
                md: 3,
              }}
              gap="6"
            >
              <Card />
              <Card />
              <Card />
            </SimpleGrid>
          </Stack>
          <Card minH="sm" />
        </Stack>
      </Container>
    </>
  );
};

export default Home;
