import { Icon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Link,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import {
  FiTool,
  FiLayers,
  FiCheckSquare,
  FiHelpCircle,
  FiHome,
  FiSearch,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";
import { Link as LinkRoutes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabase";

const withoutSidebarRoutes = ["/signin", "/signup"];

export const Sidebar = (props) => {
  const { pathname } = useLocation();

  if (withoutSidebarRoutes.some((item) => pathname.includes(item))) return null;

  const _handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      props.setIsLoggedIn(false);
    }
    console.log(error);
  };

  return (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      bg="bg-canvas"
      overflowY="auto"
    >
      <Flex
        flex="1"
        bg="bg-accent"
        color="on-accent"
        overflowY="auto"
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack
            spacing={{
              base: "5",
              sm: "6",
            }}
            shouldWrapChildren
          >
            <Box boxSize="8" m="5">
              <Image
                src="images/logo.png"
                alt="Vertical Safety"
                objectFit="cover"
              />
            </Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="on-accent" boxSize="5" />
              </InputLeftElement>
              <Input placeholder="Search" variant="filled" colorScheme="blue" />
            </InputGroup>
            <Stack spacing="1">
              <Link as={LinkRoutes} to="/">
                <NavButton label="Home" icon={FiHome} />
              </Link>

              <Link as={LinkRoutes} to="/equipments">
                <NavButton label="Equipment" icon={FiTool} />
              </Link>

              <Link as={LinkRoutes} to="/workers">
                <NavButton label="Workers" icon={FiUsers} />
              </Link>

              <Link as={LinkRoutes} to="/inspections">
                <NavButton label="Inspections" icon={FiCheckSquare} />
              </Link>

              <Link as={LinkRoutes} to="/models">
                <NavButton label="Models" icon={FiLayers} />
              </Link>
            </Stack>
          </Stack>
          <Stack
            spacing={{
              base: "5",
              sm: "6",
            }}
          >
            <Link
              href="https://github.com/rodsejas/vs-client#readme"
              isExternal
            >
              <NavButton label="Help" icon={FiHelpCircle} />
            </Link>
            <Divider borderColor="bg-accent-subtle" />
            <UserProfile name="Rod Sejas" email="rodsejas@gmail.com" />
            <Button
              leftIcon={<FiLogOut />}
              colorScheme="whiteAlpha"
              variant="solid"
              button
              onClick={_handleLogout}
            >
              Log Out
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
