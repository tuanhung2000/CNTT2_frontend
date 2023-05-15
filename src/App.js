import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Product from "./Pages/Product/Product";
import Signup from "./Pages/Signup/Signup";
import Footer from "./Components/Footer/Footer";
import PrivateComponent from "./Pages/PrivateComponent/PrivateComponent";
import UserManagement from "./Pages/Admin/UserManagement/UserManagement";
import RouterAdmin from "./Pages/Admin/RouterAdmin/RouterAdmin";
import { Outlet } from "react-router-dom";
import Bao from "./Pages/Bao";
import NotFound from "./Pages/NotFound/NotFound";
import Cars from "./Pages/Cars/Cars";
import CarDetail from "./Pages/Cars/CarDetail";
import Profile from "./Pages/Profile/Profile";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   // Add event listener to the beforeunload event
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // Cleanup function to remove the event listener
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // const handleBeforeUnload = () => {
  //   // Remove the authentication token from localStorage
  //   localStorage.removeItem("token");
  // };
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {/* <Public Components /> */}
          {/* <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<div>Page not found</div>}></Route> */}

          {/* Private Components */}
          <Route element={<PrivateComponent />}>
            <Route path="profile" element={<Profile />} />
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
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/listcars/id" element={<CarDetail />}></Route>
            <Route path="/bao" element={<Bao />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
