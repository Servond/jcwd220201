import { useEffect, useState } from "react";

// Own library imports
import fetchNearestWarehouse from "../fetchNearestWarehouse";

const useFindNearestWarehouse = (shippingAddress) => {
  const [nearestWarehouse, setNearestWarehouse] = useState(null);

  useEffect(() => {
    if (!shippingAddress) {
      return;
    }
    fetchNearestWarehouse().then((res) => setNearestWarehouse(res.data));
  }, [shippingAddress]);

  return nearestWarehouse;
};

export default useFindNearestWarehouse;
