import { Button, Flex, Input } from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <Flex borderRadius="0.5rem" alignItems="stretch" overflow="hidden">
      <Input
        type="text"
        placeholder="Cari alamat atau nama penerima"
        width="16.125rem"
        height="2.25rem"
        fontSize="0.875rem"
        lineHeight="1.25rem"
        padding="0.5rem 0.75rem"
      />
    </Flex>
  );
};

export default SearchBar;
