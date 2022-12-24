import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../../api"
import Search from "../../../components/admin/stock/Search"

import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Modal,
  Select,
  Table,
  InputGroup,
  InputRightAddon,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react"
import { BiEdit } from "react-icons/bi"
import { RiDeleteBin5Fill } from "react-icons/ri"
import ReactPaginate from "react-paginate"
import { Link, useNavigate } from "react-router-dom"
import SidebarAdmin from "../../../components/admin/sidebarAdminDashboard"
import { useSelector } from "react-redux"

const Stock = () => {
  const authSelector = useSelector((state) => state.auth)
  // console.log(authSelector)
  // Pagination & Search
  // const [pageIndex, setPageIndex] = useState(0)
  // const [totalPage, setTotalPage] = useState(0)
  //   const [warehouses, setWarehouses] = useState(null)
  //   const [warehouseLoad, setWarehouseLoad] = useState(false)
  // const [query, setQuery] = useState(null)
  const navigate = useNavigate()
  const toWarehouse = (warehouse_name) => {
    navigate(`/admin/update-stock/${warehouse_name}`)
  }
  // Render Warehouse
  const [warehouse, setWarehouse] = useState([])
  console.log("ware", warehouse)

  const fetchAllWarehouse = async () => {
    try {
      const response = await axiosInstance.get(`/admin/stock/all-warehouse`)

      setWarehouse(response.data.data.Warehouse)
      //   return response.data.data
    } catch (err) {
      console.log(err.response)
    }
  }

  // const fetchAllWarehouse = async (pageIndex = 0, input) => {
  //   try {
  //     const page = pageIndex + 1
  //     const query = input ? input : ""
  //     const value = encodeURI(query)
  //     const response = await axiosInstance.get(
  //       `/admin/stock/all-warehouse?page=${page}&search=${value}`
  //     )

  //     setWarehouse(response.data.data.Warehouse)
  //     //   return response.data.data
  //   } catch (err) {
  //     console.log(err.response)
  //   }
  // }

  useEffect(() => {
    fetchAllWarehouse()
  }, [])

  // useEffect(() => {
  //   fetchAllWarehouse(pageIndex, query).then((response) => {
  //     const { warehouses, totalPage } = response.data.data

  //     setWarehouse(warehouses)
  //     setTotalPage(totalPage)
  //   })
  // }, [query, pageIndex])

  return (
    <>
      <Container bg="#e0e7eb" maxW="vw" p="0">
        <Flex h="100vh" p="0">
          <VStack h="full" w="30%" minW="220px" bg="#008deb">
            {SidebarAdmin()}
          </VStack>

          <VStack h="90%" w="full" overflowX="scroll">
            <Search />
            <Table>
              <Thead>
                <Tr>
                  <Th>Nama Warehouse</Th>
                  <Th>Alamat</Th>
                  <Th>Kota</Th>
                  <Th>Provinsi</Th>
                  <Th>Warehouse Admin</Th>
                </Tr>
              </Thead>
              <Tbody>
                {warehouse.map((val) =>
                  val.WarehousesUsers.map((value) => (
                    <Tr h="auto">
                      {/* <Link to={`/admin/update-stock/${id}/${warehouse_name}`}> */}
                      <Td
                        cursor="pointer"
                        _hover={{ color: "teal.400" }}
                        onClick={() => toWarehouse(val.warehouse_name)}
                      >
                        {val.warehouse_name || "Not found"}
                      </Td>
                      {/* </Link> */}
                      <Td>{val.address}</Td>
                      <Td>{val.city}</Td>
                      <Td>{val.province}</Td>
                      <Td>{value.User.name || "Need Assign"}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </VStack>
          {/* <ReactPaginate
        breakLabel="..."
        containerClassName="address-pagination-buttons"
        forcePage={pageIndex}
        nextLabel="Berikutnya"
        onPageChange={({ selected }) => {
          setPageIndex(selected)
        }}
        pageRangeDisplayed={5}
        pageClassName="address-pagination-pages"
        pageCount={totalPage}
        previousLabel="Sebelumnya"
        renderOnZeroPageCount={null}
      /> */}
        </Flex>
      </Container>
    </>
  )
}

export default Stock
