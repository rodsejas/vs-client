import {
  Container,
  Heading,
  Stack,
  Grid,
  Box,
  IconButton,
  VStack,
  GridItem,
  SimpleGrid,
  Text,
  Flex,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { Card } from "../components/Card";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FiUsers, FiCalendar, FiDelete, FiDatabase } from "react-icons/fi";

function Feature({ title, desc, icon, ...rest }) {
  return (
    <Card p={5} shadow="md" borderWidth="1px" {...rest}>
      {/* <Stack direction="row" spacing="3" justify="space-between"> */}
      <IconButton
        variant="solid"
        colorScheme="gray"
        aria-label={title}
        fontSize="1.5rem"
        size="lg"
        padding="3"
        icon={icon}
      />
      <Heading fontSize="xl">{title}</Heading>

      {/* </Stack> */}
      <Text mt={4}>{desc}</Text>
    </Card>
  );
}

const Home = () => {
  return (
    // <Flex
    //   as="section"
    //   direction={{
    //     base: "column",
    //     lg: "row",
    //   }}
    //   height="100vh"
    //   bg="bg-canvas"
    //   overflowY="auto"
    // >
    <Container py="8" flex="1">
      <Stack
        spacing={{
          base: "8",
          lg: "6",
        }}
        overflowY="auto"
        maxHeight="90vh"
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
              Why Vertical Space?
            </Heading>
            <Text color="muted">Features at a glance.</Text>
          </Stack>
        </Stack>
        <SimpleGrid columns={2} rows={3} gap="3">
          <Feature
            title="Clean interface."
            desc="Vertical Safety guides you through your equipment register but never stands in your way. No clutter and a clear visual language."
            icon={<FiCalendar />}
          />
          <Feature
            title="Access from anywhere."
            desc="Through smart mobile phone or tablet it is possible to enter the system from anywhere (eg. directly at the workplace) and immediately establish the capability of assigned work equipment or to get the equipment's documentation."
          />
          <Feature
            title="Equipment passports."
            desc="Each equipment has its own passport with all relevant data about the history of its use and made revisions."
          />
          <Feature
            title="Photo documentation and user manuals."
            desc="The image visualization of each product makes the job and equipment identification easier for users, inspectors and other staff. The catalogue contains beside basic information, parameters and photos of specific equipment also detailed user manuals. The user has all the information in one place and always available."
          />
          <Feature
            title="Full traceability."
            desc="All changes in the electronic evidence are retrievable - who and when inserted, edited or deleted particular record."
          />
          <Feature
            title="Legislative compliance."
            desc="Each equipment has its own passport with all relevant data about the history of its use and made revisions."
          />
        </SimpleGrid>
        {/* <Grid
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(3, 1fr)"
            gap={0}
            height="200"
          >
            <GridItem w="100%" bg="blue.500">
              Grid 1
            </GridItem>
            <GridItem w="100%" bg="red.500" />
            <GridItem w="100%" bg="red.500" />
            <GridItem w="100%" bg="blue.500" />
            <GridItem w="100%" bg="blue.500" />
            <GridItem w="100%" bg="red.500" /> */}

        {/* <GridItem w="100%" h="230" p="7">
              <VStack spacing={4} align="stretch">
                <Box h="70">
                  <Stack direction="row" spacing="3" justify="space-between">
                    <IconButton
                      variant="solid"
                      colorScheme="purple"
                      aria-label="Users"
                      fontSize="1.5rem"
                      size="lg"
                      padding="5"
                      icon={<FiCalendar />}
                    />
                    <IconButton
                      aria-label="Search database"
                      size="lg"
                      icon={<ExternalLinkIcon />}
                    />
                  </Stack>
                </Box>
                <Box h="130">
                  <Text fontSize="lg" fontWeight="medium" align="left" mb="3">
                    Schedule An Inspection
                  </Text>
                  <Text color="muted" fontSize="sm" noOfLines={3}>
                    Scheduling of future inspections for an equipment. Ability
                    to set custom schedules for inspections and assign it to a
                    worker. The worker is notified of an upcoming inspection
                    prior to a week.
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem
              w="100%"
              h="230"
              p="7"
              borderLeft="2px"
              borderColor="gray.200"
            >
              <VStack spacing={4} align="stretch">
                <Box h="70">
                  <Stack direction="row" spacing="3" justify="space-between">
                    <IconButton
                      variant="solid"
                      colorScheme="red"
                      aria-label="Users"
                      fontSize="1.5rem"
                      size="lg"
                      p="5"
                      icon={<FiDelete />}
                    />
                    <IconButton
                      aria-label="Search database"
                      size="lg"
                      icon={<ExternalLinkIcon />}
                    />
                  </Stack>
                </Box>
                <Box h="130">
                  <Text fontSize="lg" fontWeight="medium" align="left" mb="3">
                    Manage Deletion of Associated Inspections
                  </Text>
                  <Text color="muted" fontSize="sm" noOfLines={3}>
                    Deletion of equipment is constrained by foreign key
                    associations. Adding support to delete all inspection
                    records of an equipment when the equipment is deleted. This
                    also extends to deleting all the equipment records
                    associated with models when the specific model is deleted.
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem
              w="100%"
              h="230"
              p="7"
              borderTop="2px"
              borderColor="gray.200"
            >
              <VStack spacing={4} align="stretch">
                <Box h="70">
                  <Stack direction="row" spacing="3" justify="space-between">
                    <IconButton
                      variant="solid"
                      colorScheme="teal"
                      aria-label="Users"
                      fontSize="30px"
                      size="lg"
                      p="5"
                      icon={<FiUsers />}
                    />
                    <IconButton
                      aria-label="Search database"
                      size="lg"
                      icon={<ExternalLinkIcon />}
                    />
                  </Stack>
                </Box>
                <Box h="130">
                  <Text fontSize="lg" fontWeight="medium" align="left" mb="3">
                    Manage Users
                  </Text>
                  <Text color="muted" fontSize="sm" noOfLines={3}>
                    Introduce form validations at sign up form and capture
                    metadata (phone number, name, etc). Allow user to edit
                    email, password, and other details in a settings dashboard.
                    Ability to invite a worker as an app user.
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem
              w="100%"
              h="230"
              p="7"
              borderTop="2px"
              borderLeft="2px"
              borderColor="gray.200"
            >
              <VStack spacing={4} align="stretch">
                <Box h="70">
                  <Stack direction="row" spacing="3" justify="space-between">
                    <IconButton
                      variant="solid"
                      colorScheme="yellow"
                      aria-label="Users"
                      fontSize="30px"
                      size="lg"
                      p="5"
                      icon={<FiDatabase />}
                    />
                    <IconButton
                      aria-label="Search database"
                      size="lg"
                      icon={<ExternalLinkIcon />}
                    />
                  </Stack>
                </Box>
                <Box h="130">
                  <Text fontSize="lg" fontWeight="medium" align="left" mb="3">
                    Create an organisation
                  </Text>
                  <Text color="muted" fontSize="sm" noOfLines={3}>
                    Support for creating organisations with their associated
                    workers and assets. Extends the ability to invite workers
                    into an org, and reveal statistics associated with their
                    maintenance compliance.
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem
              w="100%"
              h="230"
              p="7"
              borderTop="2px"
              borderColor="gray.200"
            >
              <VStack spacing={4} align="stretch">
                <Box h="70">
                  <Stack direction="row" spacing="3" justify="space-between">
                    <IconButton
                      variant="solid"
                      colorScheme="blue"
                      aria-label="Users"
                      fontSize="30px"
                      size="lg"
                      p="5"
                      icon={<FiCalendar />}
                    />
                    <IconButton
                      aria-label="Search database"
                      size="lg"
                      icon={<ExternalLinkIcon />}
                    />
                  </Stack>
                </Box>
                <Box h="130">
                  <Text fontSize="lg" fontWeight="medium" align="left" mb="3">
                    Categorisation
                  </Text>
                  <Text color="muted" fontSize="sm" noOfLines={3}>
                    Broad use of categories and reusable tags against equipment.
                    Support creation of "kits", with use cases such as confined
                    space rescue, roofer kits, etc.
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem
              w="100%"
              h="230"
              p="7"
              borderLeft="2px"
              borderTop="2px"
              borderColor="gray.200"
            >
              <Stack spacing="5">
                <Stack spacing="1">
                  <Text fontSize="lg" fontWeight="medium">
                    Share VS with friends
                  </Text>
                  <Text fontSize="sm" color="muted">
                    Except don't, because it's still a work in progress.
                  </Text>
                </Stack>
                <Stack spacing="3" direction={{ base: "column", sm: "row" }}>
                  <Button
                    variant="secondary"
                    leftIcon={<FacebookIcon boxSize="5" />}
                    iconSpacing="3"
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="secondary"
                    leftIcon={<TwitterIcon boxSize="5" />}
                    iconSpacing="3"
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="secondary"
                    leftIcon={<WhatsAppIcon boxSize="5" />}
                    iconSpacing="3"
                  >
                    WhatsApp
                  </Button>
                </Stack>
              </Stack>
            </GridItem> */}
        {/* </Grid> */}
      </Stack>
    </Container>
    // </Flex>
  );
};

export default Home;
