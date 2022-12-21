import { createContext } from "react";

// Own library imports
import useSelectAddress from "../../lib/checkout/hooks/useSelectAddress";
import useFetchWarehouseDetails from "../../lib/checkout/hooks/useFetchWarehouseDetails";

export const CheckoutContext = createContext(null);

export const CheckoutContextProvider = ({ children }) => {
  // Address
  const { shippingAddress, addresses, isLoading, setShippingAddress } =
    useSelectAddress();

  // Shipping
  const warehouseDetails = useFetchWarehouseDetails();

  const value = {
    address: {
      shippingAddress,
      addresses,
      isLoading,
      setShippingAddress,
    },
    shipping: {
      warehouseDetails,
    },
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
