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
import { useState } from "react";
import * as Yup from "yup";

// Own library imports
import useCheckInputError from "../../lib/address/hooks/useCheckInputError";
import clearInput from "../../lib/address/clearInput";
import CitiesInput from "./CitiesInput";

const AddressForm = ({ isOpen, onClose }) => {
  // Monitor user input
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [labelError, setLabelError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  // Form functionality
  const NAME_MAX_LENGTH = 50;
  const LABEL_MAX_LENGTH = 30;
  const ADDRESS_MAX_LENGTH = 200;

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      label: "",
      city: "",
      address: "",
      isDefault: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50).required("Wajib diisi"),
      phone: Yup.string().max(13, "harus 13 angka").required("Wajib diisi"),
      label: Yup.string().max(30).required("Wajib diisi"),
      city: Yup.string().required("Wajib diisi"),
      address: Yup.string().max(200).required("Wajib diisi"),
      isDefault: Yup.boolean(),
    }),
    onSubmit: () => {},
  });

  // Invalid input error handling
  const nameErrorTrigger = formik.touched.name && formik.errors.name;
  const phoneErrorTrigger = formik.touched.phone && formik.errors.phone;
  const labelErrorTrigger = formik.touched.label && formik.errors.label;
  const cityErrorTrigger = formik.touched.city && formik.errors.city;
  const addressErrorTrigger = formik.touched.address && formik.errors.address;

  const handleInputErrors = [
    { trigger: nameErrorTrigger, callback: setNameError },
    { trigger: phoneErrorTrigger, callback: setPhoneError },
    { trigger: labelErrorTrigger, callback: setLabelError },
    { trigger: cityErrorTrigger, callback: setCityError },
    { trigger: addressErrorTrigger, callback: setAddressError },
  ];

  useCheckInputError(handleInputErrors);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        clearInput(formik.values, formik.touched, formik.setFieldValue);
        onClose();
      }}
      scrollBehavior="inside"
      size={["xs", "md", "2xl", "3xl"]}
    >
      <ModalOverlay />
      <ModalContent color="rgba(49, 53, 59, 0.96)">
        <ModalHeader
          fontSize={["1.375rem", "1.5rem", "1.625rem", "1.625rem"]}
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
          fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
          lineHeight="1rem"
          mt="1rem"
          p="1.5rem 2.5rem"
          textAlign="left"
        >
          <Heading
            fontSize={["1.125rem", "1.25rem", "1.375rem", "1.375rem"]}
            mb="1.5rem"
          >
            Lengkapi detail alamat
          </Heading>
          <FormControl isInvalid={nameError}>
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
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
              focusBorderColor={
                nameError ? "rgb(230, 68, 68)" : "rgb(49, 151, 149)"
              }
              fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
              height={["2.125rem", "2.25rem", "2.5rem", "2.5rem"]}
              maxLength={NAME_MAX_LENGTH}
            />
            <HStack
              mt="0.25rem"
              justifyContent={nameError ? "space-between" : "flex-end"}
            >
              <FormErrorMessage
                display="inline-block"
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.errors.name}
              </FormErrorMessage>
              <FormHelperText
                display="inline-block"
                color={
                  nameError ? "rgb(230, 68, 68)" : "rgba(49, 53, 59, 0.68)"
                }
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.values.name.length}/{NAME_MAX_LENGTH}
              </FormHelperText>
            </HStack>
          </FormControl>
          <FormControl isInvalid={phoneError} mt="0.75rem">
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Nomor HP
            </FormLabel>
            <Input
              id="phone"
              type="tel"
              {...formik.getFieldProps("phone")}
              focusBorderColor={
                phoneError ? "rgb(230, 68, 68)" : "rgb(49, 151, 149)"
              }
              fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
              maxLength={13}
            />
            <HStack mt="0.25rem" justifyContent="flex-start">
              <FormErrorMessage
                display="inline-block"
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.errors.phone}
              </FormErrorMessage>
            </HStack>
          </FormControl>
          <FormControl isInvalid={labelError} mt="2.125rem">
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
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
              focusBorderColor={
                labelError ? "rgb(230, 68, 68)" : "rgb(49, 151, 149)"
              }
              fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
              maxLength={LABEL_MAX_LENGTH}
            />
            <HStack
              mt="0.25rem"
              justifyContent={labelError ? "space-between" : "flex-end"}
            >
              <FormErrorMessage
                display="inline-block"
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.errors.label}
              </FormErrorMessage>
              <FormHelperText
                display="inline-block"
                color={
                  labelError ? "rgb(230, 68, 68)" : "rgba(49, 53, 59, 0.68)"
                }
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.values.label.length}/{LABEL_MAX_LENGTH}
              </FormHelperText>
            </HStack>
          </FormControl>
          <FormControl isInvalid={cityError} mt="0.75rem">
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Kota
            </FormLabel>
            <CitiesInput formik={formik} error={cityError} />
            <FormErrorMessage
              fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
              lineHeight="1rem"
              mt="0.25rem"
            >
              {formik.errors.city}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={addressError} mt="2.125rem" mb="0.25rem">
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
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
              focusBorderColor={
                addressError ? "rgb(230, 68, 68)" : "rgb(49, 151, 149)"
              }
              fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
              height="7.4375rem"
              lineHeight="1.375rem"
              maxLength={ADDRESS_MAX_LENGTH}
              overflowWrap="break-word"
              p="0.5rem 0.75rem"
              resize="none"
            ></Textarea>
            <HStack
              mt="0.25rem"
              justifyContent={addressError ? "space-between" : "flex-end"}
            >
              <FormErrorMessage
                display="inline-block"
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.errors.address}
              </FormErrorMessage>
              <FormHelperText
                display="inline-block"
                color={
                  addressError ? "rgb(230, 68, 68)" : "rgba(49, 53, 59, 0.68)"
                }
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.values.address.length}/{ADDRESS_MAX_LENGTH}
              </FormHelperText>
            </HStack>
          </FormControl>
          <FormControl mt="2rem">
            <HStack>
              <Checkbox
                id="isDefault"
                {...formik.getFieldProps("isDefault")}
                colorScheme="teal"
                size={["md", "md", "lg", "lg"]}
              />
              <Text
                fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
              >
                Jadikan alamat utama
              </Text>
            </HStack>
          </FormControl>
          <Text
            fontSize={["0.625rem", "0.625rem", "0.75rem", "0.75rem"]}
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
              fontSize={["0.75rem", "0.875rem", "1rem", "1rem"]}
              height={["2.5rem", "2.75rem", "3rem", "3rem"]}
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
