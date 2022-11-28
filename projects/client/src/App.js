import { ChakraProvider } from "@chakra-ui/react";
import Address from "./pages/Address";

function App() {
  return (
    <ChakraProvider>
      <Address />
    </ChakraProvider>
  );
}

export default App;
