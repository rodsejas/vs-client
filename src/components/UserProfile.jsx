import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import * as React from "react";

export const UserProfile = (props) => {
  const { name, image, email } = props;
  return (
    <HStack spacing="3" ps="2">
      <Avatar name={name} src={image} boxSize="10" />
      <Box>
        <Text
          color="on-accent"
          fontWeight="medium"
          fontSize="sm"
          textAlign="left"
        >
          {name}
        </Text>
        <Text color="on-accent-muted" fontSize="sm">
          {email}
        </Text>
      </Box>
    </HStack>
  );
};
