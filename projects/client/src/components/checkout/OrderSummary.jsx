import { Box, Button, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CheckoutContext } from "./CheckoutContextProvider";

// Own library imports
import { IDR } from "../../lib/currency/Rupiah";
import { useEffect } from "react";

const OrderSummary = () => {
  // Get checkout context
  const {
    items: { totalPrice, totalQuantity },
    shipping: { shippingCost, serviceType },
  } = useContext(CheckoutContext);

  useEffect(() => console.log(), [serviceType]);

  return (
    <Box
      borderRadius="0.5rem"
      boxShadow="0px 1px 6px 0px rgba(49, 53, 59, 0.12)"
      color="rgb(49, 53, 59)"
      display="flex"
      flexDirection="column"
      fontSize="0.875rem"
      height="auto"
      lineHeight="1rem"
      maxW="21.875rem"
      mt="40px"
      p="1rem"
      position="relative"
      width="21.875rem"
    >
      <Flex direction="column">
        <Text fontSize="1.0625rem" fontWeight="700" lineHeight="1.4rem">
          Ringkasan belanja
        </Text>
        <Box fontSize="0.9375rem" lineHeight="1.3125rem" mt="1.25rem">
          <HStack spacing="auto">
            <Text>Total Harga ({totalQuantity} Produk)</Text>
            <Text>{IDR(totalPrice)}</Text>
          </HStack>
          {shippingCost && (
            <HStack spacing="auto">
              <HStack spacing="5px">
                <Text>Ongkos Kirim</Text>
                <Text
                  backgroundColor="rgb(243, 244, 245)"
                  border="1px solid rgb(243, 244, 245)"
                  borderRadius="0.3125rem"
                  color="rgb(159, 166, 176)"
                  fontSize="0.6875rem"
                  fontWeight="700"
                  px="0.25rem"
                >{`${serviceType.code.toUpperCase()} (${
                  serviceType.service.service
                })`}</Text>
              </HStack>

              <Text>{IDR(shippingCost)}</Text>
            </HStack>
          )}
        </Box>
        <HStack
          borderTop="1px solid rgb(219, 222, 226)"
          fontSize="1rem"
          fontWeight="700"
          mt="1rem"
          p="0.9375rem 0 1rem"
          spacing="auto"
        >
          <Text>Total Tagihan</Text>
          {shippingCost ? (
            <Text>{IDR(totalPrice + shippingCost)}</Text>
          ) : (
            <Text fontWeight="700">&ndash;</Text>
          )}
        </HStack>
        <Text fontSize="0.6875rem" lineHeight="1rem" mb="1.125rem">
          Dengan menyelesaikan pembayaran, Saya menyetujui{" "}
          <Link
            color="teal"
            cursor="pointer"
            style={{ textDecoration: "none" }}
          >
            syarat dan ketentuan yang berlaku
          </Link>
          .
        </Text>
        <Button
          colorScheme="teal"
          fontSize="1rem"
          fontWeight="700"
          height="3rem"
        >
          Selesaikan Pembayaran
        </Button>
      </Flex>
    </Box>
  );
};

export default OrderSummary;
