import { Flex } from "@chakra-ui/react";
import Header from "../components/checkout/Header";
import Content from "../components/checkout/Content";
import CheckoutContextProvider from "../components/checkout/CheckoutContextProvider";

const Checkout = () => {
  return (
    <Flex direction="column">
      <Header />
      <CheckoutContextProvider>
        <Content />
      </CheckoutContextProvider>
    </Flex>
  );
};

export default Checkout;
