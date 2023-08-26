import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styled from "styled-components";
import { Box, Dialog, DialogTitle } from "@mui/material";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useGetUserQuery } from "../../features/user/userApiSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { COLORS } from "../../assets/color";

function Navbar() {
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  const { username, role } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [newpassword, setNewpassword] = useState("");
  const { data: userCurrent } = useGetUserQuery();
  const getUserCurrent = useGetUserQuery();
  const [newpasswordConfirm, setNewpasswordConfirm] = useState("");
  const [sendLogout] = useSendLogoutMutation();
  const [active, setActive] = useState("nav_menu");
  const [toggleIcon, setToggleIcon] = useState("nav_toggler");
  const [open, setOpen] = useState(false);
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const menuRef = useRef();
  const imgRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });
  const toggle = () => {
    active === "nav_menu"
      ? setActive("nav_menu nav_active")
      : setActive("nav_menu");
    toggleIcon === "nav_toggler"
      ? setToggleIcon("nav_toggler toggle")
      : setToggleIcon("nav_toggler");
  };
  const handleLogout = async () => {
    setOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("app/token");
    await sendLogout;
    window.location.reload(false);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };
  const onChangePassword = () => {
    const urlDelete = `http://localhost:9090/auth/change-password`;
    // console.log("userID: ", opts.headers);
    axios
      .patch(
        urlDelete,
        { username, password: newpassword, newPassword: newpasswordConfirm },
        opts
      )
      .then((response) => {
        Swal.fire({
          title: "Thành công!",
          text: "Cập nhật mật khẩu thành công!",
          icon: "success",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            setOpenDialog(false);
            setNewpassword("");
            setNewpasswordConfirm("");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Thất bại!",
          text: "Vui lòng chờ kiểm tra thông tin từ quản trị viên!",
          icon: "error",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Xác nhận",
        });
      });
  };
  return (
    <NavbarContainer>
      <NavbarLeft>
        <LogoSections>
          <LinkCustom to="/">
            M<Green className="green">i</Green>car
          </LinkCustom>
        </LogoSections>
        <ContactSection>
          <div>
            <IconSection>
              <ion-icon name="car-sport-outline"></ion-icon>
              1900 9217
            </IconSection>
          </div>
          <div>
            <Bao to="/aboutus">
              <span className="hidden">Về Micar</span>
            </Bao>
          </div>
        </ContactSection>
      </NavbarLeft>
      <NavbarRight>
        <section className="product">
          <Bao to="/listcars">
            <ion-icon name="car-sport-outline"></ion-icon>
            <span className="hidden">Xe trên thị trường</span>
          </Bao>
        </section>
        <section className="product" style={{ marginLeft: "20px" }}>
          <Bao to="/products">
            <ion-icon name="people-outline"></ion-icon>
            {username ? (
              <>
                <span className="hidden">Xe của bạn</span>
              </>
            ) : (
              <>
                <span className="hidden">Trở thành thành viên</span>
              </>
            )}
          </Bao>
        </section>
        {(role === "customer" || role === "owner") && (
          <section className="product" style={{ marginLeft: "20px" }}>
            <span>
              {userCurrent && userCurrent.Wallet
                ? formatter.format(userCurrent.Wallet.amount)
                : formatter.format(0)}
            </span>
          </section>
        )}
        {/* {role === "owner" && (
          <section className="product" style={{ marginLeft: "20px" }}>
            <span>
              {userCurrent.Wallet
                ? formatter.format(userCurrent.Wallet.amount)
                : formatter.format(0)}
            </span>
          </section>
        )} */}
        <section className="product" style={{ marginLeft: "20px" }}>
          {role === "owner" ? (
            <>
              <Bao to="/post">
                <ion-icon name="car-sport-outline"></ion-icon>
                <span className="hidden">Đăng xe</span>
              </Bao>
            </>
          ) : (
            <>
              {/* <Bao to="/listcars">
                <ion-icon name="car-sport-outline"></ion-icon>
                <span className="hidden">Xe trên thị trường</span>
              </Bao> */}
            </>
          )}
        </section>
        {!username ? (
          <ul className={active}>
            <li>
              <LinkCustom to="/login">Đăng nhập</LinkCustom>
            </li>
            <li>
              <ButtonSignup to="/signup">Đăng ký</ButtonSignup>
            </li>
          </ul>
        ) : (
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              position: "relative",
            }}
          >
            <img
              ref={imgRef}
              height={50}
              width={50}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                display: "block",
                cursor: "pointer",
              }}
              onClick={() => {
                if (!open) {
                  setOpen(true);
                } else {
                  setOpen(false);
                }
              }}
              alt=""
              src="https://plus.unsplash.com/premium_photo-1671656349204-950bf60fdadb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
            />
            {open && (
              <div
                ref={menuRef}
                style={{
                  position: "absolute",
                  zIndex: "100",
                  left: "-45px",
                  top: "60px",
                  width: "140px",
                  backgroundColor: "white",
                  border: "1px solid black",
                }}
              >
                <ul>
                  {(role === "owner" || role === "customer") && (
                    <li
                      onClick={() => setOpen(false)}
                      className="menu-item"
                      style={{
                        width: "100%",
                        padding: "10px 10px",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to="/profile"
                        className="link_item"
                        style={{ width: "100%" }}
                      >
                        Trang cá nhân
                      </Link>
                    </li>
                  )}
                  <li
                    className="menu-item"
                    onClick={() => setOpen(false)}
                    style={{
                      padding: "10px 10px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {role !== "admin" && (
                      <Link to="products" className="link_item">
                        Xe của bạn
                      </Link>
                    )}
                    {role === "admin" && (
                      <Link to="/admin/user" className="link_item">
                        Người dùng
                      </Link>
                    )}
                  </li>
                  <li
                    className="menu-item"
                    onClick={() => setOpen(false)}
                    style={{
                      padding: "10px 10px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {role === "admin" && (
                      <Link to="/admin/request" className="link_item">
                        Yêu cầu
                      </Link>
                    )}
                  </li>

                  <li
                    className="menu-item"
                    onClick={() => setOpen(false)}
                    style={{
                      padding: "10px 10px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    <Link to="/recharge" className="link_item">
                      Nạp tiền
                    </Link>
                  </li>

                  <li
                    onClick={() => {
                      setOpenDialog(true);
                    }}
                    className="menu-item"
                    style={{
                      padding: "10px 10px",
                      fontWeight: "500",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Đổi mật khẩu
                  </li>

                  <li
                    className="menu-item"
                    onClick={handleLogout}
                    style={{
                      padding: "10px 10px",
                      fontWeight: "500",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
            <Dialog
              open={openDialog}
              onClose={handleClickClose}
              style={{ zIndex: "1000" }}
            >
              <DialogTitle style={{ backgroundColor: "black", color: "white" }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <span style={{ fontWeight: "bold", color: "white" }}>
                    Đổi mật khẩu
                  </span>
                  <ion-icon
                    name="close-circle-outline"
                    onClick={handleClickClose}
                    style={{
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                      display: "block",
                      border: "none",
                      zIndex: "6",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  ></ion-icon>
                </Box>
              </DialogTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  position: "relative",
                  padding: "40px",
                  width: "400px",
                  height: "300px",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    htmlFor="newpassword"
                    style={{ cursor: "pointer", fontWeight: "600" }}
                  >
                    Mật khẩu cũ
                  </label>
                  <input
                    type="password"
                    id="newpassword"
                    value={newpassword}
                    style={{
                      display: "block",
                      padding: "10px",
                      outline: "none",
                    }}
                    onChange={(e) => {
                      setNewpassword(e.target.value);
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    htmlFor="newpasswordConfirm"
                    style={{ cursor: "pointer", fontWeight: "600" }}
                  >
                    Nhập mật khẩu mới
                  </label>
                  <input
                    type="password"
                    id="newpasswordConfirm"
                    value={newpasswordConfirm}
                    style={{
                      display: "block",
                      padding: "10px",
                      outline: "none",
                    }}
                    onChange={(e) => {
                      setNewpasswordConfirm(e.target.value);
                    }}
                  />
                </div>
                <ButtonChange
                  className="btn_change"
                  onClick={() => {
                    onChangePassword();
                  }}
                >
                  Gửi
                </ButtonChange>
              </div>
            </Dialog>
          </div>
        )}
        <div onClick={toggle} className={toggleIcon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </NavbarRight>
    </NavbarContainer>
  );
}
const NavbarContainer = styled.section`
  display: flex;
  ${"" /* overflow-x: hidden; */}
  border-bottom: 1px solid #e0e0e0;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: #fff;
  color: black;
  .menu-item:hover {
    background-color: black;
    color: white;
  }
  .menu-item {
    color: black;
  }
  .menu-item .link_item {
    color: black;
  }
  .menu-item:hover .link_item {
    color: white;
    background-color: black;
  }
  .text_menu-item:hover {
    color: white;
    background-color: black;
  }
`;
const ButtonChange = styled.section`
  color: white;
  background-color: black;
  text-align: center;
  cursor: pointer;
  border: 1px solid black;
  font-weight: bold;
  padding: 10px;
  &:hover {
    color: black;
    border-color: black;
    background-color: white;
  }
`;
const NavbarLeft = styled.section`
  padding-left: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LogoSections = styled.section`
  font-size: 30px;
  font-weight: bold;
`;
const Green = styled.span`
  color: Green;
  ${
    "" /* &:hover {
    background-color: white;
  } */
  }
`;
const ContactSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  gap: 30px;
  font-weight: bold;
`;
const NavbarRight = styled.section`
  padding-right: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  .nav_menu {
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;

    @media screen and (max-width: 767px) {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      ${"" /* overflow-x: hidden; */}
      background-color: #141414;
      flex-direction: column;
      transform: translateX(100%);
      z-index: 10;
    }
  }
  .button-signup {
    border: 1px solid green;
  }
  .nav_active {
    transform: translateX(0);
    transition: 0.5s;
  }
  .nav_toggler div {
    width: 2.5rem;
    height: 0.2rem;
    margin: 0.4rem;
    background-color: chartreuse;
    transition: 0.5s ease-in-out;
  }
  .nav_toggler {
    cursor: pointer;
    display: none;
    @media screen and (max-width: 767px) {
      display: block;
      position: absolute;
      top: 10px;
      right: 0;
      z-index: 100;
    }
  }
  .nav_toggler {
    cursor: pointer;
    display: none;
    @media screen and (max-width: 767px) {
      display: block;
    }
  }
  .toggle .line1 {
    transform: rotate(-45deg) translate(-4px, 5px);
    -webkit-transform: rotate(-45deg) translate(-4px, 5px);
  }
  .toggle .line2 {
    opacity: 0;
  }
  .toggle .line3 {
    transform: rotate(45deg) translate(-4px, -5px);
  }
`;
const LinkCustom = styled(Link)`
  color: black;
  padding: 10px;
  font-weight: bold;
  &:hover {
    color: #00a550;
    .green {
      color: black;
    }
  }
`;
const ButtonSignup = styled(Link)`
  color: black;
  padding: 10px;
  font-weight: bold;
  border: 1px solid black;
  &:hover {
    color: #00a550;
    border-color: #00a550;
  }
`;
const Bao = styled(Link)`
  display: flex;
  color: black;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  &:hover {
    color: #00a550;
  }
  ion-icon {
    padding-left: 10px;
  }
  @media screen and (max-width: 767px) {
    ion-icon {
      padding-right: 10px;
      width: 30px;
      height: 30px;
    }
  }
  @media screen and (max-width: 900px) {
    .hidden {
      display: none;
    }
  }
`;
// IconSection;
const IconSection = styled(Link)`
  display: flex;
  color: black;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export default Navbar;
