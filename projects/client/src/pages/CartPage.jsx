import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  Grid,
  GridItem,
  Image,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorModeValue,
} from "@chakra-ui/react"
import { AiFillDelete } from "react-icons/ai"
import { FaArrowRight } from "react-icons/fa"
import CartItem from "../components/cart/CartItem"

const OrderSummaryItem = (props) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text
        fontWeight="medium"
        color={useColorModeValue("gray.600", "gray.400")}
      >
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}

const CartPage = () => {
  return (
    <>
      <Box
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              Keranjang (3 items)
            </Heading>

            <Stack spacing="6">
              <CartItem />
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            {/* Cart Summary */}
            <Stack
              spacing="8"
              borderWidth="1px"
              rounded="lg"
              padding="8"
              width="full"
            >
              <Heading size="md">Ringkasan Belanja</Heading>

              <Stack spacing="6">
                <Flex justify="space-between" fontSize="sm">
                  <Text
                    fontWeight="medium"
                    color={useColorModeValue("gray.600", "gray.400")}
                  >
                    Subtotal
                  </Text>
                  {/* {value ? <Text fontWeight="medium">{value}</Text> : children} */}
                </Flex>
                {/* <OrderSummaryItem
                  label="Subtotal"
                  // value={formatPrice(597)}
                /> */}
                <Flex justify="space-between">
                  <Text fontSize="lg" fontWeight="semibold">
                    Total
                  </Text>
                  <Text fontSize="xl" fontWeight="extrabold">
                    {/* {formatPrice(597)} */}
                  </Text>
                </Flex>
              </Stack>
              <Button
                colorScheme="teal"
                _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                size="lg"
                fontSize="md"
                rightIcon={<FaArrowRight />}
              >
                Checkout
              </Button>
            </Stack>

            {/* ========================================================= */}
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link color={useColorModeValue("teal.500", "teal.200")}>
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
      {/* ================================================================== */}
      {/* <Box
        bg={"lightgray"}
        pr={"40px"}
        pl={"40px"}
        pt={"10px"}
        pb={"40px"}
        boxSize={"100%"}
        mt={"60px"}
      >
        <Flex
          pl={"40px"}
          pr={"40px"}
          direction={"column"}
          bg={"white"}
          mt={"40px"}
        >
          <Box fontSize={"4xl"} fontWeight={"bold"} bg={"white"}>
            <Text pl={"40px"} mt={"40px"}>
              Keranjang
            </Text>
            <Text
              pl={"40px"}
              fontSize={"20px"}
              fontWeight={"bold"}
              fontStyle={"italic"}
            >
              Total Produk:
            </Text>
          </Box>

          <Box margin={"20px 20px 20px 20px"}>
            <Alert status="warning" borderRadius={"20px"}>
              <AlertIcon />
              <AlertTitle>Wah, keranjang belanjamu kosong</AlertTitle>
            </Alert>
          </Box>

          <Box
            pl={"40px"}
            pr={"40px"}
            bg={"white"}
            textAlign={"right"}
            pt={"30px"}
          >
            <Button mb={"20px"} bgColor={"#1b3c4b"} color={"white"}>
              Checkout
            </Button>
          </Box>
        </Flex>
      </Box> */}
    </>
  )
}

export default CartPage
