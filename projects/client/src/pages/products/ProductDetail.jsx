import {
  Container,
  Flex,
  SimpleGrid,
  Image,
  Stack,
  Box,
  Heading,
  Text,
  VStack,
  StackDivider,
  List,
  ListItem,
  Button,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react"
import { Carousel } from "react-responsive-carousel"
import { useState } from "react"
import { useParams } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { axiosInstance } from "../../api"
import { useEffect } from "react"
import Navbar from "../layout/Navbar"

const ProductDetail = () => {
  const [produck, setProducts] = useState({
    id: "",
    product_name: "",
    description: "",
    price: 0,
    weight: 0,
    category: "",
  })
  const params = useParams()

  const [productImg, setProductImg] = useState([])
  const [productId] = useState(0)

  const fetchProductDetail = async (id) => {
    try {
      const response = await axiosInstance.get(`/products/${params.id}`)

      setProducts(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProductImage = async () => {
    try {
      const response = await axiosInstance.get(`/products/image/${params.id}`)
      setProductImg(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProductDetail()
    fetchProductImage()
  }, [productId])

  return (
    <>
      <Navbar />
      <Container maxW="7xl">
        <SimpleGrid
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
          columns={{ base: 1, lg: 2 }}
        >
          <Flex>
            <Carousel>
              <div>
                <Image
                  rounded="md"
                  fit="cover"
                  align="center"
                  w="100%"
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                  src="https://images.unsplash.com/photo-1670139015746-832eaa4460c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                />
              </div>
              <div>
                <Image
                  rounded="md"
                  fit="cover"
                  align="center"
                  w="100%"
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                  src="https://images.unsplash.com/photo-1670139015746-832eaa4460c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                />
              </div>
            </Carousel>
            {/* <Carousel>
              {productImg.map((val) => (
                <Image
                  rounded="md"
                  fit="cover"
                  align="center"
                  w="100%"
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                  src={val.productImg.product_picture}
                  // "https://images.unsplash.com/photo-1670139015746-832eaa4460c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                />
              ))}
            </Carousel> */}
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as="header">
              <Heading
                fontFamily="heading"
                fontWeight="400"
                fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
                lineWeight="1.1"
              >
                {produck.product_name}
              </Heading>
              <Text color="gray.900" fontWeight="300" fontSize="2xl">
                Rp {produck.price.toLocaleString()}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction="column"
              divider={<StackDivider borderColor="gray.200" />}
            >
              <VStack>
                <Text fontSize="lg" fontWeight="400">
                  {produck.description ||
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit Architecto facilis eos, odio unde fugiat repudiandae"}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight="500"
                  color="teal.500"
                  mb="4"
                >
                  Produk Detail
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as="span" fontWeight="thin">
                      Kondisi:
                    </Text>{" "}
                    Baru
                  </ListItem>

                  <ListItem>
                    <Text as="span" fontWeight="thin">
                      Berat Satuan:
                    </Text>{" "}
                    {produck.weight} gram
                  </ListItem>

                  <ListItem>
                    <Text as="span" fontWeight="thin">
                      Kategori:
                    </Text>{" "}
                    Kategori {produck?.category}
                  </ListItem>
                </List>
              </Box>
            </Stack>
            <HStack alignSelf="center" maxW="320px">
              <Button>-</Button>
              <NumberInput>
                <NumberInputField />
              </NumberInput>
              <Button>+</Button>
            </HStack>

            <Button
              _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
              textTransform="uppercase"
              mt="8"
              size="md"
              w="full"
              py="6"
              color="gray.900"
              bg="teal.500"
              rounded="none"
            >
              Masukkan Keranjang
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  )
}

export default ProductDetail
