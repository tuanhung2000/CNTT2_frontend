import React from "react";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
function PrivateComponent() {
  const { username } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = false;

  if (!username) {
    return <Navigate to="/login" />;
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
