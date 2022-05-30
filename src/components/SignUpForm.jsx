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
import { useState } from "react";
import { supabase } from "../supabase";

export const SignUpForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("Email", email);
  console.log("Password", password);

  const _handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const _handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log({ user, session, error });
  };

  return (
    <Stack spacing="8" {...props}>
      <Stack spacing="6">
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
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              onChange={_handleEmailChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              placeholder="********"
              type="password"
              onChange={_handlePasswordChange}
            />
            <FormHelperText color="muted">
              At least 6 characters long
            </FormHelperText>
          </FormControl>
        </Stack>
        <Stack spacing="4">
          <Button variant="primary" onClick={_handleSubmit}>
            Create account
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
