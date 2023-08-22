import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import useAuth from "../../hooks/useAuth";

const PrivateAdminComponent = () => {
  const { username, role } = useAuth();
  return (
    <>
      {role === "admin" ? (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateAdminComponent;
