import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { useLocation } from "react-router-dom";
import { ToggleButton } from "./ToggleButton";

const withoutNavbarRoutes = ["/signin", "/signup"];

export const Navbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { pathname } = useLocation();

  if (withoutNavbarRoutes.some((item) => pathname.includes(item))) return null;
  return (
    <Box
      width="full"
      py="4"
      px={{
        base: "4",
        md: "8",
      }}
      bg="bg-accent"
    >
      <Flex justify="space-between">
        <Image
          src="images/logo.png"
          alt="Vertical Safety"
          objectFit="contain"
          boxSize="10"
        />
        <ToggleButton
          isOpen={isOpen}
          aria-label="Open Menu"
          onClick={onToggle}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap // Only disabled for showcase
          trapFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
