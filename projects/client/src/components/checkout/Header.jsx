import { Box, Image } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      alignItems="center"
      borderBottom="1px solid rgb(243, 244, 245)"
      display="flex"
      h="3.75rem"
      justifyContent="flex-start"
      px="1.25rem"
      w="100%"
    >
      <Image src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/88199797.svg" />
    </Box>
  );
};

export default Header;
