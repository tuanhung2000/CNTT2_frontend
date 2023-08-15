import { Button, Card, CardMedia, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import user from "../../assets/user.png";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { COLORS } from "../../assets/color";
import {
  useGetUserQuery,
  useGetAllUsersQuery,

  //Vehicle
  useGetAllVehiclesQuery,
  useGetVehicleQuery,
  useCreateVehicleQuery,
  useUpdateVehicleQuery,
  useDeleteVehicleQuery,

  //Order
  useGetAllOrdersQuery,
  useRequestOrderQuery,
  useUpdateOrderQuery,
  useDeleteOrderQuery,
  useResponseOrderQuery,

  //Review
  useGetReviewQuery,
  usePostReviewQuery,
  useEditReviewQuery,
  useDeleteReviewQuery
} from "../../features/user/userApiSlice";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const isXsScreen = useMediaQuery("(max-width: 599px)");
  const [isFocused, setIsFocused] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputEnabled, setInputEnabled] = useState(true);
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
  // vehicle
  const { data: alluser } = useGetAllUsersQuery()
  const { data: allvehicle } = useGetAllVehiclesQuery()
  let vehicleID = '6448cec38950138240553c50'
  const { data: vehicle } = useGetVehicleQuery(vehicleID)
  // const { data: createVehicle } = useCreateVehicleQuery({
  //   image: [],
  //   licensePlate: '12',
  //   price: '100',
  //   extraFee: '23',
  //   type: 'Self-Driving',
  //   make: 'Cadillac',
  //   model: 'XT6',
  //   feature: [],
  //   description: '',

  //   powers: '100',
  //   fuelType: 'Pestro',
  //   insurance: '333',
  //   consumption: '10',
  //   maxSpeed: '4',
  // }) ------------- sửa lại theo fakeapi bỏ model make và models

  // const { data: updateVehicle } = useUpdateVehicleQuery()
  // const { data: deleteVehicle } = useDeleteVehicleQuery()

  // order
  // const { data: allOrders } = useGetAllOrdersQuery()
  // const { data: requestOrder } = useRequestOrderQuery(
  //   {
  //     vehicleID: '6448cec38950138240553c53',
  //     from: '11/1/2023',
  //     to: '12/1/2023',
  //     totalTime: '1000',
  //     total: 100000,
  //     address: "adress",
  //     serviceType: 'serviceType',
  //     clientRequire: 'not',
  //   }
  // ) --- ok
  // const { data: updateOrder } = useUpdateOrderQuery({
  //   vehicleID: '6448cec38950138240553c53',
  //   from: '11/1/2023',
  //   to: '12/1/2023',
  //   totalTime: '1000',
  //   total: 100000,
  //   address: "edited",
  //   serviceType: 'edited',
  //   clientRequire: 'edited',
  //   orderID: '64db24494f82e171a42f698d'
  // }) -- ok
  // const { data: deleteOrder } = useDeleteOrderQuery({
  //   vehicleID: '6448cec38950138240553c53',
  //   orderID: '64db24464f82e171a42f6989'
  // })-- ok
  // const { data: responseOrder } = useResponseOrderQuery({ 
  //   vehicleID: '6448cec38950138240553c53', 
  //   orderID: '64db24494f82e171a42f698d', 
  //   isAvailable: false, 
  //   isCompleted: false 
  // })--ok

  // REVIEW
  const { data: getReview } = useGetReviewQuery({
    contentID: '644790d461b6bf36ecdc3b3a'
  })
  const { data: postReview } = usePostReviewQuery({
    type: 'typeNotNeed',
    typeID: '644790d461b6bf36ecdc3b3a',
    rate: '4',
    content: 'good'
  })
  // const { data: editReview } = useEditReviewQuery()
  // const { data: deleteReview } = useDeleteReviewQuery()
  // console.log('alluser', alluser)
  // 
  // console.log('allvehicle', allvehicle)


  // console.log('updateVehicle', updateVehicle)
  // console.log('deleteVehicle', deleteVehicle)
  // // 
  // console.log('allOrders', allOrders)
  // console.log('requestOrder', requestOrder)
  // console.log('updateOrder', updateOrder)
  // console.log('deleteOrder', deleteOrder)
  // console.log('responseOrder', responseOrder)
  // // 
  console.log('getReview', getReview)
  console.log('postReview', postReview)
  // console.log('editReview', editReview)
  // console.log('deleteReview', deleteReview)



  return (
    <ProfileComponent>
      <section
        style={{
          backgroundColor: "#f0f0f0",
          // minHeight: "calc(100vh - 200px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "20px",
        }}
      >
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
                          backgroundColor: inputEnabled
                            ? "ghostwhite"
                            : "white",
                        }}
                        disabled={inputEnabled}
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
                        disabled={inputEnabled}
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
                          backgroundColor: inputEnabled
                            ? "ghostwhite"
                            : "white",
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
                    disabled={inputEnabled}
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
                      backgroundColor: inputEnabled ? "ghostwhite" : "white",
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
                    disabled={inputEnabled}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{
                      marginTop: "5px",
                      width: "100%",
                      height: "30px",
                      outline: "none",
                      border: "none",
                      boxSizing: "border-box",
                      backgroundColor: inputEnabled ? "ghostwhite" : "white",
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
                    gap: "10px",
                  }}
                >
                  <Button
                    className="btn"
                    onClick={() => setInputEnabled(false)}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button className="btn" type="submit">
                    Cập nhật
                  </Button>
                </Grid>
              </form>
            )}
          </Grid>
          <Grid
            item
            xs={0}
            md={4}
            style={{ display: isXsScreen ? "none" : "block" }}
          >
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
      </section>
    </ProfileComponent>
  );
};

const ProfileComponent = styled.section`
  min-height: calc(100vh - 60px);
  display:flex;
  align-items:center
  width: 100%;
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
export default Profile;
