import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Grid,
  HStack,
  Input,
  InputGroup,
  Modal,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { useFormik } from "formik"
import { axiosInstance } from "../../api"
import SidebarAdmin from "./sidebarAdminDashboard"
import PageButton from "./pageButton"

const OrderPayment = () => {
  const [payment, setPayment] = useState([])
  const toast = useToast()
  const [reject, setReject] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const [page, setPage] = useState(1)

  const [sortBy, setSortBy] = useState("UserId")
  const [sortDir, setSortDir] = useState("ASC")
  const [filter, setFilter] = useState("All")
  const [currentSearch, setCurrentSearch] = useState("")
  const [warehouse2, setWarehouse2] = useState([])

  const [limit, setLimit] = useState(5)
  const [totalCount, setTotalCount] = useState(0)

  const fetchOrder = async () => {
    try {
      const resp = await axiosInstance.get(`/payment`, {
        params: {
          _limit: limit,
          _page: page,
          _sortDir: sortDir,
          _sortBy: sortBy,
          WarehouseId: filter,
          product_name: currentSearch,
        },
      })

      setPayment(resp.data.data)
      setTotalCount(resp.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getWarehouse = async () => {
    try {
      const respon = await axiosInstance.get(`/warehouses`)

      setWarehouse2(respon.data.data)
      console.log(respon.data.data, "resp")
    } catch (err) {
      console.log(err)
    }
  }

  const confirmOrder = async (id) => {
    try {
      await axiosInstance.patch(`/payment/confirm/${id}`)

      fetchOrder()
      toast({
        title: "email dikirim",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "konfirmasi pembayaran gagal",
        status: "error",
      })
    }
  }
  const rejectOrder = async (id) => {
    try {
      const resp = await axiosInstance.patch(`/payment/reject/${id}`)

      setReject(resp.data.data)

      fetchOrder()
      toast({
        title: "email reject dikirim",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "reject pembayaran gagal",
        status: "error",
      })
    }
  }

  // const renderPageButton = () => {
  //   const totalPage = Math.ceil(totalCount / limit)

  //   const pageArray = new Array(totalPage).fill(null).map((val, i) => ({
  //     id: i + 1,
  //   }))

  //   return pageArray.map((val) => {
  //     return (
  //       <PageButton
  //         key={val.id.toString()}
  //         id={val.id}
  //         onClick={() => setPage(val.id)}
  //       />
  //     )
  //   })
  // }

  console.log(
    "pay",
    payment.map((val) => val.WarehouseId)
  )

  const renderOrder = () => {
    return payment.map((val) => {
      return val.OrderItems.map((value) => (
        <Tr key={val.id}>
          <Td textAlign={"center"} border={"1px solid black"}>
            {value.Product.product_name}
          </Td>
          <Td border={"1px solid black"} textAlign={"center"}>
            {val.payment_date}
          </Td>
          <Td border={"1px solid black"} textAlign={"center"}>
            {val.total_price}
          </Td>
          <Td border={"1px solid black"} textAlign={"center"}>
            {val.StatusId}
          </Td>
          <Td border={"1px solid black"} textAlign={"center"}>
            {val.UserId}
          </Td>
          <Td border={"1px solid black"} textAlign={"center"}>
            {val.WarehouseId}
          </Td>
          <Td border={"1px solid black"} textAlign={"center"} w="20%">
            <Button
              alignContent={"left"}
              onClick={() => confirmOrder(val.id)}
              mx="3"
              colorScheme={"teal"}
            >
              confirm
            </Button>
            <Button colorScheme="red" onClick={onOpen}>
              Reject
            </Button>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontStyle="bold">
                    Pembatalan Pembayaran
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />

                  <AlertDialogBody>
                    Apakah pembayaran ini ingin dibatalkan?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button mr="10px" ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        rejectOrder(val.id)
                      }}
                    >
                      Reject
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Td>
        </Tr>
      ))
    })
  }

  const sortUsertHandler = (event) => {
    const value = event.value
    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
  }

  const filterWarehouse = (event) => {
    const value = event.value

    setFilter(value)
  }

  const warehouseoption = warehouse2.map((val) => {
    return { value: val.id, label: val.warehouse_name }
  })

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search)
    },
  })

  const searchHandler = ({ target }) => {
    const { name, value } = target
    formikSearch.setFieldValue(name, value)
  }

  const btnResetFilter = () => {
    setCurrentSearch(false)
    setSortBy(false)
    setFilter(false)
    window.location.reload(false)
  }

  useEffect(() => {
    fetchOrder()
    getWarehouse()
  }, [page, sortBy, sortDir, filter, currentSearch])

  console.log(warehouseoption, "ware")

  const sortUser = [
    { value: "UserId ASC", label: "A-Z" },
    { value: "UserId DESC", label: "Z-A" },
  ]

  const customStyles = {
    control: (base) => ({
      ...base,
      width: "min-content",
      minWidth: "25vh",
    }),
  }

  // useEffect(() => {
  //   fetchOrder()
  // }, [])

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
                Order Payment Status
              </Box>
              <Grid
                gap="-4"
                w={"-moz-min-content"}
                templateColumns={"repeat(4, 1fr)"}
                mt="8"
                mb="4"
                ml="10%"
              >
                <Select
                  onChange={filterWarehouse}
                  fontSize={"15px"}
                  bgColor="white"
                  styles={customStyles}
                  placeholder="Filter By Warehouse"
                  options={warehouseoption}
                ></Select>

                <Select
                  onChange={(e) => {
                    sortUsertHandler(e)
                  }}
                  fontSize={"15px"}
                  bgColor="white"
                  styles={customStyles}
                  placeholder="Sort By UserId"
                  options={sortUser}
                ></Select>

                <form onSubmit={formikSearch.handleSubmit}>
                  <FormControl>
                    <InputGroup textAlign={"right"}>
                      <Input
                        type={"text"}
                        placeholder="Search By Name"
                        name="search"
                        bgColor={"white"}
                        h="4vh"
                        onChange={searchHandler}
                        borderRightRadius="0"
                        value={formikSearch.values.search}
                      />

                      <Button
                        borderLeftRadius={"0"}
                        bgColor={"white"}
                        type="submit"
                        h="4vh"
                        border="1px solid #e2e8f0"
                        borderLeft={"0px"}
                      >
                        search
                      </Button>
                    </InputGroup>
                  </FormControl>
                </form>

                <Button
                  onClick={btnResetFilter}
                  p="3"
                  w="12vh"
                  h="4vh"
                  ml="6"
                  bgColor="white"
                  variant="solid"
                  _hover={{ borderBottom: "2px solid " }}
                >
                  Reset Filter
                </Button>
              </Grid>
            </Flex>
            <Flex>
              <Container maxW="container.xl" py="8" pb="5" px="8">
                <TableContainer
                  border={"1px solid black"}
                  w="1800px"
                  mt={8}
                  overflowY="unset"
                >
                  <Table responsive="md" variant="simple">
                    <Thead position={"sticky"} top={-1}>
                      <Tr border={"1px solid black"} maxW="50px">
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          Name
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          Payment_Date
                        </Th>

                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          Total_Price
                        </Th>

                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          Status Id
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          User Id
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          warehouse id
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody maxWidth="max-content">{renderOrder()}</Tbody>
                  </Table>
                </TableContainer>
              </Container>

              {/* <HStack w="full" alignSelf="flex-end" justifyContent="center">
                {renderPageButton()}
                <Box>
                  Page {page}/{Math.ceil(totalCount / limit)}
                </Box>
              </HStack> */}
              <Box h="4%" w="full"></Box>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export default OrderPayment
