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
} from "@chakra-ui/react"
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react"
import { FiGift } from "react-icons/fi"
import { Link } from "react-router-dom"
const CartItem = () => {
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
          <Image
            rounded="lg"
            width="120px"
            height="120px"
            fit="cover"
            // src={image}
            // alt={name}
            draggable="false"
            loading="lazy"
          />
          <Box pt="4">
            <Stack spacing="0.5">
              <Text fontWeight="medium">Name Product</Text>
              <Text
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize="sm"
              >
                Kategori
                {/* {description} */}
              </Text>
            </Stack>

            <HStack
              spacing="1"
              mt="3"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              <Link fontSize="sm" textDecoration="underline">
                Tulis Catatan
              </Link>
            </HStack>
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
          <Select
            maxW="64px"
            aria-label="Select quantity"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            // {...props}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Select>
          <HStack spacing="1">
            <Text>Harga</Text>
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
    </>
  )
}

export default CartItem
