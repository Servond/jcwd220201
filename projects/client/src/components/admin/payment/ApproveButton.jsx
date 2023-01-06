import { Button, useToast } from "@chakra-ui/react"
import PaymentApprove from "./approvePayment"

const ApproveButton = () => {
  const toast = useToast()
  return (
    <Button
      colorScheme="teal"
      onClick={async () => {
        const resp = await PaymentApprove()

        toast({
          title: resp.data.message,
          status: resp.status === 200 ? "success" : "error",
        })
      }}
    >
      Konfirmasi Pembayaran
    </Button>
  )
}

export default ApproveButton
