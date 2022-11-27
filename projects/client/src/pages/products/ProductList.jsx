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
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti"
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

const ProductList = () => {
  const [products, setProducts] = useState([])

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("product_name")
  const [sortDir, setSortDir] = useState("ASC")
  const [filter, setFilter] = useState()
  const [searchValue, setSearchValue] = useState("")
  const [searchInput, setSearchInput] = useState("")

  const fetchProducts = async () => {
    const maxProductInPage = 10

    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _page: page,
          _limit: maxProductInPage,
          _sortBy: sortBy,
          _sortDir: sortDir,
          product_name: searchValue,
        },
      })

      setProducts(response.data.data)
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

  const btnSearch = () => {
    setSearchValue(searchInput)
    setPage(1)
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
  }, [sortDir, sortBy, searchValue])

  const renderProducts = () => {
    return products.map((val) => (
      <Box>
        <ProductCard
          key={val.id.toString()}
          product_name={val.product_name}
          product_picture={val.product_picture}
          price={val.price}
          id={val.id}
        />
      </Box>
    ))
  }

  return (
    <>
      {/* Navbar Component */}
      <Navbar onBtnSearch={btnSearch} />

      {/* Product List */}
      <Box
        // border="1px solid red"
        transition="3s ease"
        bg="white"
        borderRight="1px"
        borderRightColor="gray.200"
        w={{ base: "full", md: 60 }}
        h="full"
        boxShadow="lg"
        pos="fixed"
        // {...rest}
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
          <Select
            borderBottom="1px solid"
            variant="flushed"
            onChange={sortProduct}
          >
            <option value="product_name ASC">A-Z</option>
            <option value="product_name DESC">Z-A</option>
            <option>Product Relevance</option>
            <option>Z-A</option>
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
