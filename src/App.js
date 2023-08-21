import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Product from "./Pages/Product/Product";
import ManageUser from "./Pages/Admin/ManageUser/ManageUser";
import ManageRequest from "./Pages/Admin/ManageRequest/ManageRequest";
import Signup from "./Pages/Signup/Signup";
import Footer from "./Components/Footer/Footer";
import PrivateComponent from "./Pages/PrivateComponent/PrivateComponent";
import { Outlet } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import Cars from "./Pages/Cars/Cars";
import CarDetail from "./Pages/Cars/CarDetail";
import Profile from "./Pages/Profile/Profile";
import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import PostCar from "./Pages/PostCar/PostCar";
import Payment from "./Pages/Payment/Payment";
import Aboutus from "./Pages/Aboutus/Aboutus";
import PrivateAdminComponent from "./Pages/PrivateComponent/PrivateAdminComponent";
import Recharge from "./Pages/Recharge/Recharge";
import ScrollToTop from "./ScrollToTop";
function App() {
  const { username, role } = useAuth();
  const [role1, setRole1] = useState("");
  const [role2, setRole2] = useState("");
  useEffect(() => {
    if (role === "customer") {
      setRole1("customer");
    } else if (role === "owner") {
      setRole2("owner");
    }
  }, [role]);
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}

        <Routes onUpdate={() => window.scrollTo(0, 0)}>
          <Route element={<PrivateComponent />}>
            <Route path="profile" element={<Profile />} />
            <Route path="/post" element={<PostCar />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/recharge" element={<Recharge />} />
          </Route>
          <Route element={<PrivateAdminComponent />}>
            <Route path="/admin/user" element={<ManageUser />} />
            <Route path="/admin/request" element={<ManageRequest />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />}></Route>
          <Route
            element={
              <>
                <Navbar />
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<Product />}></Route>
            <Route path="/listcars" element={<Cars />}></Route>
            <Route path="/listcars/:vehicleID" element={<CarDetail />}></Route>
            <Route path="/aboutus" element={<Aboutus />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
