import {
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { HiBadgeCheck } from "react-icons/hi";

export const UserInfo = (props) => {
  const { first_name, last_name, isVerified, bio, ...stackProps } = props;
  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack>
        <Text fontWeight="bold">
          {first_name} {last_name}
        </Text>
        {isVerified && (
          <Icon
            as={HiBadgeCheck}
            color="blue.300"
            verticalAlign="text-bottom"
          />
        )}
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
