import { Box, Image } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      borderBottom="1px solid rgb(243, 244, 245)"
      display="flex"
      h="3.75rem"
      justifyContent="center"
      mx="auto"
      px="5.6875rem"
      width="100%"
    >
      <Image src="/assets/logo.png" width="auto" height="3.6875rem" />
    </Box>
  );
};

export default Header;
