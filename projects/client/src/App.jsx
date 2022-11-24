import "./App.css"
import { useEffect, useState } from "react"
import { login, logout } from "./redux/features/authSlice"
import LoginPage from "./pages/Login"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import { axiosInstance } from "./api"
import EditProfile from "./pages/EditProfile"
import Navbar from "./pages/layout/Navbar"
import MainContent from "./pages/layout/MainContent"
import Footer from "./pages/layout/Footer"
import Dashboard from "./pages/admin/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import GuestRoute from "./components/GuestRoute"
import NotFound from "./pages/404"

const App = () => {
  const [authCheck, setAuthCheck] = useState(false)
  const authSelector = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const keepUserLogin = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token")

      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    }
  }

  useEffect(() => {
    keepUserLogin()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainContent />} />
          <Route index element={<Footer />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route
          path="/dashboard"
          element={authSelector.role_id === 1 ? <Dashboard /> : <NotFound />}
        />
      </Routes>
    </>
  )
}

export default App
