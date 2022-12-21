import { useEffect } from "react";
import { createContext, useState } from "react";

export const CheckoutContext = createContext(null);

export const CheckoutContextProvider = ({ children }) => {
  // Address
  const [shippingAddress, setShippingAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);

  const value = {
    shippingAddress,
    addresses,
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
