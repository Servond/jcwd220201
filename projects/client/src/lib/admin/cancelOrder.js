import { axiosInstance } from "../../api";

const cancelOrder = async () => {
  try {
    const response = await axiosInstance.post("/admin/cancel");
    return response;
  } catch (err) {
    return err.response;
  }
};

export default cancelOrder;
