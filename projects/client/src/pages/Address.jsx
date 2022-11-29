import { Button } from "@chakra-ui/react";
import SearchBar from "../components/address/SearchBar";

const Address = () => {
  return (
    <>
      <SearchBar />
      <Button>Tambah alamat baru</Button>
    </>
  );
};

export default Address;
