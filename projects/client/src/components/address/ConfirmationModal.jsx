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
  pageIndex,
  setters: { setAddresses, setTotalPage, setPageIndex },
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
      size={["xs", "xs", "sm", "md"]}
      isCentered
    >
      <ModalOverlay />
      <ModalContent p={["1rem", "1rem", "1.2rem"]}>
        <ModalHeader
          textAlign="center"
          fontSize={["0.927rem", "1.092rem", "1.285rem", "1.511rem"]}
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
          fontSize={["0.821rem", "0.874rem", "0.93rem", "0.989rem"]}
          lineHeight="1.5rem"
          p={["0.375rem", "0", "0", "0.375rem"]}
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
            width={["5.341rem", "5.841rem", "7.673rem", "10.25rem"]}
            height={["1.889rem", "2.046rem", "2.478rem", "2.7rem"]}
            maxW="100%"
            border="1px solid"
            fontSize={["0.729rem", "0.81rem", "0.9rem", "1rem"]}
            fontWeight="700"
            colorScheme="white"
            color="teal"
            lineHeight="22px"
            whiteSpace="nowrap"
          >
            Batal
          </Button>
          <Button
            // width={
            //   isLargerThanMd
            //     ? "10.25rem"
            //     : isLargerThanSm
            //     ? "6.673rem"
            //     : "4.341rem"
            // }
            width={["5.341rem", "5.841rem", "7.673rem", "10.25rem"]}
            height={["1.889rem", "2.046rem", "2.478rem", "2.7rem"]}
            maxW="100%"
            fontSize={["0.729rem", "0.81rem", "0.9rem", "1rem"]}
            fontWeight="700"
            colorScheme="teal"
            lineHeight="22px"
            whiteSpace="nowrap"
            onClick={async () => {
              // Delete address
              await deleteAddress(id);

              // Update address list
              if (!pageIndex) {
                const response = await fetchAddresses();
                console.log(response.data.data);
                const { addresses: newAddressList, totalPage } =
                  response.data.data;
                setAddresses(newAddressList);
                setTotalPage(totalPage);
                return;
              }

              setPageIndex(0);
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
