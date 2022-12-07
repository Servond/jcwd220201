import { axiosInstance } from "../../api";

const fetchCities = async () => {
  const cities = await axiosInstance.get("/cities");
  return cities;
};

export default fetchCities;
