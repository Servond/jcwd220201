import { useEffect, useState } from "react";
import fetchWarehousesDetails from "../fetchWarehousesDetails";

const useFetchWarehouseDetails = () => {
  const [warehouseDetails, setWarehouseDetails] = useState(null);

  useEffect(() => {
    fetchWarehousesDetails().then((res) => setWarehouseDetails(res));
  }, []);

  return warehouseDetails;
};

export default useFetchWarehouseDetails;
