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
import { axiosInstance } from "../../api"
import SidebarAdmin from "./sidebarAdminDashboard"

const OrderPayment = () => {
  const [payment, setPayment] = useState([])
  const toast = useToast()
  const [reject, setReject] = useState("")

  const fetchOrder = async () => {
    try {
      const resp = await axiosInstance.get(`/payment`)

      setPayment(resp.data.data)

      console.log(resp, "resp")
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

  const renderOrder = () => {
    // console.log(payment, "pay")
    return payment.map((val) => {
      return (
        <Tr key={val.id}>
          <Td textAlign={"center"}>{val.payment_date}</Td>
          <Td textAlign={"center"}>{val.total_price}</Td>
          <Td textAlign={"center"}>{val.StatusId}</Td>
          <Td textAlign={"center"}>{val.UserId}</Td>
          <Td textAlign={"center"}>{val.shipping_cost}</Td>

          <Td>
            <Button
              alignContent={"left"}
              onClick={() => confirmOrder(val.id)}
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
              <Box
                padding="4"
                textAlign="center"
                fontWeight="bold"
                fontSize="200x"
              >
                Order Payment Status
              </Box>
            </Flex>
            <Flex>
              <Container maxW="container.lg" py="8" pb="5" px="1">
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
                          shipping cost
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody maxWidth="max-content">{renderOrder()}</Tbody>
                  </Table>
                </TableContainer>
              </Container>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export default OrderPayment
