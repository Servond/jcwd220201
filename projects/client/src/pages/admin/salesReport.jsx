import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { axiosInstance } from "../../api"
import PageButton from "../../components/admin/pageButton"
import SidebarAdmin from "../../components/admin/sidebarAdminDashboard"
import { Rupiah } from "../../lib/currency/Rupiah"

const SalesReport = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("")
  const [filter, setFilter] = useState("All")
  const [filterMonth, setFilterMonth] = useState("")
  const [filterWare, setFilterWare] = useState("")
  const [currentSearch, setCurrentSearch] = useState("")
  const [nameSearch, setNameSearch] = useState("")
  const [catSearch, setCatSearch] = useState("")
  const [warehouse, setWarehouse] = useState([])
  const [categories, setCategories] = useState([])
  const [sales, setSales] = useState([])

  const authSelector = useSelector((state) => state.auth)

  const fetchReport = async () => {
    try {
      const response = await axiosInstance.get(`/sales/report/2`, {
        params: {
          _page: page,
          _limit: limit,
          _sortBy: sortBy,
          CategoryId: filter,
          payment_date: filterMonth,
          product_name: nameSearch,
          WarehouseId: filterWare,
          // category: catSearch,
        },
      })

      setSales(response.data.data)
      console.log(response, "resp")
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
      setNameSearch(nameSearch)
    }
  }

  const sortHandler = ({ target }) => {
    const { value } = target
    setSortBy(value)
  }

  console.log(
    "sales",
    sales.map((val) =>
      val.OrderItems.map((value) => value.Product.product_name)
    )
  )
  console.log(
    "proId",
    sales.map((val) => val.OrderItems.map((value) => value.ProductId))
  )
  console.log(
    "cat",
    sales.map((val) =>
      val.OrderItems.map((value) => value.Product.Category.category)
    )
  )

  console.log(
    "ware",
    sales.map((val) => val.Warehouse.warehouse_name)
  )

  // const renderSales = () => {
  //   return sales.map((val) => {
  //     return (
  //       <Tr key={val.id}>
  //         <Td>{val.WarehouseId}</Td>
  //         <Td>{val.CategoryId}</Td>
  //         <Td>{val.category}</Td>
  //         <Td>{val.product_name}</Td>
  //         <Td>{Rupiah(val.total_price)}</Td>
  //         <Td>{val.shipping_cost}</Td>
  //         <Td>{Rupiah(val.total)}</Td>
  //         <Td>{val.warehouse_name}</Td>
  //         <Td>{val.payment_date}</Td>
  //       </Tr>
  //     )
  //   })
  // }

  const renderPageButton = () => {
    const totalPage = Math.ceil(totalCount / limit)

    const pageArray = new Array(totalPage).fill(null).map((val, i) => ({
      id: i + 1,
    }))

    return pageArray.map((val) => {
      return (
        <PageButton
          key={val.id.toString()}
          id={val.id}
          onClick={() => setPage(val.id)}
        />
      )
    })
  }

  useEffect(() => {
    fetchReport()
  }, [filterMonth, filterWare, filter, page, sortBy, nameSearch, catSearch])

  useEffect(() => {
    fethWarehouse()
    getCategory()
  }, [])

  return (
    <>
      <Container bg="#e0e7eb" maxW="vw" p="0">
        <Flex h="100vh" p="0">
          <VStack h="full" w="30%" minW="220px" bg="#008deb">
            {SidebarAdmin()}
          </VStack>

          <VStack h="full" w="full" overflowX="scroll">
            <Flex h="20%" w="full" justifyContent="flex-end" direction="column">
              <Box
                padding="4"
                textAlign="center"
                fontWeight="bold"
                fontSize="200x"
              >
                Sales Report
              </Box>
            </Flex>

            <Flex h="80%" w="full" direction="column">
              <Flex>
                <Box mt="3vh">
                  <Grid
                    p="5px"
                    gap="5"
                    w="full"
                    gridTemplateColumns="repeat(5,1fr)"
                  >
                    {/* Sort */}
                    <GridItem
                      w="full"
                      justifySelf="center"
                      border="1px solid #dfe1e3"
                      borderRadius="8px"
                      onChange={sortHandler}
                    >
                      <Select>
                        <option value="">sort</option>
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
                        <option value="">Select Month</option>
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
                        <option value="">Select Category</option>
                        {categories.map((val) => (
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
                    >
                      <Select>
                        <option value="">Select Warehouse</option>
                        {warehouse.map((val) => (
                          <option value={val.id}>{val.warehouse_name}</option>
                        ))}

                        {/* <option value=""> Select Warehouse</option>
                    {authSelector.WarehouseId ===
                    sales.map((val) => val.WarehouseId)[0]
                      ? sales.map((val) => (
                          <option value={val.WarehouseId}>
                            {val.warehouse_name}
                          </option>
                        ))[0]
                      : Warehouse.map((val) => (
                          <option value={val.id}>{val.warehouse_name}</option>
                        ))} */}
                      </Select>
                    </GridItem>

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
                        <Button
                          borderLeftRadius={"0"}
                          bgColor={"white"}
                          type="submit"
                          border="1px solid #e2e8f0"
                          borderLeft={"0px"}
                        >
                          search
                        </Button>
                      </InputGroup>
                    </GridItem>
                  </Grid>
                </Box>
              </Flex>

              <Container maxW="container.xl">
                <TableContainer
                  border={"1px solid black"}
                  mt={8}
                  overflowY="unset"
                >
                  <Table responsive="md" variant="simple">
                    <Thead
                      position={"sticky"}
                      top={-1}
                      backgroundColor={"#718096"}
                      textColor="black"
                    >
                      <Tr>
                        <Th w="100px">
                          <Text fontSize="10px">WarehouseId</Text>
                        </Th>

                        <Th w="100px">
                          <Text fontSize="10px">Category</Text>
                        </Th>
                        <Th w="100px">
                          <Text fontSize="10px">product_name</Text>
                        </Th>
                        <Th w="100px">
                          <Text fontSize="10px">Total price</Text>
                        </Th>
                        <Th w="100px">
                          <Text fontSize="10px">Shipping Cost</Text>
                        </Th>

                        <Th w="100px">
                          <Text fontSize="10px">Payment_Date</Text>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {sales.map((val) =>
                        val.OrderItems.map((value) => (
                          <Tr>
                            <Td>{val.Warehouse.warehouse_name}</Td>
                            <Td>{value.Product.Category.category}</Td>
                            <Td>{value.Product.product_name}</Td>
                            <Td>{Rupiah(val.total_price)}</Td>
                            <Td>{Rupiah(val.shipping_cost)}</Td>
                            <Td>{val.payment_date}</Td>
                          </Tr>
                        ))
                      )}
                    </Tbody>
                    {/* <Tbody maxWidth="max-content"> {renderSales()}</Tbody> */}
                  </Table>
                </TableContainer>
              </Container>

              <HStack w="full" alignSelf="flex-end" justifyContent="center">
                {renderPageButton()}
                <Box>
                  Page {page}/{Math.ceil(totalCount / limit)}
                </Box>
              </HStack>
              <Box h="4%" w="full"></Box>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export default SalesReport
