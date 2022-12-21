import { createContext, useState, useEffect } from "react";

// Own library imports
import fetchWarehousesDetails from "../../lib/checkout/fetchWarehousesDetails";

export const CheckoutContext = createContext(null);

export const CheckoutContextProvider = ({ children }) => {
  // Address
  const [shippingAddress, setShippingAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);

  // Shipping
  const [warehouseDetails, setWarehouseDetails] = useState(null);

  // Get warehouse details
  useEffect(() => {
    fetchWarehousesDetails().then((res) => setWarehouseDetails(res));
  }, []);

  const value = {
    shippingAddress,
    addresses,
    warehouseDetails,
    setShippingAddress,
    setAddresses,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
