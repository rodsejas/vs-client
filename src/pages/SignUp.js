import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  DarkMode,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Image,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { SignUpForm } from "../components/SignUpForm.jsx";
import React from "react";

export default function SignUp() {
  return (
    // <form onSubmit={_handleSubmit}>
    //   <label>
    //     <p>Email address</p>
    //     <input type="email" onChange={_handleEmailChange} value={email} />
    //   </label>
    //   <label>
    //     <p>Password</p>
    //     <input
    //       type="password"
    //       onChange={_handlePasswordChange}
    //       value={password}
    //     />
    //   </label>
    //   <br />
    //   <button type="submit">Sign Up</button>
    // </form>
    <Flex
      minH={{
        base: "auto",
        md: "100vh",
      }}
      bgGradient={useBreakpointValue({
        md: mode(
          "linear(to-r, blue.600 50%, white 50%)",
          "linear(to-r, blue.600 50%, gray.900 50%)"
        ),
      })}
    >
      <Flex maxW="8xl" mx="auto" width="full">
        <Box
          flex="1"
          display={{
            base: "none",
            md: "block",
          }}
        >
          <DarkMode>
            <Flex
              direction="column"
              px={{
                base: "4",
                md: "8",
              }}
              height="full"
              color="on-accent"
            >
              <Flex align="center" h="24">
                <Box boxSize="10" m="5">
                  <Image
                    src="images/logo.png"
                    alt="Vertical Safety"
                    objectFit="cover"
                  />
                </Box>
              </Flex>
              <Flex flex="1" align="center">
                <Stack spacing="8">
                  <Stack spacing="6">
                    <Heading
                      size={useBreakpointValue({
                        md: "lg",
                        xl: "xl",
                      })}
                    >
                      Make compliance a top priority.
                    </Heading>
                    <Text fontSize="lg" maxW="md" fontWeight="medium">
                      Create an account and discover a simple and powerful
                      cloud-based platform to manage your assets and equipment
                      efficiently.
                    </Text>
                  </Stack>
                  <HStack spacing="4">
                    <AvatarGroup
                      size="md"
                      max={useBreakpointValue({
                        base: 2,
                        lg: 5,
                      })}
                      borderColor="on-accent"
                    >
                      <Avatar
                        name="Ryan Florence"
                        src="https://bit.ly/ryan-florence"
                      />
                      <Avatar
                        name="Segun Adebayo"
                        src="https://bit.ly/sage-adebayo"
                      />
                      <Avatar
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                      />
                      <Avatar
                        name="Prosper Otemuyiwa"
                        src="https://bit.ly/prosper-baba"
                      />
                      <Avatar
                        name="Christian Nwamba"
                        src="https://bit.ly/code-beast"
                      />
                    </AvatarGroup>
                    <Text fontWeight="medium">
                      13,000+ inspections completed
                    </Text>
                  </HStack>
                </Stack>
              </Flex>
              <Flex align="center" h="24">
                <Text color="on-accent-subtle" fontSize="sm">
                  © 2022 Vertical Safety. All rights reserved.
                </Text>
              </Flex>
            </Flex>
          </DarkMode>
        </Box>
        <Center flex="1">
          <SignUpForm
            px={{
              base: "4",
              md: "8",
            }}
            py={{
              base: "12",
              md: "48",
            }}
            width="full"
            maxW="md"
          />
        </Center>
      </Flex>
    </Flex>
  );
}
