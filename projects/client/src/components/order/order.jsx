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
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { BsThreeDots } from "react-icons/bs"
import { axiosInstance } from "../../api"

const OrderCard = ({
  payment_date,
  shipping_service,
  payment_reciept,
  total_price,
  id,
}) => {
  const [orderData, setOrderData] = useState({
    payment_date,
    shipping_service,
    payment_reciept,
    total_price,
    id,
  })

  const [orderId, setOrderId] = useState(0)

  const fetchId = async () => {
    try {
      const response = await axiosInstance.get(`/order/${id}`)
      setOrderData(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchId()
  }, [orderId])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const confirmDeleteBtnHandler = () => {
    onClose()
  }

  return (
    <>
      <Flex
        // w="full"
        w={{ base: "full", lg: "15em" }}
        h="full"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        bg="white"
        rounded="xl"
        shadow="2xl"
        // onClick={() => productDetail()}
      >
        <Box w="full" h="full">
          <Menu>
            <MenuButton>
              <Icon as={BsThreeDots} boxSize="20px" />
            </MenuButton>
            <MenuList>
              <MenuItem>Edit</MenuItem>
              <MenuItem onClick={onOpen}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <AlertDialog isCentered isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={confirmDeleteBtnHandler}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default OrderCard
