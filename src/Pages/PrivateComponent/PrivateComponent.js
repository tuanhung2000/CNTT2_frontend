import React from "react";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import NotFound from "../NotFound/NotFound";
function PrivateComponent() {
  const { username, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = false;

  if (!username) {
    return <Navigate to="/login" />;
  }
  if (role === "customer" && location.pathname === "/post") {
    return <NotFound />; // Render a "Not Found" component or handle it as desired
  }
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default PrivateComponent;
