import {
  Container,
  Heading,
  Stack,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import Feature from "../components/Feature";

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
            title="Equipment passports."
            desc="Each equipment has its own passport with all relevant data about the history of its use and made revisions."
            imgSrc="https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/icons/icons8-passport-64.png"
          />
          <Feature
            title="Full traceability."
            desc="All changes in the electronic evidence are retrievable - who and when inserted, edited or deleted particular record."
            imgSrc="https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/icons/icons8-search-property-96.png?t=2022-11-18T05%3A12%3A31.662Z"
          />
          <Feature
            title="Photo documentation."
            desc="The image visualization of each product makes the job and equipment identification easier for users, inspectors and other staff."
            imgSrc="https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/icons/icons8-collectibles-96.png?t=2022-11-18T05%3A18%3A12.435Z"
          />
          <Feature
            title="User manuals."
            desc="The catalogue contains beside basic information, parameters and photos of specific equipment also detailed user manuals. The user has all the information in one place and always available."
            imgSrc="https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/icons/icons8-user-manual-96.png?t=2022-11-18T05%3A23%3A16.544Z"
          />
          <Feature
            title="Legislative compliance."
            desc="Each equipment has its own passport with all relevant data about the history of its use and made revisions."
            imgSrc="https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/icons/icons8-policy-document-96.png?t=2022-11-18T05%3A17%3A44.958Z"
          />
          <Feature
            title="Access from anywhere."
            desc="Through smart mobile phone or tablet it is possible to enter the system from anywhere (eg. directly at the workplace) and immediately establish the capability of assigned work equipment or to get the equipment's documentation."
            imgSrc="https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/vs/icons/icons8-responsive-64.png"
          />
        </SimpleGrid>
      </Stack>
    </Container>
    // </Flex>
  );
};

export default Home;
