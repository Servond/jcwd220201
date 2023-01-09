import { useEffect, useState } from "react";

// Own library imports
import fetchAddresses from "../fetchAddresses";

const useSelectAddress = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [noAddressFound, setNoAddressFound] = useState(true);
  const [displayNoAddressFound, setDisplayNoAddressFound] = useState(false);

  // Get available addresses
  useEffect(() => {
    fetchAddresses().then((res) => {
      const { selectedAddress, addresses } = res.data;
      if (!selectedAddress && !addresses.length) {
        setDisplayNoAddressFound(true);
        return;
      }

      setShippingAddress(selectedAddress);
      setAddresses(addresses);
      setNoAddressFound(false);
    });
  }, []);

  // Update addresses when added in the checkout page
  useEffect(() => {
    if (!noAddressFound) {
      fetchAddresses().then((res) => {
        const { selectedAddress, addresses } = res.data;
        setShippingAddress(selectedAddress);
        setAddresses(addresses);
        setDisplayNoAddressFound(false);
      });
      return;
    }
  }, [noAddressFound]);

  // Display address component
  useEffect(() => {
    if (shippingAddress && addresses.length) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
  }, [shippingAddress, addresses]);

  return {
    shippingAddress,
    addresses,
    isLoading,
    noAddressFound,
    displayNoAddressFound,
    setShippingAddress,
    setAddresses,
    setNoAddressFound,
  };
};

export default useSelectAddress;
