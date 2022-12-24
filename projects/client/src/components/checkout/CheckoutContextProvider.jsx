import { createContext } from "react";

// Own library imports
import useSelectAddress from "../../lib/checkout/hooks/useSelectAddress";
import useGetShippingCost from "../../lib/checkout/hooks/useGetShippingCost";
import useGetCartItems from "../../lib/checkout/hooks/useGetCartItems";
import { useEffect } from "react";

export const CheckoutContext = createContext(null);

export const CheckoutContextProvider = ({ children }) => {
  // Address
  const {
    shippingAddress,
    addresses,
    isLoading,
    setShippingAddress,
    setAddresses,
  } = useSelectAddress();

  // Items
  const { cartItems, totalWeight, totalQuantity, totalPrice, setTotalPrice } =
    useGetCartItems();

  // Shipping
  const {
    isFetchingCourier,
    shippingOptions,
    shippingServices,
    selectedCourierName,
    serviceType,
    shippingCost,
    displayServiceButton,
    isReloading,
    setSelectedCourier,
    setIsFetchingCourier,
    setServiceType,
    setIsReloading,
  } = useGetShippingCost(shippingAddress, totalWeight);

  const value = {
    address: {
      shippingAddress,
      addresses,
      isLoading,
      setShippingAddress,
      setAddresses,
    },
    items: {
      cartItems,
      totalWeight,
      totalQuantity,
      totalPrice,
      setTotalPrice,
    },
    shipping: {
      isFetchingCourier,
      shippingOptions,
      shippingServices,
      selectedCourierName,
      serviceType,
      shippingCost,
      displayServiceButton,
      isReloading,
      setSelectedCourier,
      setIsFetchingCourier,
      setServiceType,
      setIsReloading,
    },
  };

  useEffect(() => {
    console.log(serviceType);
  }, [serviceType]);

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
