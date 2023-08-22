import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Image, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  useDeleteUserQuery,
  useGetAllUsersQuery,
} from "../../../features/user/userApiSlice";
import "./ManageUser.scss";
import Swal from "sweetalert2";
import { COLORS } from "../../../assets/color";
import axios from "axios";
const ManageUser = () => {
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  const [searchText, setSearchText] = useState("");
  const [processedData, setProcessedData] = useState([]);
  const paginationConfig = {
    className: "centered-pagination",
  };

  // ====================useGetAllUsersQuery===========================================
  const { data: listUsers } = useGetAllUsersQuery();
  const getListUser = useGetAllUsersQuery();
  const deleteUser = useDeleteUserQuery();
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // ==========================useEffect=============================================================
  useEffect(() => {
    if (listUsers !== undefined) {
      setProcessedData(
        listUsers.allUsers.map((item, index) => ({
          ...item,
          index: index + 1,
        }))
      );
    }
  }, [listUsers]);
  const onDeleteUser = (record) => {
    const urlDelete = `http://localhost:9090/user/`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Replace with your actual access token
      },
      data: {
        userID: record._id,
      },
    };
    axios
      .delete(urlDelete, config)
      .then((response) => {
        Swal.fire({
          title: "Thành công!",
          text: "Xóa tài khoản thành công!",
          icon: "success",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            getListUser.refetch();
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
  // const onDeleteCar = (record) => {
  //   const urlDelete = `http://localhost:9090/user/`;
  //   const userID = record._id;
  //   // console.log("userID: ", opts.headers);
  //   axios
  //     .delete(urlDelete, { userID: userID }, opts)
  //     .then((response) => {
  //       Swal.fire({
  //         title: "Thành công!",
  //         text: "Xóa tài khoản thành công!",
  //         icon: "success",
  //         confirmButtonColor: `${COLORS.main}`,
  //         confirmButtonText: "Đồng ý",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           getListUser.refetch();
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       Swal.fire({
  //         title: "Thất bại!",
  //         text: "Vui lòng chờ kiểm tra thông tin từ quản trị viên!",
  //         icon: "error",
  //         confirmButtonColor: `${COLORS.main}`,
  //         confirmButtonText: "Xác nhận",
  //       });
  //     });
  // };
  return (
    <section className="manage-user">
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Quản lý người dùng
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
          { title: "STT", dataIndex: "index" },
          {
            title: "Tên đệm",
            dataIndex: "lastName",
            filteredValue: [searchText],
            onFilter: (value, record) => {
              return (
                String(record.lastName)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.owner)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.description)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.price)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(
                  record.isAvailable === true ? "Chưa được thuê" : "Đang thuê"
                )
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.times).toLowerCase().includes(value.toLowerCase())
              );
            },
          },
          {
            title: "Tên",
            dataIndex: "firstName",
          },

          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Tên đăng nhập",
            dataIndex: "username",
          },
          {
            title: "Địa chỉ",
            dataIndex: "address",
          },
          {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
          },
          {
            title: "Vai trò",
            dataIndex: "role",
            render: (role) => {
              return role === "owner"
                ? "Chủ xe"
                : role === "admin"
                ? "Người quản lý"
                : "Người thuê xe";
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
                    <EditOutlined
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      // onClick={() => onEditCar(record)}
                    />
                    <DeleteOutlined
                      style={{
                        color: "red",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => onDeleteUser(record)}
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
    </section>
  );
};

export default ManageUser;
