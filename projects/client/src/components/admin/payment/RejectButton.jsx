import { Button, useToast } from "@chakra-ui/react"
import RejectPayment from "./rejectPayment"

const RejectButton = () => {
  const toast = useToast()
  return (
    <Button
      colorScheme="teal"
      onClick={async () => {
        const resp = await RejectPayment()

        toast({
          title: resp.data.message,
          status: resp.status === 200 ? "success" : "error",
        })
      }}
    >
      Batalkan Pesanan
    </Button>
  )
}

export default RejectButton
