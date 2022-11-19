import { HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";

export const UserInfo = ({ first_name, last_name, bio, ...stackProps }) => {
  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack>
        <Text fontWeight="bold">
          {first_name} {last_name}
        </Text>
      </HStack>
      <Text
        fontSize="sm"
        textAlign="center"
        noOfLines={2}
        color={useColorModeValue("gray.600", "gray.400")}
      >
        {bio}
      </Text>
    </VStack>
  );
};
