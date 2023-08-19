import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Icon, {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MaterialReactTable from "material-react-table";
import { Image, Input, Space, Table, Tag, Modal } from "antd";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import DescriptionIcon from "@mui/icons-material/Description";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TaskIcon from "@mui/icons-material/Task";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useGetAllVehiclesQuery } from "../../features/user/userApiSlice";
import axios from "axios";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function Product() {
  const [listCarOwner, setListCarOwner] = useState([
    {
      index: 1,
      name: "Honda",
      image:
        "https://images.unsplash.com/photo-1501066927591-314112b5888e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWVyY2VkZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      owner: "Thùy Vân",
      desc: ["Rất đẹp", "Có máy lạnh"],
      times: 3,
      price: 1000000,
      status: "Đang giao xe",
    },
    {
      index: 2,
      name: "Mecs",
      owner: "Huỳnh Chánh",
      image:
        "https://images.unsplash.com/photo-1608994751987-e647252b1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      desc: ["Rất đẹp", "Có máy lạnh"],
      times: 4,
      price: 7000000,
      status: "Đang giao xe",
    },
    {
      index: 3,
      name: "Audi",
      image:
        "https://images.unsplash.com/photo-1609703048009-d3576872b32c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      owner: "Thùy Vân",
      desc: ["Rất đẹp", "Có máy lạnh"],
      times: 20,
      price: 500000,
      status: "Đang thuê",
    },
    {
      index: 4,
      name: "Audi",
      owner: "duy",
      image:
        "https://images.unsplash.com/photo-1605556816125-d752c226247b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      desc: ["Rất đẹp", "Có máy lạnh"],
      times: 14,
      price: 10000030,
      status: "Đang thuê",
    },
    {
      index: 5,
      name: "Audi",
      owner: "Đăng Duy",
      image:
        "https://media.istockphoto.com/id/1066163022/photo/salon-old-retro-car-close-up-cars-details.jpg?b=1&s=170667a&w=0&k=20&c=zr7O6YxQfdi4LworXLhld8remHR2JHwHYufBThRRSAI=",
      desc: ["Rất đẹp", "Có máy lạnh"],
      times: 9,
      price: 66600000,
      status: "Đang thuê",
    },
    {
      index: 6,
      name: "Audi",
      image:
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      owner: "Đăng Duy",
      desc: ["Rất đẹp", "Có máy lạnh", "Cửa tự động"],
      times: 7,
      price: 6600000,
      status: "Đang thuê",
    },
    {
      index: 7,
      name: "Audi",
      image:
        "https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      owner: "Đăng Duy",
      desc: ["Rất đẹp", "Có máy lạnh"],
      times: 1,
      price: 450000,
      status: "Đang thuê",
    },
    {
      index: 8,
      name: "Audi",
      image:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
      owner: "Đăng Duy",
      desc: ["Rất đẹp", "Có máy lạnh"],
      times: 1,
      price: 380000,
      status: "Đang thuê",
    },
  ]);
  const [user, setUser] = useState(false);
  const { role, username } = useAuth();
  const [value, setValue] = React.useState("1");
  const [value1, setValue1] = React.useState("1");
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditImg, setIsEditImg] = useState(false);
  const [edit, setEdit] = useState(null);
  //////////////////////////////////
  const [listImageUpdatem, setListImageUpdatem] = useState([]);
  const [urlImg, setUrlImg] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [isUpdating, setIsUpdating] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [updateImage1, setUpdateImage1] = useState("");
  const [updateImage2, setUpdateImage2] = useState("");
  const [updateImage3, setUpdateImage3] = useState("");
  const [updateImage4, setUpdateImage4] = useState("");
  useEffect(() => {
    const images = [image1, image2, image3, image4];
    const updatedImages = [
      updateImage1 !== "" ? updateImage1 : image1,
      updateImage2 !== "" ? updateImage2 : image2,
      updateImage3 !== "" ? updateImage3 : image3,
      updateImage4 !== "" ? updateImage4 : image4,
    ];
    console.log("list update", updatedImages);
    const newList = images.map((originalImage, index) => {
      const updatedImage = updatedImages[index];
      return updatedImage;
    });
    setListImageUpdatem(newList);
  }, [
    updateImage1,
    updateImage2,
    updateImage3,
    updateImage4,
    image1,
    image2,
    image3,
    image4,
  ]);
  useEffect(() => {
    if (edit !== null) {
      console.log("editr", edit.image);
      setImage1(edit.image[0]);
      setImage2(edit.image[1]);
      setImage3(edit.image[2]);
      setImage4(edit.image[3]);
    }
  }, [edit]);
  useEffect(() => {
    if (listImageUpdatem.length > 0) {
      console.log("List anh update", listImageUpdatem);
    }
  }, [listImageUpdatem]);
  const onUpdateImage1 = (imageUrl) => {
    setIsEditing(false);
    setIsEditImg(true);
    setUpdateImage1(imageUrl);
    setImage1(imageUrl);
    setIsUpdating(1);
  };
  const onUpdateImage2 = (imageUrl) => {
    setIsEditing(false);
    setIsEditImg(true);
    setUpdateImage2(imageUrl);
    setImage2(imageUrl);
    setIsUpdating(2);
  };
  const onUpdateImage3 = (imageUrl) => {
    setIsEditing(false);
    setIsEditImg(true);
    setUpdateImage3(imageUrl);
    setImage3(imageUrl);
    setIsUpdating(3);
  };
  const onUpdateImage4 = (imageUrl) => {
    setIsEditing(false);
    setIsEditImg(true);
    setUpdateImage4(imageUrl);
    setImage4(imageUrl);
    setIsUpdating(4);
  };
  //////////////////////////////////
  const { data: allvehicle } = useGetAllVehiclesQuery();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  const [processedData, setProcessedData] = useState([]);
  useEffect(() => {
    if (allvehicle !== undefined) {
      setProcessedData(
        allvehicle.result.map((item, index) => ({
          ...item,
          index: index + 1,
        }))
      );
    }
  }, [allvehicle]);

  const paginationConfig = {
    className: "centered-pagination",
  };
  const onEditCar = (record) => {
    setIsEditing(true);
    setEdit({ ...record });
  };
  useEffect(() => {}, [edit]);
  const onDeleteCar = (record) => {
    Modal.confirm({
      title: `Bạn đang chọn xóa xe ${record.name}`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: () => {
        setListCarOwner((pre) => {
          return pre.filter((car) => car.index !== record.index);
        });
      },
    });
  };
  const onDownload = () => {
    alert("Downloading");
  };
  function handleChangeImg(event) {
    setIsLoadingImg(true);
    const selectedFile = event.target.files[0];
    if (isUpdating === 1) {
      uploadImageToCloudinary(selectedFile)
        .then((url) => {
          setIsLoadingImg(false);
          setUpdateImage1(url);
        })
        .catch((error) => {
          setIsLoadingImg(false);
          console.error(error);
        });
    } else if (isUpdating === 2) {
      uploadImageToCloudinary(selectedFile)
        .then((url) => {
          setIsLoadingImg(false);
          setUpdateImage2(url);
        })
        .catch((error) => {
          setIsLoadingImg(false);
          console.error(error);
        });
    } else if (isUpdating === 3) {
      uploadImageToCloudinary(selectedFile)
        .then((url) => {
          setIsLoadingImg(false);
          setUpdateImage3(url);
        })
        .catch((error) => {
          setIsLoadingImg(false);
          console.error(error);
        });
    } else if (isUpdating === 4) {
      uploadImageToCloudinary(selectedFile)
        .then((url) => {
          setIsLoadingImg(false);
          setUpdateImage4(url);
        })
        .catch((error) => {
          setIsLoadingImg(false);
          console.error(error);
        });
    }
  }
  function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pzoe2lzh"); // replace with your Cloudinary upload preset
    return axios
      .post("https://api.cloudinary.com/v1_1/djhhzmcps/image/upload", formData)
      .then((response) => {
        setUrlImg(response.data.url);
        return response.data.url; // return the URL of the uploaded image
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  return (
    <>
      <ProductComponent>
        {!username ? (
          <>
            <section className="productTop">
              <div className="productTop-left">
                <h2
                  style={{ fontWeight: "800", fontSize: "40px", width: "50%" }}
                >
                  Cho thuê xe trên Mioto để gia tăng thu nhập đến 10tr/tháng !
                </h2>
                <p>Hotline: 1900 9217 (T2-T7 9AM-9PM)</p>
                <p>
                  Mioto không thu phí khi bạn đăng xe. Bạn chỉ chia sẻ phí dịch
                  vụ với Mioto khi có giao dịch cho thuê thành công.
                </p>
              </div>
              <div className="productTop-right">
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "5px",
                    gap: "20px",
                  }}
                >
                  <h3
                    style={{
                      textAlign: "center",
                      color: "#00a550",
                      letterSpacing: "2px",
                    }}
                  >
                    Đăng ký cho thuê xe
                  </h3>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "yellow",
                      height: "100%",
                    }}
                  >
                    <input
                      placeholder="Nơi bạn muốn cho thuê xe"
                      className="input-group"
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "yellow",
                      height: "100%",
                    }}
                  >
                    <input
                      placeholder="Nhập tên của bạn"
                      className="input-group"
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "yellow",
                      height: "100%",
                    }}
                  >
                    <input
                      placeholder="Số điện thoại"
                      className="input-group"
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "yellow",
                      height: "100%",
                    }}
                  >
                    <input placeholder="Xe cho thuê" className="input-group" />
                  </div>
                  <div
                    style={{
                      width: "100%",

                      height: "100%",
                    }}
                  >
                    <button className="button">Gửi đến thông tin</button>
                  </div>
                </form>
              </div>
            </section>
            <section className="productMid">
              <div className="row">
                {/* <div className="col">
                <h1>Những chiếc xe hàng đầu</h1>
                <p>
                  Deserunt minim incididunt nisi ipsum nisi Lorem qui sit
                  laborum id quis do. Pariatur proident duis labore eiusmod
                  occaecat reprehenderit anim ea dolore et. Fugiat dolore
                  reprehenderit labore non adipisicing reprehenderit veniam
                </p>
                <button type="button">Đăng ký</button>
              </div> */}
                <div className="col" style={{ textAlign: "center" }}>
                  <div className="card card1">
                    <h5>Audi</h5>
                    <p>hihih</p>
                  </div>
                  <div className="card card2">
                    <h5>BMW</h5>
                    <p>hihih</p>
                  </div>
                  <div className="card card3">
                    <h5>Mercedes</h5>
                    <p>hihih</p>
                  </div>
                  <div className="card card4">
                    <h5>Honda</h5>
                    <p>hihih</p>
                  </div>
                </div>
                <div className="col">
                  <h1>Những chiếc xe hàng đầu</h1>
                  <p style={{ fontSize: "15px", textAlign: "right" }}>
                    Bạn đồng hành cùng bạn trên những chuyến đi
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button type="button" className="btn_signup">
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : role === "customer" ? (
          <>
            {allvehicle === undefined ? (
              <>
                <div
                  style={{
                    minHeight: "calc(100vh - 160px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              </>
            ) : (
              <>
                <TabContext value={value}>
                  <section className="sidebar">
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        style={{
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                          flexDirection: "row",
                        }}
                      >
                        <Tab
                          icon={<DirectionsCarIcon />}
                          iconPosition="start"
                          label="Danh sách xe"
                          className="tab_item"
                          value="1"
                          style={{ color: value == 1 ? "#00a550" : "" }}
                        />
                        <Tab
                          icon={<DescriptionIcon />}
                          iconPosition="start"
                          label="Lịch sử giao dịch"
                          className="tab_item"
                          value="2"
                          style={{ color: value == 2 ? "#00a550" : "" }}
                        />
                      </TabList>
                    </Box>
                  </section>
                  <TabPanel
                    value="1"
                    style={{
                      minHeight: "calc(100vh - 51px)",
                      boxSizing: "border-box",
                    }}
                  >
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
                          title: "Tên",
                          dataIndex: "name",
                          filteredValue: [searchText],
                          onFilter: (value, record) => {
                            return (
                              String(record.name)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.owner)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.desc)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.price)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.status)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.times)
                                .toLowerCase()
                                .includes(value.toLowerCase())
                            );
                          },
                        },
                        {
                          title: "Ảnh",
                          dataIndex: "image",
                          render: (image) => (
                            <Image
                              src={image}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                            />
                          ),
                        },
                        { title: "Chủ xe", dataIndex: "owner" },
                        {
                          title: "Mô tả",
                          key: "desc",
                          dataIndex: "desc",
                          render: (_, { desc }) => (
                            <>
                              {desc.map((tag) => {
                                let color =
                                  tag.length > 5 ? "geekblue" : "green";
                                if (tag === "Có máy lạnh") {
                                  color = "volcano";
                                }
                                return (
                                  <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                  </Tag>
                                );
                              })}
                            </>
                          ),
                        },
                        {
                          title: "Thời gian",
                          dataIndex: "times",
                          render: (times) => `${times} ngày`,
                          sorter: (a, b) => a.times - b.times,
                        },
                        {
                          title: "Giá tiền",
                          dataIndex: "price",
                          render: (price) => formatter.format(price),
                          sorter: (a, b) => a.price - b.price,
                        },
                        {
                          title: "Trạng thái",
                          dataIndex: "status",
                          render: (status) => {
                            if (status === "Đang thuê") {
                              return <Tag color="green">{status}</Tag>;
                            } else if (status === "Đang giao xe") {
                              return <Tag color="red">{status}</Tag>;
                            } else {
                              return <p>{status}</p>;
                            }
                          },
                        },
                      ]}
                      // dataSource={[
                      //   {
                      //     index: 1,
                      //     name: "Honda",
                      //     image:
                      //       "https://images.unsplash.com/photo-1501066927591-314112b5888e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWVyY2VkZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
                      //     owner: "Thùy Vân",
                      //     desc: ["Rất đẹp", "Có máy lạnh"],
                      //     times: 3,
                      //     price: 1000000,
                      //     status: "Đang giao xe",
                      //   },
                      //   {
                      //     index: 2,
                      //     name: "Mecs",
                      //     owner: "Huỳnh Chánh",
                      //     image:
                      //       "https://images.unsplash.com/photo-1608994751987-e647252b1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                      //     desc: ["Rất đẹp", "Có máy lạnh"],
                      //     times: 4,
                      //     price: 7000000,
                      //     status: "Đang giao xe",
                      //   },
                      //   {
                      //     index: 3,
                      //     name: "Audi",
                      //     image:
                      //       "https://images.unsplash.com/photo-1609703048009-d3576872b32c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                      //     owner: "Thùy Vân",
                      //     desc: ["Rất đẹp", "Có máy lạnh"],
                      //     times: 20,
                      //     price: 500000,
                      //     status: "Đang thuê",
                      //   },
                      //   {
                      //     index: 4,
                      //     name: "Audi",
                      //     owner: "duy",
                      //     image:
                      //       "https://images.unsplash.com/photo-1605556816125-d752c226247b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                      //     desc: ["Rất đẹp", "Có máy lạnh"],
                      //     times: 14,
                      //     price: 10000030,
                      //     status: "Đang thuê",
                      //   },
                      //   {
                      //     index: 5,
                      //     name: "Audi",
                      //     owner: "Đăng Duy",
                      //     image:
                      //       "https://media.istockphoto.com/id/1066163022/photo/salon-old-retro-car-close-up-cars-details.jpg?b=1&s=170667a&w=0&k=20&c=zr7O6YxQfdi4LworXLhld8remHR2JHwHYufBThRRSAI=",
                      //     desc: ["Rất đẹp", "Có máy lạnh"],
                      //     times: 9,
                      //     price: 66600000,
                      //     status: "Đang thuê",
                      //   },
                      //   {
                      //     index: 6,
                      //     name: "Audi",
                      //     image:
                      //       "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                      //     owner: "Đăng Duy",
                      //     desc: ["Rất đẹp", "Có máy lạnh", "Cửa tự động"],
                      //     times: 7,
                      //     price: 6600000,
                      //     status: "Đang thuê",
                      //   },
                      //   {
                      //     index: 7,
                      //     name: "Audi",
                      //     image:
                      //       "https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                      //     owner: "Đăng Duy",
                      //     desc: ["Rất đẹp", "Có máy lạnh"],
                      //     times: 1,
                      //     price: 450000,
                      //     status: "Đang thuê",
                      //   },
                      //   {
                      //     index: 8,
                      //     name: "Audi",
                      //     image:
                      //       "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                      //     owner: "Đăng Duy",
                      //     desc: ["Rất đẹp", "Có máy lạnh"],
                      //     times: 1,
                      //     price: 380000,
                      //     status: "Đang thuê",
                      //   },
                      // ]}
                      dataSource={allvehicle.result}
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
                  </TabPanel>
                  <TabPanel
                    value="2"
                    style={{
                      minHeight: "calc(100vh - 51px)",
                      boxSizing: "border-box",
                    }}
                  >
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
                          title: "Tên",
                          dataIndex: "name",
                          filteredValue: [searchText],
                          onFilter: (value, record) => {
                            return (
                              String(record.name)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.owner)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.price)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.times)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.daystart)
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              String(record.dayend)
                                .toLowerCase()
                                .includes(value.toLowerCase())
                            );
                          },
                        },

                        {
                          title: "Tổng số giờ thuê",
                          dataIndex: "times",
                          render: (times) => `${times} giờ`,
                          sorter: (a, b) => a.times - b.times,
                        },
                        {
                          title: "Ngày bắt đầu",
                          dataIndex: "daystart",
                          render: (daystart) => daystart,
                          sorter: (a, b) => {
                            const dateA = dayjs(
                              a.daystart,
                              "DD/MM/YYYY HH:mm:ss"
                            );
                            const dateB = dayjs(
                              b.daystart,
                              "DD/MM/YYYY HH:mm:ss"
                            );
                            if (dateA.isBefore(dateB)) {
                              return -1;
                            } else if (dateA.isAfter(dateB)) {
                              return 1;
                            }
                            return 0;
                          },
                        },
                        {
                          title: "Ngày kết thúc",
                          dataIndex: "dayend",
                          render: (dayend) => dayend,
                          sorter: (a, b) => {
                            const dateA = dayjs(
                              a.dayend,
                              "DD/MM/YYYY HH:mm:ss"
                            );
                            const dateB = dayjs(
                              b.dayend,
                              "DD/MM/YYYY HH:mm:ss"
                            );
                            if (dateA.isBefore(dateB)) {
                              return -1;
                            } else if (dateA.isAfter(dateB)) {
                              return 1;
                            }
                            return 0;
                          },
                        },
                        {
                          title: "Tổng giá tiền",
                          dataIndex: "price",
                          render: (price) => formatter.format(price),
                          sorter: (a, b) => a.price - b.price,
                        },
                      ]}
                      dataSource={[
                        {
                          index: 1,
                          name: "Honda",
                          image:
                            "https://images.unsplash.com/photo-1501066927591-314112b5888e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWVyY2VkZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
                          owner: "Thùy Vân",
                          daystart: "17/05/2023 19:00:00",
                          dayend: "17/05/2023 22:00:00",
                          desc: ["Rất đẹp", "Có máy lạnh"],
                          times: 3,
                          price: 1000000,
                          status: "Đang giao xe",
                        },
                        {
                          index: 2,
                          name: "Mecs",
                          owner: "Huỳnh Chánh",
                          daystart: "17/05/2023 19:00:00",
                          dayend: "17/05/2023 22:00:00",
                          image:
                            "https://images.unsplash.com/photo-1608994751987-e647252b1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                          desc: ["Rất đẹp", "Có máy lạnh"],
                          times: 4,
                          price: 7000000,
                          status: "Đang giao xe",
                        },
                        {
                          index: 3,
                          name: "Audi",
                          daystart: "17/05/2023 19:00:00",
                          dayend: "17/04/2023 22:00:00",
                          image:
                            "https://images.unsplash.com/photo-1609703048009-d3576872b32c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                          owner: "Thùy Vân",
                          desc: ["Rất đẹp", "Có máy lạnh"],
                          times: 20,
                          price: 500000,
                          status: "Đang thuê",
                        },
                        {
                          index: 4,
                          name: "Audi",
                          owner: "duy",
                          daystart: "17/05/2023 21:00:00",
                          dayend: "17/02/2023 22:00:00",
                          image:
                            "https://images.unsplash.com/photo-1605556816125-d752c226247b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                          desc: ["Rất đẹp", "Có máy lạnh"],
                          times: 14,
                          price: 10000030,
                          status: "Đang thuê",
                        },
                        {
                          index: 5,
                          name: "Audi",
                          owner: "Đăng Duy",
                          daystart: "17/05/2023 19:00:00",
                          dayend: "17/05/2023 22:00:00",
                          image:
                            "https://media.istockphoto.com/id/1066163022/photo/salon-old-retro-car-close-up-cars-details.jpg?b=1&s=170667a&w=0&k=20&c=zr7O6YxQfdi4LworXLhld8remHR2JHwHYufBThRRSAI=",
                          desc: ["Rất đẹp", "Có máy lạnh"],
                          times: 9,
                          price: 66600000,
                          status: "Đang thuê",
                        },
                        {
                          index: 6,
                          name: "Audi",
                          daystart: "17/05/2023 19:00:00",
                          dayend: "17/05/2023 22:00:00",
                          image:
                            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                          owner: "Đăng Duy",
                          desc: ["Rất đẹp", "Có máy lạnh", "Cửa tự động"],
                          times: 7,
                          price: 6600000,
                          status: "Đang thuê",
                        },
                        {
                          index: 7,
                          name: "Audi",
                          daystart: "17/05/2023 19:00:00",
                          dayend: "17/05/2023 22:00:00",
                          image:
                            "https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                          owner: "Đăng Duy",
                          desc: ["Rất đẹp", "Có máy lạnh"],
                          times: 1,
                          price: 450000,
                          status: "Đang thuê",
                        },
                        {
                          index: 8,
                          name: "Audi",
                          daystart: "17/05/2023 19:00:00",
                          dayend: "17/05/2023 22:00:00",
                          image:
                            "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                          owner: "Đăng Duy",
                          desc: ["Rất đẹp", "Có máy lạnh"],
                          times: 1,
                          price: 380000,
                          status: "Đang thuê",
                        },
                      ]}
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
                  </TabPanel>
                  <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
              </>
            )}
          </>
        ) : (
          /* Tab of owner */
          <>
            {allvehicle === undefined ? (
              <>
                <div
                  style={{
                    minHeight: "calc(100vh - 160px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              </>
            ) : (
              <>
                <TabContext value={value1}>
                  <section className="sidebar">
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange1}
                        aria-label="lab API tabs example"
                        style={{
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                          flexDirection: "row",
                        }}
                      >
                        <Tab
                          icon={<DirectionsCarIcon />}
                          iconPosition="start"
                          label="Danh sách xe"
                          className="tab_item"
                          value="1"
                          style={{ color: value1 == 1 ? "#00a550" : "" }}
                        />
                        <Tab
                          icon={<TaskIcon />}
                          iconPosition="start"
                          label="Danh sách yêu cầu"
                          className="tab_item"
                          value="2"
                          style={{ color: value1 == 2 ? "#00a550" : "" }}
                        />
                        <Tab
                          icon={<AutoGraphIcon />}
                          iconPosition="start"
                          label="Phản hồi"
                          value="3"
                          className="tab_item"
                          style={{ color: value1 == 3 ? "#00a550" : "" }}
                        />
                      </TabList>
                    </Box>
                  </section>
                  <TabPanel value="1">
                    <TabPanel
                      value="1"
                      style={{
                        minHeight: "calc(100vh - 51px)",
                        boxSizing: "border-box",
                      }}
                    >
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
                            title: "Tên",
                            dataIndex: "make",
                            filteredValue: [searchText],
                            onFilter: (value, record) => {
                              return (
                                String(record.make)
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
                                  record.isAvailable === true
                                    ? "Chưa được thuê"
                                    : "Đang thuê"
                                )
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.times)
                                  .toLowerCase()
                                  .includes(value.toLowerCase())
                              );
                            },
                          },
                          {
                            title: "Ảnh",
                            dataIndex: "image",
                            render: (image) => (
                              <Image
                                src={image[0]}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                              />
                            ),
                          },

                          {
                            title: "Giá giờ thuê",
                            dataIndex: "price",
                            render: (price) => formatter.format(price),
                            sorter: (a, b) => a.price - b.price,
                          },
                          {
                            title: "Trạng thái",
                            dataIndex: "isAvailable",
                            render: (isAvailable) => {
                              if (isAvailable === true) {
                                return <Tag color="red">Chưa được thuê</Tag>;
                              } else {
                                return <Tag color="green">Đang được thuê</Tag>;
                              }
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
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                    }}
                                  >
                                    <EditOutlined
                                      style={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => onEditCar(record)}
                                    />
                                    <DeleteOutlined
                                      style={{
                                        color: "red",
                                        fontSize: "20px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => onDeleteCar(record)}
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
                    </TabPanel>
                  </TabPanel>
                  <TabPanel value="2">
                    {" "}
                    <TabPanel
                      value="2"
                      style={{
                        minHeight: "calc(100vh - 51px)",
                        boxSizing: "border-box",
                      }}
                    >
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
                            title: "Tên",
                            dataIndex: "name",
                            filteredValue: [searchText],
                            onFilter: (value, record) => {
                              return (
                                String(record.name)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.owner)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.desc)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.price)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.status)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.times)
                                  .toLowerCase()
                                  .includes(value.toLowerCase())
                              );
                            },
                          },
                          {
                            title: "Ảnh",
                            dataIndex: "image",
                            render: (image) => (
                              <Image
                                src={image}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                              />
                            ),
                          },

                          {
                            title: "Giá giờ thuê",
                            dataIndex: "price",
                            render: (price) => formatter.format(price),
                            sorter: (a, b) => a.price - b.price,
                          },
                          {
                            title: "Trạng thái",
                            dataIndex: "status",
                            render: (status) => {
                              if (status === "Đang thuê") {
                                return <Tag color="green">{status}</Tag>;
                              } else if (status === "Đang ở bãi") {
                                return <Tag color="red">{status}</Tag>;
                              } else {
                                return <p>{status}</p>;
                              }
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
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                    }}
                                  >
                                    <EditOutlined
                                      style={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => onEditCar(record)}
                                    />
                                    <DeleteOutlined
                                      style={{
                                        color: "red",
                                        fontSize: "20px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => onDeleteCar(record)}
                                    />
                                  </div>
                                </>
                              );
                            },
                          },
                        ]}
                        dataSource={listCarOwner}
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
                    </TabPanel>
                  </TabPanel>
                  <TabPanel value="3">Phản hồi</TabPanel>
                </TabContext>
              </>
            )}
          </>
        )}
      </ProductComponent>
      <Modal
        className="modal"
        width={1000}
        title="Chỉnh sửa thông tin"
        open={isEditing}
        okText="Cập nhật"
        cancelText="Hủy"
        onCancel={() => {
          setIsEditing(false);
        }}
        onOk={() => {
          setIsEditing(false);
        }}
      >
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              width: "100%",
            }}
          >
            <Image
              style={{
                width: "236px",
                height: "auto",
                maxHeight: "200px",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={edit?.image}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",

                width: "200px",
                padding: "0 10px",
                gap: "10px",
              }}
            >
              <label style={{ fontWeight: "bold", cursor: "pointer" }}>
                Tên xe
              </label>
              <input
                value={edit?.name}
                style={{
                  boxSizing: "border-box",
                  padding: "10px",
                  outline: "none",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
              ></input>
              <label
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                Giá giờ thuê
              </label>
              <input
                value={edit?.price}
                style={{
                  boxSizing: "border-box",
                  padding: "10px",
                  outline: "none",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
              ></input>
            </div>
          </div>
          <Input value={edit?.name}></Input>
        </div> */}
        <div
          style={{
            padding: "10px 0",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "gold",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Image
                style={{
                  width: "560px",
                  // height: "auto",
                  height: "500px",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  borderRadius: "8px",
                }}
                src={updateImage1 ? updateImage1 : edit?.image[0]}
              />
              <button
                onClick={() =>
                  onUpdateImage1(updateImage1 ? updateImage1 : edit?.image[0])
                }
                style={{
                  border: "none",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  padding: "5px 10px",
                  borderRadius: "8px",
                }}
              >
                Cập nhật
              </button>
            </div>
            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "372px",
                  height: "auto",
                  maxHeight: "160px",
                  position: "relative",
                }}
              >
                <Image
                  style={{
                    width: "372px",
                    height: "auto",
                    maxHeight: "160px",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    borderRadius: "8px",
                  }}
                  src={updateImage2 ? updateImage2 : edit?.image[1]}
                />
                <button
                  onClick={() =>
                    onUpdateImage2(updateImage2 ? updateImage2 : edit?.image[1])
                  }
                  style={{
                    border: "none",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    padding: "5px 10px",
                    borderRadius: "8px",
                  }}
                >
                  Cập nhật
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "372px",
                  height: "auto",
                  maxHeight: "160px",
                  position: "relative",
                }}
              >
                <Image
                  style={{
                    width: "372px",
                    height: "auto",
                    maxHeight: "160px",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    borderRadius: "8px",
                  }}
                  src={updateImage3 ? updateImage3 : edit?.image[2]}
                />
                <button
                  onClick={() =>
                    onUpdateImage3(updateImage3 ? updateImage3 : edit?.image[2])
                  }
                  style={{
                    border: "none",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    padding: "5px 10px",
                    borderRadius: "8px",
                  }}
                >
                  Cập nhật
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "372px",
                  height: "auto",
                  maxHeight: "160px",
                  position: "relative",
                }}
              >
                <Image
                  style={{
                    width: "372px",
                    height: "auto",
                    maxHeight: "160px",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    borderRadius: "8px",
                  }}
                  src={updateImage4 ? updateImage4 : edit?.image[3]}
                />
                <button
                  onClick={() =>
                    onUpdateImage4(updateImage4 ? updateImage4 : edit?.image[3])
                  }
                  style={{
                    border: "none",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    padding: "5px 10px",
                    borderRadius: "8px",
                  }}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="modal"
        width={500}
        title="Cập nhật hình ảnh"
        open={isEditImg}
        okText="Cập nhật"
        cancelText="Hủy"
        onCancel={() => {
          setIsEditImg(false);
        }}
        onOk={() => {
          setIsEditImg(false);
          setIsEditing(true);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "20px",
            position: "relative",
          }}
        >
          {isLoadingImg ? (
            <div
              style={{
                display: "flex",
                width: "412px",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <img
              src={
                isUpdating === 1
                  ? updateImage1
                  : isUpdating === 2
                  ? updateImage2
                  : isUpdating === 3
                  ? updateImage3
                  : updateImage4
              }
              style={{
                display: "block",
                width: "412px",
                maxHeight: "300px",
                height: "auto",
                objectFit: "cover",
                objectPosition: "center",
              }}
              alt=""
            />
          )}
          <input
            onChange={handleChangeImg}
            type="file"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              display: "block",
              opacity: "0",
              cursor: "pointer",
            }}
          ></input>
        </div>
      </Modal>
    </>
  );
}
const ProductComponent = styled.section`
  min-height: 100vh;
  width: 100%;

  .centered-pagination {
    display: flex;
    justify-content: center;
  }
  .productTop::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0.9;
    bottom: 0;
    z-index: 1;
    background: url("https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1079&q=80");
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
  }
  .productTop {
    min-height: calc(100vh - (60px));
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .productTop-left {
      width: 60%;
      color: white;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 1em;
      z-index: 2;
    }
    .productTop-right {
      width: 40%;
      background-color: #f8f9fb;
      padding: 15px 30px 10px;
      line-height: 24px;
      display: flex;
      flex-direction: column;
      z-index: 2;
      .input-group {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        boxsizing: border-box;
        padding: 10px 10px;
        display: block;
      }
      .button {
        color: white;
        width: 100%;
        height: 100%;
        display: block;
        padding: 10px 10px;
        cursor: pointer;
        background-color: #00a550;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
  }
  .productMid {
    min-height: 100vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url("https://images.unsplash.com/photo-1675057852299-7ce1e5f53de3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1215&q=80");
  }
  .row {
    display: flex;
    box-sizing: border-box;
    height: 100vh;
    padding: 30px;
    gap: 30px;
    align-items: center;
    .col {
      flex-basis: 50%;
    }
    h1 {
      color: #fff;
      font-size: 80px;
      font-weight: bold;
      text-align: right;
    }
    p {
      color: #fff;
      font-size: 12px;
      line-height: 16px;
      margin-top: 20px;
    }
    button {
      width: 190px;
      color: white;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      padding: 12px 0;
      background-color: #00a550;
      border: none;
      border-radius: 20px;
      outline: none;
      transition: background-color color 2s ease-in-out;
      margin-top: 20px;
    }
    button:hover {
      background-color: white;
      color: #00a550;
    }
  }
  .card {
    width: 200px;
    height: 230px;
    display: inline-block;
    boder-radius: 10;
    padding: 15px 25px;
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.5s;
    margin: 10px 15px;
    border-radius: 5px;
    h5 {
      font-weight: bold;
      font-size: 19px;
      color: white;
      letter-spacing: 1px;
    }
  }
  .card:hover {
    transform: translateY(-5px) !important;
  }
  .card1 {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url("https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXVkaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60");
  }
  .card2 {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://images.unsplash.com/photo-1601359169004-f9663c04c892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGJtd3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60");
  }
  .card3 {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://images.unsplash.com/photo-1616790151040-47661836dd26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60");
  }
  .card4 {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://images.unsplash.com/photo-1570303278489-041bd897a873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG9uZGF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60");
  }
  .btn_signup {
    color: red;
  }
  .sidebar {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    .tab_item {
      padding: 15px;
      min-height: 0;
    }
    ul {
      display: flex;
      li {
        padding: 0 40px;
      }
      li:not(:first-child):not(:last-child) {
        border-right: 0.5px solid black;
        border-left: 0.5px solid black;
      }
      .item-sidebar {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
      }
      .item-sidebar span {
        font-weight: bold;
      }
      .item-sidebar:hover span {
        color: #00a550;
      }
      .item-sidebar:hover ion-icon {
        color: #00a550;
      }
    }
  }
  ${
    "" /* ..css-h0q0iv-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: yellow;
  } */
  }
`;
const ProductComponent2 = styled.section``;
export default Product;
