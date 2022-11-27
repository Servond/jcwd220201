import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../api"

const ProductCard = ({ id, product_name, price }) => {
  const [productData, setProductData] = useState({
    product_name: "",
    price: 0,
    id: "",
  })
  // const [productId, setProductId] = useState(0)
  const [productImg, setProductImg] = useState([])

  // const fetchProductById = async () => {
  //   try {
  //     const response = await axiosInstance.get(`/products/${productId}`)
  //     setProductData(response.data.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const fetchProductImage = async () => {
    try {
      const response = await axiosInstance.get(`/products/image/${id}`)
      setProductImg(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // fetchProductById()
    fetchProductImage()
  }, [])

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
              // fit=""
              // objectFit="cover"
              alt="pict of product"
              src={productImg.product_picture}
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
