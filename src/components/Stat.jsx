import {
  Box,
  Heading,
  Stack,
  Text,
  Badge,
  HStack,
  Icon,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiMoreVertical,
} from "react-icons/fi";

export const Stat = (props) => {
  const { label, value, delta, ...boxProps } = props;
  return (
    <Box
      px={{
        base: "4",
        md: "6",
      }}
      py={{
        base: "5",
        md: "6",
      }}
      bg="bg-surface"
      borderRadius="lg"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      {...boxProps}
    >
      <Stack>
        <HStack justify="space-between">
          <Text fontSize="sm" color="muted">
            {label}
          </Text>
          <Icon as={FiMoreVertical} boxSize="5" color="muted" />
        </HStack>
        <HStack justify="space-between">
          <Heading
            size={useBreakpointValue({
              base: "sm",
              md: "md",
            })}
          >
            {value}
          </Heading>
          <Badge
            variant="subtle"
            colorScheme={delta.isUpwardsTrend ? "green" : "red"}
          >
            <HStack spacing="1">
              <Icon
                as={delta.isUpwardsTrend ? FiArrowUpRight : FiArrowDownRight}
              />
              <Text>{delta.value}</Text>
            </HStack>
          </Badge>
        </HStack>
      </Stack>
    </Box>
    // <Box
    //   px={{
    //     base: "4",
    //     md: "6",
    //   }}
    //   py={{
    //     base: "5",
    //     md: "6",
    //   }}
    //   bg="bg-surface"
    //   borderRadius="lg"
    //   boxShadow={useColorModeValue("sm", "sm-dark")}
    //   {...boxProps}
    // >
    //   <Stack>
    //     <Text fontSize="sm" color="muted">
    //       {label}
    //     </Text>
    //     <Heading
    //       size={useBreakpointValue({
    //         base: "sm",
    //         md: "md",
    //       })}
    //     >
    //       {value}
    //     </Heading>
    //   </Stack>
    // </Box>
  );
};
