// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../supabase";

// export default function Login(props) {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const _handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const _handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const _handleSubmit = async (e) => {
//     e.preventDefault();
//     const { user, session, error } = await supabase.auth.signIn({
//       email: email,
//       password: password,
//     });
//     if (!error && user) {
//       props.setIsLoggedIn(true);
//       navigate("/");
//     }
//     console.log({ user, session, error });
//   };

//   return (
//     <form onSubmit={_handleSubmit}>
//       <label>
//         <p>Email address</p>
//         <input type="email" onChange={_handleEmailChange} value={email} />
//       </label>
//       <label>
//         <p>Password</p>
//         <input
//           type="password"
//           onChange={_handlePasswordChange}
//           value={password}
//         />
//       </label>
//       <br />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

import {
  Box,
  Button,
  Checkbox,
  Container,
  // Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "../components/SignInLogo";
// import { OAuthButtonGroup } from "../components/OAuthButtonGroup";
// import { PasswordField } from "../components/PasswordField";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const _handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const _handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (!error && user) {
      props.setIsLoggedIn(true);
      navigate("/");
    }
    console.log({ user, session, error });
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
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
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Link to="/signup">
                <Button variant="link" colorScheme="blue">
                  Sign up
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={useBreakpointValue({
            base: "transparent",
            sm: "bg-surface",
          })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <form onSubmit={_handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={_handleEmailChange}
                    value={email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    onChange={_handlePasswordChange}
                    value={password}
                  />
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button variant="primary" type="submit">
                  Sign in
                </Button>
                {/* <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack> */}
                {/* <OAuthButtonGroup /> */}
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignIn;
