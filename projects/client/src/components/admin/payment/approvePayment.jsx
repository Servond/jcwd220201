import { useParams } from "react-router-dom"
import { axiosInstance } from "../../../api"

const PaymentApprove = async () => {
  const { id } = useParams()

  try {
    const response = await axiosInstance.patch(`/payment/confirm`)
    console.log(response, "aprove")
    return response
  } catch (err) {
    console.log(err)
    return err.respons
  }
}

export default PaymentApprove
