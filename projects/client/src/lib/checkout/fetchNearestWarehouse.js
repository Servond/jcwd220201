import { axiosInstance } from "../../api";

const fetchNearestWarehouse = async () => {
  try {
    const response = await axiosInstance.get("/api/checkout/nearest_warehouse");
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export default fetchNearestWarehouse;
