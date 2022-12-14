import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Image,
  Stack,
  Select,
  Text,
  useColorModeValue,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Checkbox,
  Divider,
} from "@chakra-ui/react"
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { FiGift } from "react-icons/fi"
import { Link } from "react-router-dom"
import { axiosInstance } from "../../api"
const CartItem = ({
  product_name,
  price,
  product_picture,
  CartId,
  productId,
  checkAllProduct,
}) => {
  const [productStock, setProductStock] = useState(0)
  const [checkProduct, setCheckProduct] = useState(false)
  const fetchCartById = async () => {
    try {
      const response = await axiosInstance.get(`/carts/${CartId}`)

      const cartProductStock = response.data.data.Product.ProductStocks.map(
        (val) => val.stock
      )
      let total = 0

      for (let i = 0; i < cartProductStock.length; i++) {
        total += Number(cartProductStock[i])
      }
      setProductStock(total)

      if (response.data.data.is_checked === true) {
        setCheckProduct(true)
      } else {
        setCheckProduct(false)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const fetchCartByProduct = async () => {
    try {
      const response = await axiosInstance.get(
        `/carts/cart-product/ProductId/${productId}`
      )
    } catch (err) {
      console.log(err)
    }
  }

  const checkPerProduct = async () => {
    try {
      const response = await axiosInstance.patch(
        `/carts/productCheck/${CartId}`
      )
      if (response.data.data.is_checked === true) {
        setCheckProduct(true)
      } else {
        setCheckProduct(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCartById()
    fetchCartByProduct()
  }, [checkAllProduct])
  return (
    <>
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        justify="space-between"
        align="center"
      >
        {/* Cart Product Meta */}
        <Stack direction="row" spacing="5" width="full">
          <Checkbox
            size="lg"
            borderColor="teal"
            onChange={() => checkProduct()}
          ></Checkbox>
          <Image
            rounded="lg"
            width="120px"
            height="120px"
            fit="cover"
            src={product_picture}
            // alt={name}
            draggable="false"
            loading="lazy"
          />
          <Box pt="4">
            <Stack spacing="0.5">
              <Text fontWeight="medium">{product_name}</Text>
              <Text
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize="sm"
              >
                Kategori
                {/* {CategoryId} */}
              </Text>
            </Stack>

            {/* <HStack
              spacing="1"
              mt="3"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              <Link fontSize="sm" textDecoration="underline">
                Tulis Catatan
              </Link>
            </HStack> */}
          </Box>
        </Stack>
        {/* =================================================== */}

        {/* Desktop */}
        <Flex
          width="full"
          justify="space-between"
          display={{
            base: "none",
            md: "flex",
          }}
        >
          <InputGroup w="40%">
            <InputLeftElement>
              <AddIcon fontSize="10" />
            </InputLeftElement>
            <Input width="10em" textAlign="center" _hover={"none"} />
            <InputRightElement>
              <MinusIcon fontSize="10" />
            </InputRightElement>
          </InputGroup>

          <HStack spacing="1">
            <Text>Rp {price.toLocaleString()}</Text>
          </HStack>

          {/* <PriceTag price={price} currency={currency} /> */}
          <CloseButton
          // aria-label={`Delete ${name} from cart`}
          // onClick={onClickDelete}
          />
        </Flex>

        {/* Mobile */}
        <Flex
          mt="4"
          align="center"
          width="full"
          justify="space-between"
          display={{
            base: "flex",
            md: "none",
          }}
        >
          <Link fontSize="sm" textDecor="underline">
            Hapus Produk
          </Link>
          <Select
            maxW="64px"
            aria-label="Select quantity"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Select>
          {/* <PriceTag price={price} currency={currency} /> */}
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}

export default CartItem
