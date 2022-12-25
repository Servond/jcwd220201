import {
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Select,
  Table,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../../../server/lib/checkout/api"

const SalesReport = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("product_name")
  const [sortDir, setSortDir] = useState("DESC")
  const [filter, setFilter] = useState("All")
  const [filterMonth, setFilterMonth] = useState("")
  const [filterWare, setFilterWare] = useState("")
  const [currentSearch, setCurrentSearch] = useState("")
  const [nameSearch, setNameSearch] = useState("")
  const [catSearch, setCatSearch] = useState("")
  const [warehouse, setWarehouse] = useState([])
  const [categories, setCategories] = useState([])
  const fetchReport = async () => {
    try {
      const response = await axiosInstance.get(`/sales/report/query`, {
        params: {
          _page: page,
          _limit: limit,
          _sortBy: sortBy,
          CategoryId: filter,
          payment_date: filterMonth,
          product_name: nameSearch,
          category: catSearch,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fethWarehouse = async () => {
    try {
      const respon = await axiosInstance.get(`/warehouses`)

      setWarehouse(respon.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCategory = async () => {
    try {
      const respon = await axiosInstance.get(`/categories`)

      setCategories(respon.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const filterWarehouseBtn = ({ target }) => {
    const { value } = target
    setFilterWare(value)
  }

  const filterCategoryBtn = ({ target }) => {
    const { value } = target
    setFilter(value)
  }

  const filterMonthBtn = ({ target }) => {
    const { value } = target
    setFilterMonth(value)
  }

  const searchBtnHandler = (e) => {
    setNameSearch(e.target.value)
  }

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setNameSearch(productSearch)
    }
  }

  const sortHandler = ({ target }) => {
    const { value } = target
    setSortBy(value)
  }

  useEffect(() => {
    fethWarehouse()
    getCategory()
  }, [])

  return (
    <>
      <Box ml="250px" mr="1.5em">
        <Box mt="2em">
          <Text fontSize="3xl" fontWeight="bold" fontFamily="sans-serif">
            Sales Report
          </Text>
          <Box mt="3vh">
            <Grid p="5px" gap="5" w="full" gridTemplateColumns="repeat(5,1fr)">
              {/* Sort */}
              <GridItem
                w="full"
                justifySelf="center"
                border="1px solid #dfe1e3"
                borderRadius="8px"
                onChange={sortHandler}
              >
                <Select>
                  <option value="">---Sort---</option>
                  <option value={"ASC"}>Ascending</option>
                  <option value={"DESC"}>Descending</option>
                </Select>
              </GridItem>

              {/* Month */}
              <GridItem
                w="full"
                justifySelf="center"
                border="1px solid #dfe1e3"
                borderRadius="8px"
                onChange={filterMonthBtn}
              >
                <Select>
                  <option value="">---By Month---</option>
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                  <option value={5}>May</option>
                  <option value={6}>June</option>
                  <option value={7}>July</option>
                  <option value={8}>August</option>
                  <option value={9}>September</option>
                  <option value={10}>October</option>
                  <option value={11}>November</option>
                  <option value={12}>December</option>
                </Select>
              </GridItem>

              {/* Category */}
              <GridItem
                w="full"
                justifySelf="center"
                border="1px solid #dfe1e3"
                borderRadius="8px"
                onChange={filterCategoryBtn}
              >
                <Select>
                  <option value="">---By Category---</option>
                  {categoryData.map((val) => (
                    <option value={val.id}>{val.category}</option>
                  ))}
                </Select>
              </GridItem>

              {/* Warehouse */}
              <GridItem
                w="full"
                justifySelf="center"
                onChange={filterWarehouseBtn}
                border="1px solid #dfe1e3"
                borderRadius="8px"
              ></GridItem>

              {/* Search */}
              <GridItem
                w="full"
                justifySelf="center"
                border="1px solid #dfe1e3"
                borderRadius="8px"
              >
                <InputGroup>
                  <Input
                    onChange={searchBtnHandler}
                    onKeyDown={handleKeyEnter}
                    value={nameSearch}
                  />
                </InputGroup>
              </GridItem>
            </Grid>
          </Box>

          <TableContainer
            border="1px solid #dfe1e3"
            mt="3vh"
            borderRadius="8px"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th w="100px">
                    <Text fontSize="10px">Date</Text>
                  </Th>
                  <Th w="100px">
                    <Text fontSize="10px">Product id</Text>
                  </Th>
                  <Th w="100px">
                    <Text fontSize="10px">Category</Text>
                  </Th>
                  <Th w="200px">
                    <Text fontSize="10px">Product Name</Text>
                  </Th>

                  <Th w="100px">
                    <Text fontSize="10px">Price</Text>
                  </Th>
                  <Th w="100px">
                    <Text fontSize="10px">qty</Text>
                  </Th>
                  <Th w="100px">
                    <Text fontSize="10px">Total</Text>
                  </Th>
                  <Th w="100px">
                    <Text fontSize="10px">Warehouse</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {salesData.map((val) => (
                  <Tr>
                    <Td>
                      {/* RAW QUERY */}
                      <Text>
                        {val.createdAt.split("T")[0]} /{" "}
                        {val.createdAt.split("T")[1].split(".000Z")}
                      </Text>
                    </Td>
                    <Td>
                      <Text>{val.productId}</Text>
                    </Td>
                    <Td>
                      <Text>{val.category}</Text>
                    </Td>
                    <Td maxW="200px">
                      <Text overflow="hidden" textOverflow="ellipsis">
                        {val.product_name}
                      </Text>
                    </Td>

                    <Td>
                      <Text>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(val.price)}
                      </Text>
                    </Td>
                    <Td>
                      <Text>{val.quantity}</Text>
                    </Td>

                    <Td>
                      <Text>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(val.total)}
                      </Text>
                    </Td>
                    <Td>
                      <Text>{val.warehouse_name}</Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}

export default SalesReport
