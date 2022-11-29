import { ChakraProvider } from "@chakra-ui/react";
import Address from "./pages/Address";
import theme from "./theme/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Address />
    </ChakraProvider>
  );
}

export default App;
