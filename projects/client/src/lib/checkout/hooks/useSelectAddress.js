import { useEffect, useState } from "react";

// Own library imports
import fetchAddresses from "../fetchAddresses";

const useSelectAddress = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAddresses()
      .then((res) => {
        if (!shippingAddress) {
          setShippingAddress(res.data.selectedAddress);
        }
        setAddresses(res.data.addresses);
      })
      .then(() => setIsLoading(true));
  }, [shippingAddress]);

  return { shippingAddress, addresses, isLoading, setShippingAddress };
};

export default useSelectAddress;
