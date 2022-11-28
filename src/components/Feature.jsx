import { Heading, Image, Text, Box } from "@chakra-ui/react";
import { Card } from "../components/Card";

export default function Feature({ title, desc, icon, imgSrc, ...rest }) {
  return (
    <Card p={5} shadow="md" borderWidth="1px" {...rest}>
      <Box
        borderRadius="lg"
        backgroundColor="gray.200"
        display="flex"
        p="0.25rem"
        width="12"
        height="12"
        aria-label={title}
      >
        <Image src={imgSrc} />
      </Box>
      <Heading fontSize="xl" lineHeight="2rem" paddingTop="1rem">
        {title}
      </Heading>
      <Text mt={4}>{desc}</Text>
    </Card>
  );
}
