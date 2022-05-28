import { Icon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Link,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import {
  FiTool,
  FiLayers,
  FiCheckSquare,
  FiHelpCircle,
  FiHome,
  FiSearch,
  FiSettings,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";
import { Link as LinkRoutes } from "react-router-dom";

export const Sidebar = () => (
  <Flex
    flex="1"
    bg="bg-accent"
    color="on-accent"
    overflowY="auto"
    maxW={{
      base: "full",
      sm: "xs",
    }}
    py={{
      base: "6",
      sm: "8",
    }}
    px={{
      base: "4",
      sm: "6",
    }}
  >
    <Stack justify="space-between" spacing="1">
      <Stack
        spacing={{
          base: "5",
          sm: "6",
        }}
        shouldWrapChildren
      >
        <Logo />
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
        <Stack spacing="1">
          <NavButton label="Help" icon={FiHelpCircle} />
          <NavButton label="Settings" icon={FiSettings} />
        </Stack>
        <Divider borderColor="bg-accent-subtle" />
        <UserProfile
          name="Rod Sejas"
          image="https://media-exp1.licdn.com/dms/image/C5603AQGmgYNLA-cUIA/profile-displayphoto-shrink_800_800/0/1648760593635?e=1658966400&v=beta&t=6pKE6QGB6Z2MIkH4ZP0SXoQzByx25RMrc3yryiT7kLo"
          email="rod@vs-app.com"
        />
        <Button
          leftIcon={<FiLogOut />}
          colorScheme="whiteAlpha"
          variant="solid"
        >
          Log Out
        </Button>
      </Stack>
    </Stack>
  </Flex>
);
