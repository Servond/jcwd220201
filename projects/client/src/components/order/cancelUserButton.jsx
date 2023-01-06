import { Button, useToast } from "@chakra-ui/react"
import CancelUserOrder from "./cancelOrderUser"

const CancelUserButton = () => {
  const toast = useToast()
  return (
    <Button
      colorScheme="teal"
      onClick={async () => {
        const resp = await CancelUserOrder()

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

export default CancelUserButton
