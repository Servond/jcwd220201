import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <Flex
      borderRadius="0.5rem"
      align="stretch"
      overflow="hidden"
      width="18.75rem"
      height="2.375rem"
      direction="row"
    >
      <InputGroup borderColor="rgb(243, 244, 245)">
        <Input
          placeholder="Cari alamat atau nama penerima"
          _placeholder={{ color: "rgb(169, 168, 172)" }}
          width="18rem"
          height="100%"
          color="rgba(49, 53, 59, 0.96)"
          fontSize="0.875rem"
          lineHeight="1.25rem"
          padding="0.5rem 0.75rem"
          _hover="none"
          focusBorderColor="none"
        />
        <InputRightAddon
          padding="0"
          _hover={{ backgroundColor: "rgb(230, 231, 232)" }}
        >
          <Button
            width="100%"
            height="100%"
            padding="0"
            backgroundImage="assets/address/search-icon.svg"
            backgroundSize="1.5rem"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundColor="rgb(243, 244, 245)"
            _hover={{ backgroundColor: "rgb(230, 231, 232)" }}
            _active="none"
          />
        </InputRightAddon>
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
