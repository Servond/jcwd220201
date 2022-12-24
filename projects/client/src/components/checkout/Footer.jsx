import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      borderTop="1px solid rgb(243, 244, 245)"
      height="6.375rem"
      justifyContent="center"
      maxHeight="6.375rem"
      mt="2.875rem"
      py="1.875rem"
    >
      <HStack>
        <Image
          src="https://ecs7.tokopedia.net/assets-unify/img/ic-toped.jpg"
          boxSize="10"
        />
        <Text>&copy; 2009 - 2022</Text>
      </HStack>
    </Flex>
  );
};

export default Footer;
