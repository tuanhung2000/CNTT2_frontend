import React from "react";
import { Outlet } from "react-router-dom";
function RouterAdmin() {
  return (
    <div>
      <h1>Navbar Admin</h1>
      <Outlet />
    </div>
  );
}

export default RouterAdmin;
