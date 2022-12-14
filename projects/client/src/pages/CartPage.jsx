import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link as LinkChakra,
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
  useToast,
  Checkbox,
  Divider,
} from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { AiFillDelete } from "react-icons/ai"
import { FaArrowRight } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../api"
import CartItem from "../components/cart/CartItem"
import { itemCart } from "../redux/features/cartSlice"
import { Link as LinkRouterDom } from "react-router-dom"

const CartPage = () => {
  const [allProductCheck, setAllProductCheck] = useState(false)
  const cartSelector = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const toast = useToast()

  const fetchCartItem = async () => {
    try {
      const response = await axiosInstance.get("/carts/me")

      dispatch(itemCart(response.data.data))

      const productCheck = response.data.data.map((val) => val.is_checked)

      if (!productCheck.includes(false)) {
        setAllProductCheck(true)
      } else {
        setAllProductCheck(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const checkAllProduct = async () => {
    try {
      const response = await axiosInstance.patch("/carts/checkAllProduct")

      const productCheck = response.data.data.map((val) => val.is_checked)

      if (!productCheck.includes(false)) {
        setAllProductCheck(true)
      } else {
        setAllProductCheck(false)
      }

      fetchCartItem()
    } catch (err) {
      console.log(err)
    }
  }

  const renderCartItem = () => {
    return cartSelector.cart.map((val) => {
      return (
        <CartItem
          key={val.id.toString()}
          productId={val.ProductId}
          product_name={val.Product.product_name}
          price={val.Product.price}
          quantity={val.quantity}
          product_picture={val.Product.ProductPictures[0].product_picture}
          CartId={val.id}
          fetchCartItem={fetchCartItem}
          isChecked={val.is_checked}
          checkAllProduct={checkAllProduct}
          // CategoryId={val.Category.categoryId}
        />
      )
    })
  }
  // console.log(product_picture)
  useEffect(() => {
    fetchCartItem()
  }, [])
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
              Keranjang
            </Heading>
            <Checkbox
              isChecked={allProductCheck}
              borderColor="teal"
              size="lg"
              onChange={() => allProductCheck()}
            >
              <Text>Pilih Semua</Text>
            </Checkbox>
            <Divider backgroundColor="#F3F4F5" border="5px" />

            <Stack spacing="6">{renderCartItem()}</Stack>
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
                fontSize="lg"
                rightIcon={<FaArrowRight />}
              >
                Beli ( )
              </Button>
            </Stack>

            {/* ========================================================= */}
            <HStack mt="6" fontWeight="semibold">
              <p>atau</p>

              <LinkChakra color={useColorModeValue("teal.500", "teal.200")}>
                <LinkRouterDom to="/product">Lanjut Belanja</LinkRouterDom>
              </LinkChakra>
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
