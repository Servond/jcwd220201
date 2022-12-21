import { axiosInstance } from "../../api";

const fetchWarehouses = async () => {
  try {
    const response = await axiosInstance.get("/warehouses");
    return response;
  } catch (err) {
    return err.response;
  }
};

export default fetchWarehouses;
