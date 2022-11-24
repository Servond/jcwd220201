import axios from "axios"
import "./App.css"
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"

import AdminHome from "./pages/admin/home.jsx"
import ManageWarehouseData from "./pages/admin/warehouseData"

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      )
      setMessage(data?.message || "")
    })()
  }, [])
  return (
    <>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminHome />} />
        <Route path="/admin/warehouseData" element={<ManageWarehouseData />} />
      </Routes>
    </>
  )
}

export default App
