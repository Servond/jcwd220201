import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"

import axios from "axios"

const EditPayment = (props) => {
  const inputFileRef = useRef()
  const toast = useToast()
  const { id } = useParams()
  const [file, setFile] = useState("")

  const { statusEdit, setStatusEdit, idEdit, setOpenModal, fetchOrder } = props

  const formik = useFormik({
    initialValues: {
      StatusId: "",
    },

    onSubmit: async ({ StatusId }) => {
      try {
        let editProduct = {
          StatusId: statusEdit,
        }

        const response = await axiosInstance.post(
          `/payment/confirm/${idEdit}`,
          editProduct
        )

        setOpenModal(false)
        fetchOrder()
        toast({
          title: "Status telah diedit",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Edit Gagal",
          status: "error",
        })
      }
    },
  })

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Container
              maxW="container.lg"
              w={"400px"}
              align={"center"}
              padding={"10px"}
              ringColor={"blue.500"}
            >
              <FormControl>
                <FormLabel>
                  Status
                  <Input
                    value={statusEdit}
                    onChange={(e) => setStatusEdit(e.target.value)}
                    name="StatusId"
                  />
                </FormLabel>
              </FormControl>
            </Container>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
            Edit Data
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default EditPayment
