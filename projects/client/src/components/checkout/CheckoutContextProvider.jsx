import { createContext } from "react";

// Own library imports
import useSelectAddress from "../../lib/checkout/hooks/useSelectAddress";
import useFindNearestWarehouse from "../../lib/checkout/hooks/useFindNearestWarehouse";
import { useEffect } from "react";

export const CheckoutContext = createContext(null);

export const CheckoutContextProvider = ({ children }) => {
  // Address
  const { shippingAddress, addresses, isLoading, setShippingAddress } =
    useSelectAddress();

  // Shipping
  const nearestWarehouse = useFindNearestWarehouse(shippingAddress);

  const value = {
    address: {
      shippingAddress,
      addresses,
      isLoading,
      setShippingAddress,
    },
    shipping: {
      nearestWarehouse,
    },
  };

  useEffect(() => console.log(nearestWarehouse), [nearestWarehouse]);

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
