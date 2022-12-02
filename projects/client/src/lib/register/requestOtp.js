import axiosInstance from "../../api";

const requestOtp = async (email) => {
  try {
    const response = await axiosInstance.post("/api/register/otp", {
      email,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export default requestOtp;
