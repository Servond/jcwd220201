import { useState, useEffect } from "react";

// Own library imports
import fetchCartItems from "../fetchCartItems";
import getTotalPrice from "../getTotalPrice";
import getTotalQuantity from "../getTotalQuantity";
import getTotalWeight from "../getTotalWeight";

const useGetCartItems = () => {
  const [cartItems, setCartItems] = useState(null);
  const [totalWeight, setTotalWeight] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    fetchCartItems().then((res) => setCartItems(res.data));
  }, []);

  useEffect(() => {
    if (!cartItems) {
      return;
    }

    getTotalWeight(cartItems, setTotalWeight);
    getTotalQuantity(cartItems, setTotalQuantity);
    getTotalPrice(cartItems, setTotalPrice);
  }, [cartItems]);

  return { cartItems, totalWeight, totalQuantity, totalPrice, setTotalPrice };
};

export default useGetCartItems;
