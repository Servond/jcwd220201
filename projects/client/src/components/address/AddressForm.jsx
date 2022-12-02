import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Checkbox,
  Text,
  HStack,
  Link,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddressForm = ({ isOpen, onClose }) => {
  // Form functionality
  const formik = useFormik({
    initialValues: {
      name: "",
      // phone: "",
      // label: "",
      // city: "",
      // address: "",
      // isDefault: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50).required("Wajib diisi"),
      // phone: Yup.string().max(13).required("Wajib diisi"),
      // label: Yup.string().max(30).required("Wajib diisi"),
      // city: Yup.string().required("Wajib diisi"),
      // address: Yup.string().max(200).required("Wajib diisi"),
      // isDefault: Yup.boolean(),
    }),
    onSubmit: () => {},
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
      <ModalOverlay />
      <ModalContent color="rgba(49, 53, 59, 0.96)">
        <ModalHeader
          fontSize="1.625rem"
          fontWeight="700"
          letterSpacing="-0.2px"
          lineHeight="1.125rem"
          marginBlockEnd="1rem"
          marginBlockStart="1.5rem"
          p="0"
          textAlign="center"
        >
          Tambah Alamat
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody
          fontSize="0.875rem"
          lineHeight="1rem"
          mt="1rem"
          p="1.5rem 2.5rem"
          textAlign="left"
        >
          <Heading fontSize="1.375rem" mb="1.5rem">
            Lengkapi detail alamat
          </Heading>
          <FormControl>
            <FormLabel
              fontSize="0.9375rem"
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Nama Penerima
            </FormLabel>
            <Input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              focusBorderColor="rgb(49, 151, 149)"
              fontSize="0.875rem"
              maxLength="50"
            />
            <FormHelperText
              color="rgba(49, 53, 59, 0.68)"
              fontSize="0.8125rem"
              textAlign="right"
              lineHeight="1rem"
            >
              0/50
            </FormHelperText>
          </FormControl>
          {/* <FormControl mt="0.75rem">
            <FormLabel
              fontSize="0.9375rem"
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Nomor HP
            </FormLabel>
            <Input
              id="phone"
              type="text"
              {...formik.getFieldProps("phone")}
              focusBorderColor="rgb(49, 151, 149)"
              fontSize="0.875rem"
            />
          </FormControl>
          <FormControl mt="2.125rem">
            <FormLabel
              fontSize="0.9375rem"
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Label Alamat
            </FormLabel>
            <Input
              id="label"
              type="text"
              {...formik.getFieldProps("label")}
              focusBorderColor="rgb(49, 151, 149)"
              fontSize="0.875rem"
              maxLength="50"
            />
            <FormHelperText
              color="rgba(49, 53, 59, 0.68)"
              fontSize="0.8125rem"
              textAlign="right"
              lineHeight="1rem"
            >
              0/50
            </FormHelperText>
          </FormControl>
          <FormControl mt="0.75rem" isInvalid={true}>
            <FormLabel
              fontSize="0.9375rem"
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Kota
            </FormLabel>
            <Input
              id="city"
              type="text"
              {...formik.getFieldProps("city")}
              focusBorderColor="rgb(49, 151, 149)"
              fontSize="0.875rem"
            />
            <FormErrorMessage
              fontSize="0.8125rem"
              lineHeight="1rem"
              mt="0.25rem"
            >
              Wajib diisi
            </FormErrorMessage>
          </FormControl>
          <FormControl mt="2.125rem" mb="0.25rem">
            <FormLabel
              fontSize="0.9375rem"
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Alamat Lengkap
            </FormLabel>
            <Textarea
              id="address"
              {...formik.getFieldProps("address")}
              focusBorderColor="rgb(49, 151, 149)"
              fontSize="0.875rem"
              height="7.4375rem"
              lineHeight="1.375rem"
              overflowWrap="break-word"
              p="0.5rem 0.75rem"
              resize="none"
            ></Textarea>
          </FormControl>
          <FormControl mt="2rem">
            <HStack>
              <Checkbox
                id="isDefault"
                {...formik.getFieldProps("isDefault")}
                colorScheme="teal"
                size="lg"
              />
              <Text fontSize="0.9375rem">Jadikan alamat utama</Text>
            </HStack>
          </FormControl> */}
          <Text
            fontSize="0.75rem"
            lineHeight="1.125rem"
            mt="1.5rem"
            mb="0.75rem"
            textAlign="center"
          >
            Dengan klik "Simpan", kamu menyetujui{" "}
            <Link color="teal" fontWeight="700" textDecoration="none">
              Syarat & Ketentuan.
            </Link>
          </Text>
          <Box textAlign="center" my="1rem">
            <Button
              borderRadius="0.5rem"
              colorScheme="teal"
              fontWeight="bold"
              fontSize="1rem"
              height="3rem"
              lineHeight="1.375rem"
              px="1rem"
            >
              Simpan
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddressForm;
