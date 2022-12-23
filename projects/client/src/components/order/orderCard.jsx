// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   HStack,
//   Stack,
//   Text,
//   Tr,
// } from "@chakra-ui/react"
// import { useEffect } from "react"
// import { useState } from "react"
// import { GrLocation } from "react-icons/gr"
// import { IoMdArrowRoundBack } from "react-icons/io"
// import { Link } from "react-router-dom"
// import { axiosInstance } from "../../api"

// import OrderCard from "./order"

// const Order = () => {
//   const [order, setOrder] = useState([])
//   const fetchOrder = async () => {
//     try {
//       const resp = await axiosInstance.get(`/order`)

//       setOrder(resp.data.data)
//       renderOrder()
//       console.log(setOrder, "orde")
//     } catch (err) {
//       console.log(err)
//     }
//     const cancelBtn = async (id) => {
//       try {
//         await axiosInstance.patch(`/order/cancel${id}`)
//       } catch (err) {
//         console.log(err)
//       }
//     }

//     const renderOrder = () => {
//       console.log(order, "order")
//       return order.map((val) => {
//         return (
//           <OrderCard
//             key={val.id.toString()}
//             payment_date={val.payment_date}
//             shipping_service={val.shipping_service}
//             payment_reciept={val.payment_reciept}
//             // onDelete={() => deleteBtnHandler(val.id)}
//           />
//         )
//       })
//     }
//   }

//   useEffect(() => {
//     fetchOrder()
//   }, [])

//   return (
//     <>
//       <Stack>
//         <Box
//           display={"flex"}
//           fontSize="14px"
//           justifyContent={"center"}
//           mt={"50px"}
//         >
//           <Box
//             w="500px"
//             boxShadow={"0 0 10px 3px rgb(0 0 0 / 10%)"}
//             borderRadius={"10px"}
//             p="24px 40px 32px "
//             textAlign={"center"}
//             bgColor={"white"}
//             mt="120px"
//           >
//             <Text
//               fontSize="22px"
//               fontWeight={"bold"}
//               textAlign={"left"}
//               color="teal.600"
//               fontFamily="Open Sauce One',sans-serif"
//             >
//               Belanja...
//             </Text>
//           </Box>
//         </Box>

//         <Grid
//           templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
//           mt="4"
//           minChildWidth="250px"
//           // spacing="5em"
//           gap="1em"
//           minH="full"
//           align="center"
//         >
//           {renderOrder()}
//         </Grid>
//       </Stack>
//     </>
//   )
// }

// export default Order
