import { Button, useDisclosure } from "@chakra-ui/react";
import AddressCard from "../components/address/AddressCard";
import AddressForm from "../components/address/AddressForm";
import SearchBar from "../components/address/SearchBar";

const Address = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SearchBar />
      {/* Button (Solid) */}
      <Button
        borderRadius="0.5rem"
        colorScheme="teal"
        fontWeight="bold"
        fontSize="0.875rem"
        height="2.5rem"
        px="1rem"
      >
        Tambah Alamat Baru
      </Button>
      {/* Button (Outline) */}
      <Button
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
      </Button>
      <AddressCard />
      <Button onClick={onOpen}>Open Modal</Button>
      <AddressForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Address;
