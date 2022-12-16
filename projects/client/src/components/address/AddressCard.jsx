import {
  useStyleConfig,
  Box,
  Text,
  Link,
  Flex,
  HStack,
  Button,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import { GrLocation } from "react-icons/gr";
import { BsCheck2 } from "react-icons/bs";
import ConfirmationModal from "./ConfirmationModal";

// Own library imports
import makeDefault from "../../lib/address/makeDefault";
import { useEffect } from "react";

const AddressCard = (props) => {
  const { variant, ...rest } = props;
  const styles = useStyleConfig("AddressCard", { variant });
  const [isSmSize] = useMediaQuery("min-width: 30rem");

  // Modal functionality
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get user address
  const { setDefaultAddress, setAddresses, setTotalPage } = rest.setters;
  const { label, recipient, phone, address, id, is_default } = rest.data;

  return (
    <Box __css={styles} {...rest}>
      <Flex
        color="rgba(49, 53, 59, 0.96)"
        direction="column"
        pr="1rem"
        width="100%"
        _before={{
          content: '""',
          position: "absolute",
          top: "0.75rem",
          left: "0",
          width: "0.375rem",
          height: "2.125rem",
          borderTopRightRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          backgroundColor: "rgb(49, 151, 149)",
        }}
      >
        <Flex>
          <Text fontSize={["0.75rem", "0.875rem"]} fontWeight="700">
            {label}
          </Text>
          {is_default && (
            <Box
              backgroundColor="rgb(243, 244, 245)"
              borderRadius="3px"
              color="rgb(159, 166, 176)"
              fontSize="0.625rem"
              fontWeight="800"
              height="1.25rem"
              lineHeight="1rem"
              ml="0.25rem"
              pt="1px"
              px="0.5rem"
            >
              Utama
            </Box>
          )}
        </Flex>
        <Text
          fontSize={["0.857rem", "1rem"]}
          fontWeight="700"
          lineHeight="1.25rem"
          maxW="21.875rem"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {recipient}
        </Text>
        <Text
          fontSize={["0.75rem", "0.875rem"]}
          lineHeight="1.25rem"
          maxW="21.875rem"
          mt="0.25rem"
        >
          {phone}
        </Text>
        <Text
          fontSize={["0.75rem", "0.875rem"]}
          lineHeight="1.25rem"
          maxW="21.875rem"
          whiteSpace="nowrap"
          width={["50%", "100%", "100%", "100%"]}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {address}
        </Text>
        <HStack spacing="0.25rem" mt={["0.625rem", "1rem"]}>
          <GrLocation size={isSmSize ? "1.4rem" : "1.3rem"} />
          <Text fontSize={["0.75rem", "0.875rem"]} lineHeight="1.125rem">
            Sudah Pinpoint
          </Text>
        </HStack>
        <HStack mt={["0.625rem", "1rem"]} spacing="0">
          <Link
            color="rgb(49, 151, 149)"
            fontSize={["0.71rem", "0.8125rem"]}
            fontWeight="700"
            lineHeight="0.8625rem"
            _hover={{ textDecoration: "none" }}
          >
            Ubah Alamat
          </Link>
          {variant !== "selected" && (
            <HStack
              _before={{
                content: '""',
                display: "block",
                width: "2px",
                height: "16px",
                m: "0px 12px",
                backgroundColor: "rgb(229, 231, 233)",
              }}
            >
              <Link
                color="rgb(49, 151, 149)"
                fontSize={["0.71rem", "0.8125rem"]}
                fontWeight="700"
                lineHeight="0.8625rem"
                onClick={onOpen}
                _hover={{ textDecoration: "none" }}
              >
                Hapus
              </Link>
            </HStack>
          )}
        </HStack>
      </Flex>
      {variant === "selected" ? (
        <Box mx="auto">
          <BsCheck2 size="1.625rem" color="rgb(49, 151, 149)" />
        </Box>
      ) : (
        <Button
          borderRadius="0.5rem"
          colorScheme="teal"
          fontWeight="bold"
          fontSize="0.75rem"
          onClick={async () => {
            await makeDefault(id);
            setDefaultAddress(rest.data);
          }}
          height="2rem"
          px="36px"
          width={["100%", "100%", "12.071%", "9.217%"]}
        >
          Pilih
        </Button>
      )}

      <ConfirmationModal
        id={id}
        label={label}
        isOpen={isOpen}
        onClose={onClose}
        setters={{ setAddresses, setTotalPage }}
      />
    </Box>
  );
};

export default AddressCard;
