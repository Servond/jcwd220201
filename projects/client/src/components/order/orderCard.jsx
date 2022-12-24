import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"

import { axiosInstance } from "../../api"

import OrderCard from "./order"

const Order = () => {
  const [order, setOrder] = useState([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const fetchOrder = async () => {
    try {
      const resp = await axiosInstance.get(`/order`)

      setOrder(resp.data.data)

      console.log(setOrder, "orde")
    } catch (err) {
      console.log(err)
    }
  }
  const cancelBtn = async (id) => {
    try {
      await axiosInstance.patch(`/order/cancel/${id}`)

      fetchOrder()
      toast({
        status: "success",
        title: "Done",
      })
    } catch (err) {
      console.log(err)
      toast({
        status: "error",
        title: "Failed",
      })
    }
  }

  const renderItem = () => {
    return order.map((val) => {
      return (
        <Tr key={val.id}>
          <Td>{val.payment_date}</Td>
          <Td>{val.shipping_service}</Td>
          <Td> {val.payment_reciept}</Td>
          <Td> {val.total_price}</Td>
          <Td>
            <Button onClick={onOpen}> Cancel</Button>

            <AlertDialog isOpen={isOpen} onClose={onClose}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontStyle="bold">
                    Cancel Order
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure to cancel this order?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Batal
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        cancelBtn(val.id)
                      }}
                      disabled={true}
                    >
                      Cancel
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Td>

          <Td></Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <>
      <Stack>
        <Box
          display={"flex"}
          fontSize="14px"
          justifyContent={"center"}
          mt={"50px"}
        >
          <Box
            w="500px"
            boxShadow={"0 0 10px 3px rgb(0 0 0 / 10%)"}
            borderRadius={"10px"}
            p="24px 40px 32px "
            textAlign={"center"}
            bgColor={"white"}
            mt="120px"
          >
            <Text
              fontSize="22px"
              fontWeight={"bold"}
              textAlign={"left"}
              color="teal.600"
              fontFamily="Open Sauce One',sans-serif"
            >
              Belanja...
            </Text>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>{renderItem()}</Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Stack>
    </>
  )
}

export default Order
