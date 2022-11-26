import { Box, Flex, Image, Text } from "@chakra-ui/react"

const ProductCard = ({ id, product_name, price, product_picture }) => {
  return (
    <>
      <Flex
        w="full"
        h="full"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        bg="white"
        rounded="xl"
        shadow="lg"
        borderWidth="1px"
      >
        <Box w="full" h="full">
          <Box
            w="100%"
            height="200px"
            pos="relative"
            overflow="hidden"
            roundedTop="lg"
          >
            <Image
              src={product_picture}
              objectFit="cover"
              alt="pict of product"
            />
          </Box>
          <Box p="1">
            <Box aling="left" fontWeight="semibold" lineHeight="tight">
              {product_name}
            </Box>

            <Box>Rp{price}</Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default ProductCard
