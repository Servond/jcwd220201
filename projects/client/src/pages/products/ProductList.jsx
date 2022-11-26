import {
  Box,
  SimpleGrid,
  Heading,
  Flex,
  Text,
  Divider,
  Spacer,
  Select,
} from "@chakra-ui/react"
import { useState } from "react"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import { motion } from "framer-motion"
import { cardVariant, parentVariant } from "../../motion"
import data from "../../data"
import ProductCard from "../../components/ProductCard"
import { axiosInstance } from "../../api"
import { useEffect } from "react"

const MotionSimpleGrid = motion(SimpleGrid)
const MotionBox = motion(Box)

const ProductList = ({ ...rest }) => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("product_name")
  const [sortDir, setSortDir] = useState("ASC")
  const [filter, setFilter] = useState()
  const [search, setSearch] = useState()

  const fetchProducts = async () => {
    const maxProductInPage = 3

    try {
      // const imageRes = await axiosInstance.get("/image")

      const response = await axiosInstance.get("/products", {
        params: {
          _page: page,
          _limit: maxProductInPage,
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      })

      setTotalCount(response.data.dataCount)
      setMaxPage(Math.ceil(response.data.dataCount / maxProductInPage))

      if (page === 1) {
        setProducts(response.data.data)
      } else {
        setProducts(response.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const nextPage = () => {
    setPage(page + 1)
  }
  const previousPage = () => {
    setPage(page - 1)
  }

  const sortProduct = ({ target }) => {
    const { value } = target

    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
  }

  useEffect(() => {
    fetchProducts()
  }, [page, sortBy, sortDir])

  const renderProducts = () => {
    return products.map((val) => (
      <Box>
        <ProductCard
          key={val.id.toString()}
          id={val.id}
          product_name={val.product_name}
          product_picture={val.product_picture}
          price={val.price}
        />
      </Box>
    ))
  }
  return (
    <>
      {/* Navbar Component */}
      <Navbar />

      {/* Product List */}
      <Box
        // border="1px solid red"
        transition="3s ease"
        bg="white"
        borderRight="1px"
        borderRightColor="gray.200"
        w={{ base: "full", md: 60 }}
        h="full"
        pos="fixed"
        {...rest}
      >
        SIDEBAR
      </Box>
      <Text
        ml="10em"
        fontWeight="700"
        fontSize="24px"
        lineHeight="28px"
        // pos="absolute"
        borderBottom="1px solid #D5D7DD"
      >
        Semua Product
      </Text>

      <Flex>
        <Box ml="15em">1</Box>
        <Spacer />
        <Box mr="5em">
          <Select variant="flushed" onChange={sortProduct}>
            <option value="product_name ASC">A-Z</option>
            <option value="product_name DESC">Z-A</option>
          </Select>
        </Box>
      </Flex>
      <Box border="1px solid" ml="15em" mr="1em" mt="1em">
        <SimpleGrid
          mt="4"
          minChildWidth="250px"
          spacing="1em"
          minH="full"
          align="center"
        >
          {renderProducts()}
        </SimpleGrid>
      </Box>

      {/* Using Animate */}

      {/* <Box>
          <MotionSimpleGrid
          mt="4"
          minChildWidth="250px"
          spacing="1em"
          minH="full"
          variants={parentVariant}
          initial="initial"
          animate="animate"
          align="center"
        >
          {data.map((product, i) => (
            <MotionBox variants={cardVariant} key={i}>
              <ProductCard product={product} />
            </MotionBox>
          ))}
        </MotionSimpleGrid>
        </Box> */}
    </>
  )
}

export default ProductList
