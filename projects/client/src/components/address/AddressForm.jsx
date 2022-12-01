import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
} from "@chakra-ui/react";

const AddressForm = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
      <ModalOverlay />
      <ModalContent color="rgba(49, 53, 59, 0.96)">
        <ModalHeader
          fontSize="1.5rem"
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
        <ModalBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          qui quod eligendi possimus temporibus dolor provident, velit molestias
          recusandae ipsam tempore eaque eius, ea, odio consectetur modi
          officiis cupiditate dolore!Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Asperiores qui quod eligendi possimus temporibus
          dolor provident, velit molestias recusandae ipsam tempore eaque eius,
          ea, odio consectetur modi officiis cupiditate dolore! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Asperiores qui quod
          eligendi possimus temporibus dolor provident, velit molestias
          recusandae ipsam tempore eaque eius, ea, odio consectetur modi
          officiis cupiditate dolore!Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Asperiores qui quod eligendi possimus temporibus
          dolor provident, velit molestias recusandae ipsam tempore eaque eius,
          ea, odio consectetur modi officiis cupiditate dolore! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Asperiores qui quod
          eligendi possimus temporibus dolor provident, velit molestias
          recusandae ipsam tempore eaque eius, ea, odio consectetur modi
          officiis cupiditate dolore!Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Asperiores qui quod eligendi possimus temporibus
          dolor provident, velit molestias recusandae ipsam tempore eaque eius,
          ea, odio consectetur modi officiis cupiditate dolore! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Asperiores qui quod
          eligendi possimus temporibus dolor provident, velit molestias
          recusandae ipsam tempore eaque eius, ea, odio consectetur modi
          officiis cupiditate dolore!Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Asperiores qui quod eligendi possimus temporibus
          dolor provident, velit molestias recusandae ipsam tempore eaque eius,
          ea, odio consectetur modi officiis cupiditate dolore! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Asperiores qui quod
          eligendi possimus temporibus dolor provident, velit molestias
          recusandae ipsam tempore eaque eius, ea, odio consectetur modi
          officiis cupiditate dolore!Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Asperiores qui quod eligendi possimus temporibus
          dolor provident, velit molestias recusandae ipsam tempore eaque eius,
          ea, odio consectetur modi officiis cupiditate dolore! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Asperiores qui quod
          eligendi possimus temporibus dolor provident, velit molestias
          recusandae ipsam tempore eaque eius, ea, odio consectetur modi
          officiis cupiditate dolore!Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Asperiores qui quod eligendi possimus temporibus
          dolor provident, velit molestias recusandae ipsam tempore eaque eius,
          ea, odio consectetur modi officiis cupiditate dolore!
        </ModalBody>
        <ModalFooter>
          <Button>Test</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddressForm;
