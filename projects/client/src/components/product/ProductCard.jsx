import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../api"

const ProductCard = ({ id, product_name, price }) => {
  const [productData, setProductData] = useState({
    product_name: "",
    price: 0,
    id: "",
    category_id: "",
  })
  const [productImg, setProductImg] = useState([])
  const [productId, setProductId] = useState(0)

  const fetchProductById = async () => {
    try {
      const response = await axiosInstance.get(`/products/${id}`)
      setProductData(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProductImage = async () => {
    try {
      const response = await axiosInstance.get(`/products/image/${id}`)
      setProductImg(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const productDetail = () => {
    setProductId(id)
  }

  useEffect(() => {
    fetchProductById()
    fetchProductImage()
  }, [productId])

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
        onClick={() => productDetail()}
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
              fit="cover"
              objectFit="cover"
              alt="pict of product"
              src={productImg.product_picture}
            />
          </Box>
          <Box p="1">
            <Box aling="left" fontWeight="semibold" lineHeight="tight">
              {product_name}
            </Box>

            <Box>Rp{price}</Box>
            <Box>{productData.category_id}</Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default ProductCard
