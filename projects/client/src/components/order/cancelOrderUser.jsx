import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"

const CancelUserOrder = async () => {
  const { id } = useParams()
  try {
    const respons = await axiosInstance.patch(`/order/cancel/${id}`)
    return respons
  } catch (err) {
    console.log(err)
    return err.respons
  }
}

export default CancelUserOrder
