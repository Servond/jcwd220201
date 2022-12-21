import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import fetchAddresses from "../../lib/checkout/fetchAddresses";
import Address from "./Address";

const Content = () => {
  return (
    <Box>
      <Flex
        color="rgba(0, 0, 0, 0.54)"
        fontSize="0.875rem"
        mx="auto"
        mt="1.875rem"
        px="1.25rem"
        width="100%"
      >
        <Address />
        <Box flexBasis="50%">right</Box>
      </Flex>
    </Box>
  );
};

export default Content;
