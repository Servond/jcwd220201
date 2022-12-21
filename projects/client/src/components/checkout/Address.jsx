import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import fetchAddresses from "../../lib/checkout/fetchAddresses";
import AddressListModal from "./AddressListModal";

// Own library imports
import { CheckoutContext } from "./CheckoutContextProvider";

const Address = () => {
  // Get address data
  const { shippingAddress, addresses, setShippingAddress, setAddresses } =
    useContext(CheckoutContext);

  // Modal functionality
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Loading functionality
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAddresses()
      .then((res) => {
        if (!shippingAddress) {
          setShippingAddress(res.data.selectedAddress);
        }
        setAddresses(res.data.addresses);
      })
      .then(() => setIsLoading(true));
  }, [shippingAddress]);

  return (
    <Box
      borderBottom="6px solid rgb(243, 244, 245)"
      display="flex"
      flexDirection="column"
      flexBasis="50%"
    >
      <Text as="b" color="rgb(49, 53, 59)" fontSize="1.4375rem" mb="1.375rem">
        Checkout
      </Text>
      <Text
        as="b"
        borderBottom="1px solid rgb(219, 222, 226)"
        color="rgb(49, 53, 59)"
        fontSize="0.875rem"
        pb="0.875rem"
      >
        Alamat Pengiriman
      </Text>
      <Box py="0.625rem" borderBottom="1px solid rgb(219, 222, 226)">
        <Flex alignItems="center">
          <Text as="b" color="rgb(49, 53, 59)" mr="0.1875rem" pb="4px">
            {isLoading && shippingAddress.recipient}
          </Text>
          <Text color="rgb(49, 53, 59)" mr="0.25rem" pb="4px">
            {isLoading && `(${shippingAddress.label})`}
          </Text>
          {isLoading && shippingAddress.is_default ? (
            <Box
              backgroundColor="rgba(62, 191, 184, 0.2)"
              borderRadius="3px"
              color="rgb(49, 151, 149)"
              fontSize="0.625rem"
              fontWeight="800"
              height="1.25rem"
              lineHeight="1rem"
              pt="1px"
              pb="4px"
              px="0.5rem"
            >
              Utama
            </Box>
          ) : null}
        </Flex>
        <Text color="rgb(49, 53, 59)">
          {isLoading && shippingAddress.phone}
        </Text>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          width="75%"
        >
          {isLoading && shippingAddress.address}
        </Text>
        <Text>
          {isLoading &&
            `${shippingAddress.city}, ${shippingAddress.postal_code}`}
        </Text>
      </Box>
      <Box py="0.9375rem">
        <Button
          border="1px solid rgb(229, 231, 233)"
          borderRadius="0.5rem"
          color="rgba(49, 53, 59, 0.96)"
          colorScheme="whiteAlpha"
          fontSize="0.9375rem"
          fontWeight="700"
          onClick={onOpen}
          width="9.3047rem"
        >
          Pilih Alamat Lain
        </Button>
      </Box>
      {isLoading && (
        <AddressListModal
          isOpen={isOpen}
          onClose={onClose}
          addresses={addresses}
        />
      )}
    </Box>
  );
};

export default Address;
