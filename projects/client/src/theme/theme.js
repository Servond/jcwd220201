import { extendTheme } from "@chakra-ui/react";
import Button from "./address/buttons";
import AddressCard from "./address/addressCard";

const theme = extendTheme({
  components: {
    Button,
    AddressCard,
  },
});

export default theme;
