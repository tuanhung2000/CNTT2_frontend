import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../Login/Login";
function PrivateComponent() {
  const email = true;
  return email ? <Outlet /> : <Login />;
}

export default PrivateComponent;
