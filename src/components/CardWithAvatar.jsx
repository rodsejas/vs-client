import { Avatar, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

export const CardWithAvatar = (props) => {
  const { children, avatarProps } = props;
  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      padding="8"
      position="relative"
      bg={useColorModeValue("white", "gray.700")}
      shadow={{
        md: "base",
      }}
    >
      <Box
        position="absolute"
        inset="0"
        height="20"
        bg="blue.600"
        roundedTop="inherit"
      />
      <Avatar size="xl" src={avatarProps.photo} />
      {children}
    </Flex>
  );
};
