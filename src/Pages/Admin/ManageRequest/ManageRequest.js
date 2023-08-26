import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  useDeleteUserQuery,
  useGetAllUsersQuery,
  useGetNewVehicleQuery,
} from "../../../features/user/userApiSlice";
import "./ManageRequest.scss";
import Swal from "sweetalert2";
import { COLORS } from "../../../assets/color";
import axios from "axios";
import { Box, Dialog, DialogTitle } from "@mui/material";
const ManageRequest = () => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [userInfor, setUserInFor] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [processedData, setProcessedData] = useState([]);
  const paginationConfig = {
    className: "centered-pagination",
  };

  // ====================useGetAllUsersQuery===========================================
  const { data: listRequestNewVehicle } = useGetNewVehicleQuery();
  const getListRequestNewVehicle = useGetNewVehicleQuery();
  const getListUser = useGetAllUsersQuery();
  const deleteUser = useDeleteUserQuery();
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // ==========================useEffect=============================================================
  useEffect(() => {
    if (listRequestNewVehicle !== undefined) {
      setProcessedData(
        listRequestNewVehicle.vehicles.map((item, index) => ({
          ...item,
          index: index + 1,
        }))
      );
    }
  }, [listRequestNewVehicle]);

  const handleClickClose = () => {
    setOpenDialog(false);
  };
  const onAccept = (record) => {
    const urlAccept = `http://localhost:9090/user/responseVehicle`;
    axios
      .patch(
        urlAccept,
        {
          vehicleID: record._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        }
      )
      .then((response) => {
        Swal.fire({
          title: "Thành công!",
          text: "Chấp thuận thành công!",
          icon: "success",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            getListRequestNewVehicle.refetch();
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
  const onEditCar = (record) => {
    setUserInFor({ ...record });
    setOpenDialog(true);
    console.log("user in for", userInfor);
  };
  const handleUpdate = (record) => {
    const urlEdit = `http://localhost:9090/user/edit-info/`;

    const userID = userInfor._id;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Replace with your actual access token
      },
      // data: {
      //   userID: userID,
      //   firstName: firstName,
      //   lastName: lastName,
      //   address: address,
      //   phoneNumber: phoneNumber,
      // },
    };
    console.log(config);
    axios
      .patch(
        urlEdit,
        {
          userID: userID,
          firstName: firstName,
          lastName: lastName,
          address: address,
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        }
      )
      .then((response) => {
        Swal.fire({
          title: "Thành công!",
          text: "Cập nhật tài khoản thành công!",
          icon: "success",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            getListUser.refetch();
            setOpenDialog(false);
          }
        });
      })
      .catch((error) => {
        console.log(error.response);
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
    <section className="manage-request">
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Quản lý yêu cầu
      </h2>
      <Input.Search
        placeholder="Nhập thông tin cần tìm..."
        style={{ marginBottom: "20px" }}
        onSearch={(value) => {
          setSearchText(value);
        }}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <Table
        columns={[
          { title: "STT", dataIndex: "index", align: "center" },
          {
            title: "ID phương tiện",
            dataIndex: "_id",
            filteredValue: [searchText],
            onFilter: (value, record) => {
              return (
                String(record._id)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.make)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.price)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.licensePlate)
                  .toLowerCase()
                  .includes(value.toLowerCase())
              );
            },
          },
          {
            title: "Hãng xe",
            dataIndex: "make",
            align: "center",
          },
          {
            title: "Năm sản xuất",
            dataIndex: "year",
            align: "center",
          },
          {
            title: "Giá thuê xe",
            dataIndex: "price",
            render: (price) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                    padding: "10px",
                  }}
                >
                  <span>{formatter.format(price)}</span>
                </div>
              );
            },
          },
          {
            title: "Biển số xe",
            dataIndex: "licensePlate",
            align: "center",
          },
          {
            title: "Địa chỉ",
            align: "center",
            dataIndex: "address",

            render: (address) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                    padding: "10px",
                  }}
                >
                  <span>{address[0]}</span> ,<span>{address[1]}</span> ,
                  <span>{address[2]}</span>
                </div>
              );
            },
          },

          {
            title: "",
            render: (record) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <CloseOutlined
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => onEditCar(record)}
                    />
                    <CheckOutlined
                      style={{
                        color: "red",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => onAccept(record)}
                    />
                  </div>
                </>
              );
            },
          },
        ]}
        dataSource={processedData.map((item, index) => ({
          ...item,
          key: index, // or use a unique identifier if available in your data
        }))}
        onChange={onChange}
        locale={{
          triggerDesc: "Giảm dần",
          triggerAsc: "Tăng dần",
          cancelSort: "Hủy",
          emptyText: "Không có dữ liệu",
        }}
        bordered
        pagination={paginationConfig}
      ></Table>
      {/* <Dialog
        open={openDialog}
        onClose={handleClickClose}
        style={{ zIndex: "1000" }}
      >
        <DialogTitle style={{ backgroundColor: "#00a550", color: "white" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <span style={{ fontWeight: "bold", color: "white" }}>
              Cập nhật thông tin
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
            height: "400px",
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
              htmlFor="firstname"
              style={{ cursor: "pointer", fontWeight: "600" }}
            >
              Tên đệm
            </label>
            <input
              type="firstname"
              id="firstname"
              value={firstName}
              placeholder={userInfor.firstName}
              style={{
                display: "block",
                padding: "10px",
                outline: "none",
              }}
              onChange={(e) => {
                setFirstName(e.target.value);
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
              htmlFor="lastName"
              style={{ cursor: "pointer", fontWeight: "600" }}
            >
              Tên
            </label>
            <input
              placeholder={userInfor.lastName}
              type="lastName"
              id="lastName"
              value={lastName}
              style={{
                display: "block",
                padding: "10px",
                outline: "none",
              }}
              onChange={(e) => {
                setLastName(e.target.value);
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
              htmlFor="address"
              style={{ cursor: "pointer", fontWeight: "600" }}
            >
              Địa chỉ
            </label>
            <input
              placeholder={userInfor.address}
              type="address"
              id="address"
              value={address}
              style={{
                display: "block",
                padding: "10px",
                outline: "none",
              }}
              onChange={(e) => {
                setAddress(e.target.value);
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
              htmlFor="phoneNumber"
              style={{ cursor: "pointer", fontWeight: "600" }}
            >
              Số điện thoại
            </label>
            <input
              placeholder={userInfor.phoneNumber}
              type="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              style={{
                display: "block",
                padding: "10px",
                outline: "none",
              }}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <button
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "#00a550",
              color: "white",
              border: "1px solid #00a550",
              borderRadius: "5px",
            }}
            onClick={handleUpdate}
          >
            Gửi
          </button>
        </div>
      </Dialog> */}
    </section>
  );
};

export default ManageRequest;
