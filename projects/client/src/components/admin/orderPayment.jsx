import {
  Box,
  Button,
  Container,
  Flex,
  Modal,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { BiEdit } from "react-icons/bi"
import { axiosInstance } from "../../api"
import EditPayment from "./editpayment"
import SidebarAdmin from "./sidebarAdminDashboard"

const OrderPayment = () => {
  const [payment, setPayment] = useState([])
  const [statusEdit, setStatusEdit] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [idEdit, setIdEdit] = useState("")
  const toast = useToast()

  const fetchOrder = async () => {
    try {
      const resp = await axiosInstance.get(`/payment/order`)

      setPayment(resp.data.data)

      console.log(resp, "resp")
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (id) => {
    try {
      await axiosInstance.patch(`/payment/confirm/${id}`)
      console.log(id, "confirm")
      fetchOrder()
      toast({
        title: "email dikirim",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "confirm gagal",
        status: "error",
      })
    }
  }
  const rejectOrder = async (id) => {
    console.log(id, "id")
    try {
      await axiosInstance.patch(`/payment/reject/${id}`)
      console.log(id, "id")

      fetchOrder()
      toast({
        title: "email reject dikirim",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "Gagal",
        status: "error",
      })
    }
  }

  const renderOrder = () => {
    return payment.map((val) => {
      return (
        <Tr key={val.id}>
          <Td>{val.payment_date}</Td>
          <Td>{val.shipping_service}</Td>
          <Td>{val.payment_receipt}</Td>
          <Td>{val.total_price}</Td>
          <Td>{val.AddressId}</Td>
          <Td>{val.CourierId}</Td>
          <Td>{val.StatusId}</Td>
          <Td>{val.UserId}</Td>
          <Td>
            {" "}
            <Button
              alignContent={"left"}
              onClick={() => handleEdit(val.id)}
              mx="3"
              colorScheme={"teal"}
            >
              confirm
            </Button>
            <Button
              alignContent={"left"}
              onClick={() => rejectOrder(val.id)}
              mx="3"
              colorScheme={"teal"}
            >
              reject
            </Button>
          </Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchOrder()
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
              <Box padding="4">Manage Warehouse Data</Box>
            </Flex>
            <Flex>
              <Container maxW="container.xl" py="8" pb="5" px="1">
                <TableContainer
                  border={"1px solid black"}
                  w="1800px"
                  mt={8}
                  overflowY="unset"
                >
                  <Table responsive="md" variant="simple">
                    <Thead
                      position={"sticky"}
                      top={-1}
                      backgroundColor={"#718096"}
                    >
                      <Tr border={"1px solid black"} maxW="50px">
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          payment_date
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="300px"
                        >
                          shipping_service
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          payment_receipt
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          total_price
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          AddresId
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          CourierId
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          StatusId
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          UserId
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody maxWidth="max-content"> {renderOrder()}</Tbody>
                  </Table>
                </TableContainer>
              </Container>
            </Flex>
          </VStack>

          {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <EditPayment
              statusEdit={statusEdit}
              setStatusEdit={setStatusEdit}
              idEdit={idEdit}
              fetchOrder={fetchOrder}
            />
          </Modal> */}
        </Flex>
      </Container>
    </>
  )
}

export default OrderPayment
