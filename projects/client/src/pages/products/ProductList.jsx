import {
  Box,
  SimpleGrid,
  Heading,
  Flex,
  Text,
  Button,
  Divider,
  Spacer,
  Select,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react"
import { Fragment, useState } from "react"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import { motion } from "framer-motion"
import { cardVariant, parentVariant } from "../../motion"
import ProductCard from "../../components/product/ProductCard"
import { axiosInstance } from "../../api"
import { useEffect } from "react"
import { SearchIcon } from "@chakra-ui/icons"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
import { useSearchParams, useLocation } from "react-router-dom"

const MotionSimpleGrid = motion(SimpleGrid)
const MotionBox = motion(Box)

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("product_name")
  const [sortDir, setSortDir] = useState("ASC")
  const [filterProduct, setFilterProduct] = useState("All")

  const [searchInput, setSearchInput] = useState()
  const [searchValue, setSearchValue] = useState("")

  const [searchParams, setSearchParams] = useSearchParams()

  const fetchProducts = async () => {
    const maxProductInPage = 10
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _page: page,
          _limit: maxProductInPage,
          _sortBy: sortBy,
          _sortDir: sortDir,
          category_id: filterProduct,
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
      renderProducts()
    } catch (err) {
      console.log(err)
    }
  }

  const btnSearch = () => {
    setSearchValue(searchInput)
    // setPage(1)

    // watch this
    const queryParams = {}
    queryParams["search"] = searchInput
    setSearchParams(queryParams)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setSearchValue(searchInput)
    }
  }

  const nextPageProduct = () => {
    setPage(page + 1)
  }

  const previousPageProduct = () => {
    setPage(page - 1)
  }

  const sortProduct = ({ target }) => {
    const { value } = target

    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])

    if (value === "harga maksimum") {
      setSortBy("price")
      setSortDir("DESC")
    } else if (value === "harga minimum") {
      setSortBy("price")
      setSortDir("ASC")
    } else if (value == "") {
      setSortBy("")
      setSortDir("")
    }

    const queryParams = {}
    if (searchParams.get("search")) {
      queryParams["search"] = searchParams.get("search")
    }
    queryParams[value.split(" ")[0]] = value.split(" ")[1]
    setSearchParams(queryParams)
  }

  const filterCategory = ({ target }) => {
    const { value } = target
    setFilterProduct(value)
  }

  useEffect(() => {
    for (let passing of searchParams.entries()) {
      if (passing[0] === "search") {
        setSearchValue(passing[1])
      }
      if (
        passing[0] === "product_name" ||
        passing[0] === "harga maksimum" ||
        passing[0] === "harga minimum"
      ) {
        setSortBy(passing[0])
        setSortDir(passing[1])
      }
    }

    fetchProducts()
  }, [page, sortDir, sortBy, filterProduct, searchValue])

  const renderProducts = () => {
    return products.map((val) => (
      // <Box>
      <ProductCard
        key={val.id.toString()}
        product_name={val.product_name}
        product_picture={val.product_picture}
        price={val.price.toLocaleString()}
        id={val.id}
      />
      // </Box>
    ))
  }

  return (
    <>
      {/* Navbar Component */}
      <Navbar
        onClick={() => btnSearch()}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleEnter}
      />

      {/* Product List */}

      <Box h={{ base: "0", md: "0", lg: "85vh" }} border="1px solid blue">
        <Box ml="1em" mr="1em" border="1px solid red">
          <Breadcrumb fontWeight="medium" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage={true}>
              <BreadcrumbLink href="/product">Produk</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Kategori</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex>
            <Grid templateColumns="repeat(4, 1fr)" gap="32px" pb="50px">
              <GridItem>
                <FormControl>
                  <FormLabel>Filter</FormLabel>
                  <Select variant="flushed" onChange={filterCategory}>
                    <option value="All">Category</option>
                    <option value={1}>Handphone</option>
                    <option value={2}>TV</option>
                    <option value={3}>Home Appliances</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Sort By</FormLabel>
                  <Select
                    borderBottom="1px solid"
                    variant="flushed"
                    onChange={sortProduct}
                  >
                    <option value="product_name ASC">A-Z</option>
                    <option value="product_name DESC">Z-A</option>
                    <option value="harga maksimum">Harga Tertinggi </option>
                    <option value="harga minimum">Harga Terendah</option>
                  </Select>
                </FormControl>
              </GridItem>

              {/* <FormControl>
                <FormLabel>Search</FormLabel>
                <InputGroup>
                  <Input
                    float="right"
                    borderRadius="8px"
                    border="1px solid #CCCCCC"
                    placeholder="Cari di WIRED!"
                    _placeholder={{ fontSize: "14px" }}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    onKeyDown={handleEnter}
                    bgColor="white"
                  />
                  <InputRightElement>
                    <Button
                      variant="solid"
                      borderRadius="8px"
                      onClick={btnSearch}
                    >
                      <SearchIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl> */}
            </Grid>
          </Flex>
          {/* <Flex pos="sticky" left="5" h="95vh" mt="2.5vh" boxShadow={}>

              </Flex> */}
          <Grid
            templateColumns="repeat(5, 1fr)"
            border="1px solid purple"
            mt="4"
            minChildWidth="250px"
            // spacing="5em"
            gap="1em"
            minH="full"
            align="center"
          >
            {renderProducts()}
          </Grid>

          {/* Next/Prev Page Product */}
          <Flex w="full" alignItems="center" justifyContent="center" gap="1em">
            {page === 1 ? null : <FaArrowLeft onClick={previousPageProduct} />}
            {!products.length ? (
              <Alert
                status="error"
                variant="subtle"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                h="200px"
              >
                <AlertIcon boxSize="40px" mr="0" />
                <AlertTitle>Oops, produk nggak ditemukan !</AlertTitle>
                <AlertDescription>
                  Coba kata kunci lain atau cek produk rekomendasi kami.
                  Terimakasih <span size="lg">🤯</span>
                </AlertDescription>
                <Button>
                  <a href="#search">Ganti Kata Kunci</a>
                </Button>
              </Alert>
            ) : null}
            <Text fontWeight="semibold" fontSize="20px">
              {page}
            </Text>
            {page >= maxPage ? null : (
              <FaArrowRight onClick={nextPageProduct} />
            )}
          </Flex>
        </Box>
      </Box>

      {/* Using Animate */}

      {/* <Box ml="15em" mr="1em" mt="1em">
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
      {/* <Footer /> */}
    </>
  )
}

export default ProductList
