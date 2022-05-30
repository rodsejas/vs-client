import {
  Button,
  //   Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Image,
  Text,
  Checkbox,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import * as React from "react";
// import { Logo } from "./Logo";

export const SignUpForm = (props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Stack spacing="8" {...props}>
      <Stack spacing="6">
        {isMobile && <Image src="/images/logo_blue.png" />}
        <Stack
          spacing={{
            base: "2",
            md: "3",
          }}
          textAlign="center"
        >
          <Heading
            size={useBreakpointValue({
              base: "xs",
              md: "sm",
            })}
          >
            Create an account
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Already have an account?</Text>
            <Link to="/signin">
              <Button variant="link" colorScheme="blue">
                Log in
              </Button>
            </Link>
          </HStack>
        </Stack>
      </Stack>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" placeholder="Enter your email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" placeholder="********" type="password" />
            <FormHelperText color="muted">
              At least 8 characters long
            </FormHelperText>
          </FormControl>
        </Stack>
        <Checkbox defaultChecked>Remember me</Checkbox>
        <Stack spacing="4">
          <Button variant="primary">Create account</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
