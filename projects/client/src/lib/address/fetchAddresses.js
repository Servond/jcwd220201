import { axiosInstance } from "../../api";

const fetchAddresses = async (pageIndex = 0, search) => {
  try {
    const page = pageIndex + 1;
    const query = search ? search : "";
    const response = await axiosInstance.get(
      `/api/address?page=${page}&search=${query}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export default fetchAddresses;
