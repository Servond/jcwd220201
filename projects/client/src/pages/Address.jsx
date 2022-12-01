import { Button, useDisclosure } from "@chakra-ui/react";
import AddressCard from "../components/address/AddressCard";
import AddressForm from "../components/address/AddressForm";
import SearchBar from "../components/address/SearchBar";

const Address = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SearchBar />
      <Button>Tambah Alamat Baru</Button>
      <AddressCard />
      <Button onClick={onOpen}>Open Modal</Button>
      <AddressForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Address;
