import { Button } from "@chakra-ui/react";
import AddressCard from "../components/address/AddressCard";
import SearchBar from "../components/address/SearchBar";

const Address = () => {
  return (
    <>
      <SearchBar />
      <Button>Tambah Alamat Baru</Button>
      <AddressCard />
    </>
  );
};

export default Address;
