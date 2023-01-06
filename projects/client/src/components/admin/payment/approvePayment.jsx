import { useParams } from "react-router-dom"
import { axiosInstance } from "../../../api"

const PaymentApprove = async () => {
  const { id } = useParams()
  try {
    const respons = await axiosInstance.patch(`/payment/confirm/${id}`)
    return respons
  } catch (err) {
    console.log(err)
    return err.respons
  }
}

export default PaymentApprove
