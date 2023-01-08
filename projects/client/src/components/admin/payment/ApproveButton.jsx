import { Button, useToast } from "@chakra-ui/react"
import PaymentApprove from "./approvePayment"

const ApproveButton = ({ id }) => {
  const toast = useToast()
  return (
    <Button
      colorScheme="teal"
      onClick={async () => {
        const response = await PaymentApprove(id)

        // toast({
        //   title: response.data.message,
        //   status: response.status === 200 ? "success" : "error",
        // })
      }}
    >
      Konfirmasi Pembayaran
    </Button>
  )
}

export default ApproveButton
