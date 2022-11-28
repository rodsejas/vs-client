import { Container, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <Container
      py={{ base: "4", md: "8" }}
      px={{
        base: "0",
        md: 8,
      }}
      flex="1"
      centerContent
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        marginTop="40"
      />
    </Container>
  );
}
