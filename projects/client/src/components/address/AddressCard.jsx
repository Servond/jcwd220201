import {
  useStyleConfig,
  Box,
  Text,
  Link,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react";
import { GrLocation } from "react-icons/gr";
import { BsCheck2 } from "react-icons/bs";

const AddressCard = (props) => {
  const { variant, ...rest } = props;
  const styles = useStyleConfig("AddressCard", { variant });

  return (
    <Box __css={styles} {...rest}>
      <Flex
        color="rgba(49, 53, 59, 0.96)"
        direction="column"
        pr="1rem"
        width="22.875rem"
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
          <Text fontSize="0.875rem" fontWeight="700">
            Alamat Rumah
          </Text>
          <Flex
            backgroundColor="rgb(243, 244, 245)"
            borderRadius="3px"
            color="rgb(159, 166, 176)"
            fontSize="0.625rem"
            fontWeight="800"
            height="1.25rem"
            justify="center"
            lineHeight="1rem"
            ml="0.25rem"
            px="0.5rem"
          >
            Utama
          </Flex>
        </Flex>
        <Text
          fontSize="1rem"
          fontWeight="700"
          lineHeight="1.25rem"
          maxW="21.875rem"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          Ariel Clement
        </Text>
        <Text
          fontSize="0.875rem"
          lineHeight="1.25rem"
          maxW="21.875rem"
          mt="0.25rem"
        >
          087888288110
        </Text>
        <Text
          fontSize="0.875rem"
          lineHeight="1.25rem"
          maxW="21.875rem"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
          perspiciatis, exercitationem ipsa iusto suscipit deserunt amet
          consectetur dolores voluptatibus ex quae unde reprehenderit atque nam
          explicabo odio nostrum assumenda alias.
        </Text>
        <HStack spacing="0.25rem" mt="1rem">
          <GrLocation size="1.4rem" />
          <Text fontSize="0.875rem" lineHeight="1.125rem">
            Sudah Pinpoint
          </Text>
        </HStack>
        <HStack mt="1rem" spacing="0">
          <Link
            color="rgb(49, 151, 149)"
            fontSize="0.8125rem"
            fontWeight="700"
            lineHeight="0.8625rem"
          >
            Ubah Alamat
          </Link>
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
              fontSize="0.8125rem"
              fontWeight="700"
              lineHeight="0.8625rem"
            >
              Hapus
            </Link>
          </HStack>
        </HStack>
      </Flex>
      <Button size="sm" px="36px">
        Pilih
      </Button>
      {/* <BsCheck2 size="1.625rem" color="rgb(49, 151, 149)" /> */}
    </Box>
  );
};

export default AddressCard;
