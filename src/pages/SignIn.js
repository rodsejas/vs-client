import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
// import { PasswordField } from "../components/PasswordField";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";

const SignIn = (props) => {
  const [email, setEmail] = useState("rodsejas@gmail.com");
  const [password, setPassword] = useState("chicken");

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
        <Stack spacing="6" align="center">
          <Box boxSize="10" m="5">
            <Image
              src="images/logo_blue.png"
              alt="Vertical Safety"
              objectFit="cover"
            />
          </Box>
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
            <Alert
              status="info"
              borderRadius="5"
              textAlign="left"
              fontSize="sm"
              textColor="#31708f"
            >
              <AlertIcon />
              Email: rodsejas@gmail.com
              <br /> Password: chicken
            </Alert>
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
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignIn;
