import "./App.css";
import { useEffect, useState } from "react";
import { login, logout } from "./redux/features/authSlice";
import LoginPage from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { axiosInstance } from "./api";
import Dashboard from "./pages/admin/Dashboard";
import ProfilePage from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

const App = () => {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  const [authCheck, setAuthCheck] = useState(false);

  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token");

      if (!auth_token) {
        setAuthCheck(true);
        return;
      }

      const response = await axiosInstance.get("/auth/refresh-token");

      dispatch(login(response.data.data));
      localStorage.setItem("auth_token", response.data.token);
      setAuthCheck(true);
    } catch (err) {
      console.log(err);
      setAuthCheck(true);
    }
  };

  const renderAdminRoutes = () => {
    if (authSelector.role === "admin") {
      return (
        <>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </>
      );
    }

    return null;
  };

  useEffect(() => {
    keepUserLoggedIn();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/profile" element={<ProfilePage />} /> */}
      <Route path="/profile" element={<EditProfile />} />
    </Routes>
  );
};

export default App;
