import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useMediaQuery,
  Button,
  Text,
} from "@chakra-ui/react";

// Own library imports
import deleteAddress from "../../lib/address/deleteAddress";
import fetchAddresses from "../../lib/address/fetchAddresses";

const ConfirmationModal = ({
  id,
  label,
  isOpen,
  onClose,
  setters: { setAddresses, setTotalPage },
}) => {
  // Media query
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)");

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      size={isLargerThanMd ? "lg" : isLargerThanSm ? "md" : "sm"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent p="2rem 2rem 1.5rem">
        <ModalHeader
          textAlign="center"
          fontSize={
            isLargerThanMd
              ? "1.714rem"
              : isLargerThanSm
              ? "1.116rem"
              : "0.726rem"
          }
          fontWeight="700"
          mb={
            isLargerThanMd
              ? "0.875rem"
              : isLargerThanSm
              ? "0.504rem"
              : "0.290rem"
          }
          p="0"
        >
          Hapus Alamat
        </ModalHeader>
        <ModalBody
          color="rgb(108, 114, 124)"
          textAlign="center"
          fontSize={
            isLargerThanMd
              ? "0.989rem"
              : isLargerThanSm
              ? "0.644rem"
              : "0.419rem"
          }
          lineHeight="1.5rem"
          m={
            isLargerThanMd
              ? "0 1rem 1rem"
              : isLargerThanSm
              ? "0 1rem 0.577rem"
              : "0 1rem 0.332rem"
          }
          p="0"
        >
          Apakah Anda yakin untuk menghapus <Text as="b">"{label}"</Text>? Anda
          tidak dapat mengembalikan alamat yang sudah dihapus.
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="center"
          py={
            isLargerThanMd ? "1rem" : isLargerThanSm ? "0.577rem" : "0.332rem"
          }
        >
          <Button
            onClick={() => {
              onClose();
            }}
            mr="0.375rem"
            width={
              isLargerThanMd
                ? "10.25rem"
                : isLargerThanSm
                ? "6.673rem"
                : "4.341rem"
            }
            height={
              isLargerThanMd ? "3rem" : isLargerThanSm ? "2.478rem" : "2.046rem"
            }
            maxW="100%"
            border="1px solid"
            fontSize={
              isLargerThanMd ? "1rem" : isLargerThanSm ? "0.826rem" : "0.682rem"
            }
            fontWeight="700"
            colorScheme="white"
            color="teal"
            lineHeight="22px"
            whiteSpace="nowrap"
          >
            Batal
          </Button>
          <Button
            width={
              isLargerThanMd
                ? "10.25rem"
                : isLargerThanSm
                ? "6.673rem"
                : "4.341rem"
            }
            height={
              isLargerThanMd ? "3rem" : isLargerThanSm ? "2.478rem" : "2.046rem"
            }
            maxW="100%"
            fontSize={
              isLargerThanMd ? "1rem" : isLargerThanSm ? "0.826rem" : "0.682rem"
            }
            fontWeight="700"
            colorScheme="teal"
            lineHeight="22px"
            whiteSpace="nowrap"
            onClick={async () => {
              // Delete address
              await deleteAddress(id);

              // Update address list
              const response = await fetchAddresses();
              console.log(response.data.data);
              const { addresses: newAddressList, totalPage } =
                response.data.data;
              setAddresses(newAddressList);
              setTotalPage(totalPage);
            }}
          >
            Hapus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
