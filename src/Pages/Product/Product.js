import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { saveAs } from "file-saver";
import * as docx from "docx";
import "./Product.scss";
import Icon, {
  DeleteOutlined,
  EditOutlined,
  CloseOutlined,
  CheckOutlined,
  LoadingOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import { FaPencilAlt } from "react-icons/fa";
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
import {
  useDeleteVehicleQuery,
  useGetAllVehiclesQuery,
  useGetOwnerOrdersQuery,
  useGetUserQuery,
  useGetVehicleOwnerQuery,
} from "../../features/user/userApiSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { COLORS } from "../../assets/color";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function Product() {
  const [carDetail, setCarDetail] = useState([]);
  const [customerDetail, setCustomerDetail] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [editMoney, setEditMoney] = useState(false);
  const [editMoney1, setEditMoney1] = useState(false);
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
  const [responseInfor, setResponseInfor] = useState(null);
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  const getVehicleOwnerQuery = useGetVehicleOwnerQuery();
  const { data: listOwnerOrder } = useGetOwnerOrdersQuery();
  const { data: userCurrent } = useGetUserQuery();
  const getUserCurrent = useGetUserQuery();
  ///////////////////////////////////
  const [map, setMap] = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [camera360, setCamera360] = useState(false);
  const [cameratruoc, setCameratruoc] = useState(false);
  const [cameratrip, setCameratrip] = useState(false);
  const [camerasau, setCamerasau] = useState(false);
  const [cuaso, setCuaso] = useState(false);
  const [gps, setGps] = useState(false);
  const [ghe, setGhe] = useState(false);
  const [lop, setLop] = useState(false);
  const [manhinh, setManhinh] = useState(false);
  const [tuikhi, setTuikhi] = useState(false);
  const [price, setPrice] = useState(false);
  const [extraFee, setExtraFee] = useState(false);
  const [desc, setDesc] = useState("");
  //////////////////////////////////
  const [listImageUpdatem, setListImageUpdatem] = useState([]);
  const [listFeatures, setListFeatures] = useState([]);
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
  const featureList = [
    { id: 1, value: map },
    { id: 2, value: bluetooth },
    { id: 3, value: camera360 },
    { id: 4, value: cameratruoc },
    { id: 5, value: cameratrip },
    { id: 6, value: camerasau },
    { id: 7, value: cuaso },
    { id: 8, value: gps },
    { id: 9, value: ghe },
    { id: 10, value: lop },
    { id: 11, value: manhinh },
    { id: 12, value: tuikhi },
  ];
  useEffect(() => {
    if (edit !== null) {
      console.log("editr", edit.image);
      setImage1(edit.image[0]);
      setImage2(edit.image[1]);
      setImage3(edit.image[2]);
      setImage4(edit.image[3]);
      setMap(edit.feature[0].value);
      setBluetooth(edit.feature[1].value);
      setCamera360(edit.feature[2].value);
      setCameratruoc(edit.feature[3].value);
      setCameratrip(edit.feature[4].value);
      setCamerasau(edit.feature[5].value);
      setCuaso(edit.feature[6].value);
      setGps(edit.feature[7].value);
      setGhe(edit.feature[8].value);
      setLop(edit.feature[9].value);
      setManhinh(edit.feature[10].value);
      setTuikhi(edit.feature[11].value);
      setPrice(edit.price);
      setExtraFee(edit.extraFee);
      setDesc(edit.description);
    }
  }, [edit]);

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
  //////////////////////////////////useGetVehicleOwnerQuery
  const { data: allvehicle } = useGetAllVehiclesQuery();
  const { data: allvehicleowner } = useGetVehicleOwnerQuery();
  const getOwnedOrder = useGetOwnerOrdersQuery();
  const { data: ownerOrder } = useGetOwnerOrdersQuery();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [processedData, setProcessedData] = useState([]);
  const [ownedData, setOwnedData] = useState([]);
  const [isLoadingAccept, setIsLoadingAccept] = useState(
    new Array(ownedData.length).fill(false)
  );
  const [isLoadingDecline, setIsLoadingDecline] = useState(
    new Array(ownedData.length).fill(false)
  );
  useEffect(() => {
    if (allvehicleowner !== undefined) {
      setProcessedData(
        allvehicleowner.ownedVehicle.map((item, index) => ({
          ...item,
          index: index + 1,
        }))
      );
    }
  }, [allvehicleowner]);
  useEffect(() => {
    if (ownerOrder !== undefined) {
      console.log(ownerOrder);
      setOwnedData(
        ownerOrder.orders.map((item, index) => ({
          ...item,
          index: index + 1,
        }))
      );
    }
  }, [ownerOrder]);
  const paginationConfig = {
    className: "centered-pagination",
  };
  // ===============================================RESPONSE========================================================
  const onEditCar = (record) => {
    setIsEditing(true);
    setEdit({ ...record });
  };
  const onDeleteCar = (record) => {
    const urlDelete = `http://localhost:9090/vehicle/${record._id}`;
    axios
      .delete(urlDelete, opts)
      .then((response) => {
        Swal.fire({
          title: "Thành công!",
          text: "Vui lòng chờ kiểm tra thông tin từ quản trị viên!",
          icon: "success",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            getVehicleOwnerQuery.refetch();
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
  const onAccept = (record, rowIndex) => {
    setIsLoadingAccept((prevLoadingStates) => ({
      ...prevLoadingStates,
      [record.key]: true,
    }));
    const urlResponseOrder = `http://localhost:9090/order/responseOrder`;
    axios
      .patch(
        urlResponseOrder,
        {
          vehicleID: record.vehicleID,
          orderID: record._id,
          isResponse: true,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      )
      .then((response) => {
        Swal.fire({
          title: "Thành công!",
          text: "Chấp thuận yêu cầu thành công!",
          icon: "success",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            getUserCurrent.refetch();
            getOwnedOrder.refetch();
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
      })
      .finally(() => {
        setIsLoadingAccept((prevLoadingStates) => ({
          ...prevLoadingStates,
          [record.key]: false, // Set loading back to false
        }));
      });
  };
  const onDecline = (record) => {
    setIsLoadingDecline((prevLoadingStates) => ({
      ...prevLoadingStates,
      [record.key]: true,
    }));
    setResponseData({ ...record });
  };
  // ===============================================RESPONSE========================================================
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
  const onUpdateInformation = (e) => {
    e.preventDefault();
    const urlUpdate = `http://localhost:9090/vehicle/${edit._id}`;
    axios
      .patch(
        urlUpdate,
        {
          image: listImageUpdatem,
          price: price,
          extraFee: extraFee,
          feature: featureList,
          description: desc,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      )
      .then((response) => {
        Swal.fire({
          title: "Thành công!",
          text: "Bạn đã cập nhật thành công!",
          icon: "success",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            getVehicleOwnerQuery.refetch();
            setIsEditing(false);
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

  function formatISODate(isoDateString) {
    const isoDate = new Date(isoDateString);

    // Extract components from the ISO date
    const day = isoDate.getUTCDate();
    const month = isoDate.getUTCMonth() + 1; // Months are 0-based
    const year = isoDate.getUTCFullYear();
    const hours = isoDate.getUTCHours();
    const minutes = isoDate.getUTCMinutes();
    const seconds = isoDate.getUTCSeconds();

    // Format the components into the desired format
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }
  const inforUser = (user) => {
    const filteredData = ownedData.userList.filter((user) => user._id === user);
    setCustomerDetail(filteredData);
  };
  function generate(record) {
    const benAChuKy = "Chữ ký của Bên A";
    const benBChuKy = "Chữ ký của Bên B";
    console.log(userCurrent.User);
    const nameA =
      userCurrent.User.lastName.toUpperCase() +
      " " +
      userCurrent.User.firstName.toUpperCase();
    const phoneA = userCurrent.User.phoneNumber;
    const inforB = ownerOrder.userList.filter(
      (user) => user._id === record.userID
    );
    const inforVehicle = ownerOrder.vehicleList.filter(
      (vehicle) => vehicle._id === record.vehicleID
    );
    const nameB =
      inforB[0].lastName.toUpperCase() +
      " " +
      inforB[0].firstName.toUpperCase();
    const phoneB = inforB[0].phoneNumber;
    const date = dayjs(record.from);
    const nameVehicle =
      inforVehicle[0].make.toUpperCase() +
      " " +
      inforVehicle[0].model.toUpperCase() +
      " " +
      inforVehicle[0].year.toUpperCase();
    const bienso = inforVehicle[0].licensePlate;
    const dateCreate = date.format("DD/MM/YYYY");
    const date2 = dayjs(record.to);
    const dateEnd = date2.format("DD/MM/YYYY");
    const totalMoney = formatter.format(record.total);
    console.log("Hợp đồng", totalMoney);
    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({
                  text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                  size: 32,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({
                  text: "Độc lập - Tự do - Hạnh phúc",
                  size: 30,
                  italics: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({
                  break: 1,
                  text: "HỢP ĐỒNG THUÊ XE",
                  size: 32,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "Hôm nay, ngày ",
                  size: 26,
                  break: 1,
                }),
                new docx.TextRun({
                  text: `${dateCreate}`,
                  bold: true,
                  size: 26,
                }),
                new docx.TextRun({ text: ", tại ", size: 26 }),
                new docx.TextRun({
                  text: `địa chỉ thuê xe: ${record.address}`,
                  size: 26,
                }),
                new docx.TextRun({ text: ", giữa:", size: 26 }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "Bên A: ", size: 26, bold: true }),
                new docx.TextRun({ text: "(Bên cho thuê)", size: 26 }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "- Tên: ", size: 26 }),
                new docx.TextRun({
                  text: `${nameA}`,
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "- Số điện thoại: ", size: 26 }),
                new docx.TextRun({
                  text: `${phoneA}`,
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "Bên B: ", size: 26, bold: true }),
                new docx.TextRun({ text: "(Bên thuê xe)", size: 26 }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "- Tên: ", size: 26 }),
                new docx.TextRun({
                  text: `${nameB}`,
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "- Số điện thoại: ", size: 26 }),
                new docx.TextRun({
                  text: `${phoneB}`,
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "Sau khi bàn bạc, thỏa thuận, hai bên thống nhất ký kết Hợp đồng thuê xe với các điều khoản như sau:",
                  size: 26,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "ĐIỀU 1:",
                  size: 26,
                  bold: true,
                  break: 1,
                }),
                new docx.TextRun({
                  text: " NỘI DUNG HỢP ĐỒNG",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, //
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "Bên A đồng ý cho Bên B thuê phương tiện có thông tin như sau:",
                  size: 26,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "- Tên phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: `${nameVehicle}`,
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "- Biển số phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: `${bienso}`,
                  size: 26,
                  bold: true,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "- Ngày bắt đầu thuê phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: `${dateCreate}`,
                  size: 26,
                  bold: true,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "- Ngày kết thúc thuê phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: `${dateEnd}`,
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "ĐIỀU 2:",
                  size: 26,
                  bold: true,
                  break: 1,
                }),
                new docx.TextRun({
                  text: " GIÁ TRỊ HỢP ĐỒNG",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "- Tổng số tiền thuê phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: `${totalMoney}`,
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "(Giá trên đã bao gồm phí dịch vụ và phí bảo hiển)",
                  size: 26,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "ĐIỀU 3:",
                  size: 26,
                  bold: true,
                  break: 1,
                }),
                new docx.TextRun({
                  text: " TRÁCH NHIỆM CỦA CÁC BÊN",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "3.1. Trách nhiệm của bên A:",
                  size: 26,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Giao xe và toàn bộ giấy tờ liên quan đến xe ngay sau khi Hợp đồng có hiệu lực và Bên A đã thanh toán tiền thuê xe 01 tháng đầu tiên. Giấy tờ liên quan đến xe gồm: Giấy đăng ký xe, giấy kiểm định, giấy bảo hiểm xe.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu của xe.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Mua bảo hiểm xe và đăng kiểm xe cho các lần kế tiếp trong thời hạn hiệu lực của Hợp đồng.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Mua bảo hiểm xe và đăng kiểm xe cho các lần kế tiếp trong thời hạn hiệu lực của Hợp đồng.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "3.2. Trách nhiệm của bên B:",
                  size: 26,
                  break: 1,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Thanh toán tiền thuê xe cho Bên A đúng hạn.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Chịu toàn bộ chi phí bảo dưỡng xe theo định kỳ",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Chịu toàn bộ chi phí xăng dầu khi sử dụng xe.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "ĐIỀU 4:",
                  size: 26,
                  bold: true,
                  break: 1,
                }),
                new docx.TextRun({
                  text: " HIỆU LỰC HỢP ĐỒNG",
                  size: 26,
                  bold: true,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: `- Hợp đồng có giá trị kể từ ngày ${dateCreate} đến hết ngày ${dateEnd}.`,
                  size: 26,
                  justified: true,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Nếu một trong hai Bên, bên nào muốn chấm dứt Hợp đồng trước thời hạn thì phải thông báo cho Bên kia trươc ít nhất 01 tháng.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 10 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({ text: `${benAChuKy}`, size: 26 }),
                new docx.TextRun(" ".repeat(30)), // Khoảng trống giữa hai chữ ký
                new docx.TextRun({ text: `${benBChuKy}`, size: 26 }),
              ],
            }),
          ],
        },
      ],
    });

    // Xuất tệp DOCX
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "hopdongthuexe.docx");
      console.log("Document created successfully");
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
            {role === "owner" && allvehicleowner !== undefined ? (
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
                            title: "ID phương tiện",
                            dataIndex: "vehicleID",
                            filteredValue: [searchText],
                            onFilter: (value, record) => {
                              return (
                                String(record.vehicleID)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.userID)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.from)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.to)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.price)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.total)
                                  .toLowerCase()
                                  .includes(value.toLowerCase()) ||
                                String(record.totalTime)
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
                            title: "ID người thuê",
                            dataIndex: "userID",
                          },

                          {
                            title: "Ngày bắt đầu",
                            dataIndex: "from",
                            render: (from) => formatISODate(from),
                            sorter: (a, b) => {
                              const dateA = new Date(a.from);
                              const dateB = new Date(b.from);
                              return dateA - dateB;
                            },
                          },
                          {
                            title: "Ngày kết thúc",
                            dataIndex: "to",
                            render: (to) => formatISODate(to),
                            sorter: (a, b) => {
                              const dateA = new Date(a.to);
                              const dateB = new Date(b.to);
                              return dateA - dateB;
                            },
                          },
                          {
                            title: "Số giờ",
                            dataIndex: "totalTime",
                          },
                          {
                            title: "Tổng tiền",
                            dataIndex: "total",
                            render: (total) => formatter.format(total),
                          },

                          {
                            title: "Hợp đồng",
                            width: 100,
                            render: (record) => {
                              return (
                                <>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    <button
                                      style={{
                                        fontSize: "13px",
                                        padding: "5px 10px",
                                        cursor:
                                          record.isHandle && record.isResponse
                                            ? "pointer"
                                            : "",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px",
                                      }}
                                      disabled={
                                        !record.isHandle && !record.isResponse
                                      }
                                      onClick={() => {
                                        generate(record);
                                      }}
                                    >
                                      <PrinterFilled /> <span>In</span>
                                    </button>
                                  </div>
                                </>
                              );
                            },
                          },
                          {
                            title: "",
                            render: (record, _, index) => {
                              return (
                                <>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    {record.isHandle ? (
                                      <span>Đã xử lý</span>
                                    ) : (
                                      <>
                                        {isLoadingAccept[record.key] ? (
                                          <LoadingOutlined
                                            style={{
                                              fontSize: 20,
                                            }}
                                            spin
                                          />
                                        ) : (
                                          <CheckOutlined
                                            style={{
                                              fontSize: "20px",
                                              cursor: "pointer",
                                              color: "green",
                                            }}
                                            onClick={() => onAccept(record)}
                                          />
                                        )}
                                        {isLoadingDecline[record.key] ? (
                                          <LoadingOutlined
                                            style={{
                                              fontSize: 20,
                                            }}
                                            spin
                                          />
                                        ) : (
                                          <CloseOutlined
                                            style={{
                                              fontSize: "20px",
                                              cursor: "pointer",
                                              color: "red",
                                            }}
                                            onClick={() =>
                                              onDecline(record, index)
                                            }
                                          />
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              );
                            },
                          },
                        ]}
                        dataSource={ownedData.map((item, index) => ({
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
                </TabContext>
              </>
            ) : (
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
            )}
          </>
        )}
      </ProductComponent>
      {/* //////////////////////////////////////////////////////////////////// */}
      <Modal
        className="modal"
        width={1000}
        title="Chỉnh sửa thông tin"
        open={isEditing}
        okText="Cập nhật"
        cancelText="Hủy"
        okButtonProps={{
          className: "buttonOk",
          style: {
            backgroundColor: "#00a550",
            color: "white",
          },
        }}
        onCancel={() => {
          setIsEditing(false);
        }}
        onOk={(e) => {
          onUpdateInformation(e);
        }}
      >
        <div
          style={{
            padding: "10px 0",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
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
          <div style={{ width: "100%" }}>
            <h3>Tính năng</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <div
                className={map ? "item-active" : "item"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: map ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",

                  color: map ? "white" : "black",
                  backgroundColor: map ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (map) {
                    setMap(false);
                  } else {
                    setMap(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/map-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Bản đồ</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: bluetooth ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: bluetooth ? "white" : "black",
                  backgroundColor: bluetooth ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (bluetooth) {
                    setBluetooth(false);
                  } else {
                    setBluetooth(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/bluetooth-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Bluetooth</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: camera360 ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: camera360 ? "white" : "black",
                  backgroundColor: camera360 ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (camera360) {
                    setCamera360(false);
                  } else {
                    setCamera360(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/360_camera-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Camera 360</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: cameratruoc ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: cameratruoc ? "white" : "black",
                  backgroundColor: cameratruoc ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (cameratruoc) {
                    setCameratruoc(false);
                  } else {
                    setCameratruoc(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/parking_camera-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Camera cập lề</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: cameratrip ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",

                  color: cameratrip ? "white" : "black",
                  backgroundColor: cameratrip ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (cameratrip) {
                    setCameratrip(false);
                  } else {
                    setCameratrip(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/dash_camera-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Camera hành trình</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: camerasau ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: camerasau ? "white" : "black",
                  backgroundColor: camerasau ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (camerasau) {
                    setCamerasau(false);
                  } else {
                    setCamerasau(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/reverse_camera-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Camera lùi</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: cuaso ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: cuaso ? "white" : "black",
                  backgroundColor: cuaso ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (cuaso) {
                    setCuaso(false);
                  } else {
                    setCuaso(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/sunroof-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Cửa sổ trời</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: gps ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: gps ? "white" : "black",
                  backgroundColor: gps ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (gps) {
                    setGps(false);
                  } else {
                    setGps(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/gps-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Định vị GPS</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: ghe ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: ghe ? "white" : "black",
                  backgroundColor: ghe ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (ghe) {
                    setGhe(false);
                  } else {
                    setGhe(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/babyseat-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Ghế trẻ em</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: lop ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: lop ? "white" : "black",
                  backgroundColor: lop ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (lop) {
                    setLop(false);
                  } else {
                    setLop(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/spare_tire-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Lốp dự phòng</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  border: manhinh ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: manhinh ? "white" : "black",
                  backgroundColor: manhinh ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (manhinh) {
                    setManhinh(false);
                  } else {
                    setManhinh(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/dvd-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Màn hình DVD</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: tuikhi ? "1px solid #00a550" : "1px solid black",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "5px",
                  color: tuikhi ? "white" : "black",
                  backgroundColor: tuikhi ? "#00a550" : "",
                  fontSize: "15px",
                }}
                onClick={(e) => {
                  if (tuikhi) {
                    setTuikhi(false);
                  } else {
                    setTuikhi(true);
                  }
                }}
              >
                <img
                  src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/airbags-v2.png"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Túi khí an toàn</span>
              </div>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <h3>Chi phí</h3>
            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "50%",
                  gap: "10px",
                }}
              >
                <lable style={{ fontSize: "16px" }}>Giá thuê một giờ</lable>
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <input
                    style={{
                      display: editMoney ? "block" : "none",
                      width: "100%",
                      padding: "10px ",
                      cursor: "pointer",
                      outline: "none",
                      border: "1px solid black",
                      borderRadius: "8px",
                      height: "50px",
                      lineHeight: "30px",
                      fontSize: "16px",
                    }}
                    placeholder="Nhập giá giờ thuê mới"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  ></input>
                  <p
                    style={{
                      display: editMoney ? "none" : "block",
                      padding: "10px",
                      width: "100%",
                      border: "1px solid black",
                      borderRadius: "8px",
                      height: "50px",
                      lineHeight: "30px",
                      fontSize: "16px",
                    }}
                  >
                    {edit?.price}
                  </p>
                  <FaPencilAlt
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "10px",
                      height: "20px",
                      width: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (editMoney) {
                        setEditMoney(false);
                      } else {
                        setEditMoney(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "50%",
                  gap: "10px",
                }}
              >
                <lable style={{ fontSize: "16px" }}>Phí dịch vụ</lable>
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <input
                    style={{
                      display: editMoney1 ? "block" : "none",
                      width: "100%",
                      padding: "10px ",
                      cursor: "pointer",
                      outline: "none",
                      border: "1px solid black",
                      borderRadius: "8px",
                      height: "50px",
                      lineHeight: "30px",
                      fontSize: "16px",
                    }}
                    placeholder="Nhập giá giờ thuê mới"
                    value={extraFee}
                    onChange={(e) => {
                      setExtraFee(e.target.value);
                    }}
                  ></input>
                  <p
                    style={{
                      display: editMoney1 ? "none" : "block",
                      padding: "10px",
                      width: "100%",
                      border: "1px solid black",
                      borderRadius: "8px",
                      height: "50px",
                      lineHeight: "30px",
                      fontSize: "16px",
                    }}
                  >
                    {edit?.extraFee}
                  </p>
                  <FaPencilAlt
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "10px",
                      height: "20px",
                      width: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (editMoney1) {
                        setEditMoney1(false);
                      } else {
                        setEditMoney1(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <h3>Mô tả</h3>
            <div style={{ marginTop: "10px" }}>
              <textarea
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                style={{
                  resize: "none",
                  width: "100%",
                  display: "block",
                  padding: "10px",
                  height: "100px",
                  overflowX: "hidden",
                  overflowY: "scroll",
                  outline: "none",
                }}
              ></textarea>
            </div>
          </div>
        </div>
      </Modal>
      {/* //////////////////////////////Update Image////////////////////////////////// */}
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

export default Product;
