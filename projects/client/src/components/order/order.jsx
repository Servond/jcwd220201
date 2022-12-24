import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { useRef } from "react"
import { BsThreeDots } from "react-icons/bs"

const CancelOrder = (onCancel, order) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const cancelRef = useRef()

  // =======================================
  // Handle confirm delete

  const handleConfirmDeleteButton = () => {
    onCancel()
  }

  return (
    <>
      <Tr>
        <Td whiteSpace="break-spaces">{order}</Td>
        <Td>
          <Menu>
            <MenuButton>
              <Icon as={BsThreeDots} boxSize="20px" />
            </MenuButton>
            <MenuList>
              {/* <MenuItem onClick={onC}>Edit</MenuItem> */}
              <MenuItem onClick={onOpen}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontStyle="bold">
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to delete category? You can't undo this action
              afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDeleteButton}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default CancelOrder
