import { Box, Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import AddressCard from "../components/address/AddressCard";
import AddressForm from "../components/address/AddressForm";
import SearchBar from "../components/address/SearchBar";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

const Address = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    // <Flex h="100%" direction="column" justifyContent="space-between">
    // {/* <Navbar /> */}
    <Box height="64.9531rem" mb="3.125rem">
      <Flex
        direction="column"
        alignItems="center"
        mt="4rem"
        border={["none", "1px solid rgb(219, 222, 226)"]}
        borderRadius="0.5rem"
        p="2.25rem 1rem 1rem"
        w={{
          base: "17.73rem",
          sm: "28.367rem",
          md: "45.387rem",
          lg: "58.625rem",
        }}
        mx="auto"
      >
        <Stack
          direction={["column", "column", "row"]}
          justifyContent="space-between"
          width="100%"
          paddingX="0.25rem"
        >
          <SearchBar />
          <Button
            borderRadius="0.5rem"
            colorScheme="teal"
            fontWeight="bold"
            fontSize={["0.6875rem", "0.75rem"]}
            height={["2.0352rem", "2.375rem"]}
            onClick={onOpen}
            px="1rem"
            width={["100%", "100%", "21.884%", "16.71%"]}
          >
            Tambah Alamat Baru
          </Button>
        </Stack>

        <AddressCard />

        <AddressForm isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
    // {/* <Footer /> */}
    // </Flex>
  );
};

{
  /* <Button
        backgroundColor="white"
        border="1px solid"
        borderRadius="0.5rem"
        color="rgb(0, 128, 128)"
        colorScheme="whiteAlpha"
        fontWeight="bold"
        fontSize="0.875rem"
        height="2.5rem"
        px="1rem"
      >
        Tambah Alamat Baru
      </Button> */
}

export default Address;
