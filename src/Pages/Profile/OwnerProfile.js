import { Button, Card, CardMedia, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import user from "../../assets/user.png";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { COLORS } from "../../assets/color";
import { useGetUserQuery } from "../../features/user/userApiSlice";
import axios from "axios";
import Swal from "sweetalert2";
const OwnerProfile = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { data } = useGetUserQuery();
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data1 = {};
    if (firstName) {
      data1.firstName = firstName;
    }
    if (lastName) {
      data1.lastName = lastName;
    }
    if (address) {
      data1.address = address;
    }
    if (phoneNumber) {
      data1.phoneNumber = phoneNumber;
    }
    try {
      const response = await axios.patch(
        "http://localhost:9090/user/edit-info",
        data1,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Thành công!",
        text: "Bạn cập nhật thành công!",
        icon: "success",
        confirmButtonColor: `${COLORS.main}`,
        confirmButtonText: "Tiếp tục",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      console.log("User information updated", response.data);
    } catch (error) {
      console.error("Failed to update user information", error);
    }
  };
  return (
    <ProfileComponent>
      <Card style={{ backgroundColor: "#f0f0f0" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={8}
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h3>Thông tin cá nhân</h3>
            {!data ? (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "10px",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <Grid item xs={12} md={12} style={{ width: "100%" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <label htmlFor="firstName">
                        Tên{" "}
                        <span style={{ fontSize: "12px" }}>
                          (Bạn có thể cập nhật)
                        </span>
                      </label>
                      <input
                        placeholder={data.User.firstName}
                        id="firstName"
                        style={{
                          marginTop: "5px",
                          width: "100%",
                          height: "30px",
                          outline: "none",
                          border: "none",
                          boxSizing: "border-box",
                          padding: "10px",
                        }}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <label htmlFor="lastName">
                        Họ{" "}
                        <span style={{ fontSize: "12px" }}>
                          (Bạn có thể cập nhật)
                        </span>
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={data.User.lastName}
                        id="lastName"
                        style={{
                          marginTop: "5px",
                          width: "100%",
                          height: "30px",
                          outline: "none",
                          border: "none",
                          boxSizing: "border-box",
                          padding: "10px",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12} xs={12} style={{ width: "100%" }}>
                  <label htmlFor="username">Tên đăng nhập</label>
                  <input
                    placeholder={data.User.username}
                    disabled
                    id="username"
                    style={{
                      marginTop: "5px",
                      width: "100%",
                      height: "30px",
                      outline: "none",
                      border: "none",
                      boxSizing: "border-box",
                      padding: "10px",
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12} style={{ width: "100%" }}>
                  <label htmlFor="address">
                    Địa chỉ{" "}
                    <span style={{ fontSize: "12px" }}>
                      (Bạn có thể cập nhật)
                    </span>
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={data.User.address}
                    id="address"
                    style={{
                      marginTop: "5px",
                      width: "100%",
                      height: "30px",
                      outline: "none",
                      border: "none",
                      boxSizing: "border-box",
                      padding: "10px",
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12} style={{ width: "100%" }}>
                  <label htmlFor="phoneNumber">
                    Số điện thoại{" "}
                    <span style={{ fontSize: "12px" }}>
                      (Bạn có thể cập nhật)
                    </span>
                  </label>
                  <input
                    placeholder={data.User.phoneNumber}
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{
                      marginTop: "5px",
                      width: "100%",
                      height: "30px",
                      outline: "none",
                      border: "none",
                      boxSizing: "border-box",
                      padding: "10px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  <Button className="btn" type="submit">
                    Cập nhật
                  </Button>
                </Grid>
              </form>
            )}
          </Grid>
          <Grid item xs={0} md={4}>
            <img
              src={user}
              alt=""
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "400px",
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </ProfileComponent>
  );
};

const ProfileComponent = styled.section`
  min-height: calc(100vh - 160px);
  width: 100%;
  padding: 20px;
  label {
    cursor: pointer;
    color: gray;
    font-weight: 300;
    font-size: 14px;
  }
  input:disabled {
    background-color: white;
  }
  .btn {
    background-color: ${COLORS.main};
    color: white;
    border: 1px solid ${COLORS.main};
  }
  .btn:hover {
    color: ${COLORS.main};
  }
`;
export default OwnerProfile;
