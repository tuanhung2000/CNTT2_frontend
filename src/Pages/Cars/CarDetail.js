import { Card, CircularProgress, Grid, MenuItem, Select } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./CarDetail.scss";

import Rating from "@mui/material/Rating";
import { COLORS } from "../../assets/color";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdBackpack, MdStar } from "react-icons/md";
import {
  FaChair,
  FaClipboardUser,
  FaCodeBranch,
  FaFillDrip,
  FaGasPump,
  FaIdCardClip,
  FaUser,
  FaUserAstronaut,
  FaXmark,
} from "react-icons/fa6";
import { DateTimeField } from "@mui/x-date-pickers";
import Swal from "sweetalert2";
import {
  useGetUserQuery,
  useGetVehicleQuery,
} from "../../features/user/userApiSlice";
import { AmazonOutlined } from "@ant-design/icons";
function CarDetail() {
  const url = "http://localhost:9090/vehicle/";
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  const { vehicleID } = useParams();
  const { data: vehicle } = useGetVehicleQuery(vehicleID);
  const { data: userCurrent } = useGetUserQuery();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [sex, setSex] = useState("");
  const [star, setStar] = useState(4);
  const [year, setYear] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [years, setYears] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [province, setProvince] = useState("");
  const [hourHire, setHourHire] = useState(0);
  const [minuteHire, setMinuteHire] = useState(0);
  const [insCar, setInsCar] = useState(20000);
  const [priceInitial, setPriceInitial] = useState(50000);
  const [provinces, setProvinces] = useState([]);
  const [avaiable, setAvaiable] = useState(true);
  const [selfDrive, setSelfDrive] = useState(true);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [city1, setCity1] = useState("");
  const [district1, setDistrict1] = useState("");
  const [ward1, setWard1] = useState("");
  const [listcity, setListCity] = useState([]);
  const [listdistrict, setListDistrict] = useState([]);
  const [listward, setListWard] = useState([]);
  const pathname = useLocation();
  const [daystart, setDaystart] = useState(null);
  const [dayend, setDayend] = useState(null);
  const [openRent, setOpenRent] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = Array.from({ length: 60 }, (v, i) => currentYear - i);
    setYears(yearList);
  }, []);
  useEffect(() => {
    const dayList = Array.from({ length: 31 }, (v, i) => i + 1);
    setDays(dayList);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("https://provinces.open-api.vn/api/")
      .then((response) => {
        const data = response.data;
        const provinceList = data.map((province) => ({
          id: province.code,
          name: province.name,
        }));
        setProvinces(provinceList);
      })
      .catch((error) => {
        console.error("Error fetching provinces data:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/").then((response) => {
      setListCity(response.data);
    });
  }, []);
  useEffect(() => {
    if (city) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${city}?depth=2`)
        .then((response) => {
          setListDistrict(response.data.districts);
          setCity1(response.data.name);
        });
    }
  }, [city]);
  useEffect(() => {
    if (district) {
      axios
        .get(
          `https://provinces.open-api.vn/api/d/${district}?depth=2
      `
        )
        .then((response) => {
          setListWard(response.data.wards);
          setDistrict1(response.data.name);
        });
    }
  }, [district]);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const handleCostCar = (hours, price) => {
    return (
      hours * parseInt(vehicle.Vehicle.price) +
      parseInt(vehicle.Vehicle.extraFee) +
      parseInt(vehicle.VehicleSpec.insurance)
    );
  };
  const totalPrice = (totalCost, insCar) => {
    return totalCost + insCar;
  };

  const handleDayStartChange = (newValue) => {
    setDaystart(newValue);

    if (dayend && dayjs(dayend).isBefore(dayjs(newValue))) {
      setDayend(dayjs(newValue).add(1, "hour"));
    }
  };

  const handleDayendChange = (newValue) => {
    setDayend(newValue);
  };
  // console.log(city1);
  // console.log(district1);
  // console.log(ward);
  dayjs.locale("vi");
  useEffect(() => {
    if (daystart && dayend) {
      const formattedDateTime = dayjs(daystart).format("DD/MM/YYYY HH:mm:ss");
      const formattedDateTime1 = dayjs(dayend).format("DD/MM/YYYY HH:mm:ss  ");
      const duration = dayend.diff(daystart, "minute");

      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      setHourHire(hours);
      setMinuteHire(minutes);
      console.log("Ngày bắt đầu", formattedDateTime);
      console.log("Ngày kết thúc", formattedDateTime1);
    }
  }, [daystart, dayend]);

  // const handleHire = () => {
  //   const dataUser = {
  //     daystart: daystart,
  //     dayend: dayend,
  //   };
  //   navigate(`/payment/${12}`, { state: dataUser });
  // };
  const handleClickOpen = (item) => {
    // if (activeFilter === 1) {
    //   setActiveFilter(0);
    // } else {
    //   setActiveFilter(1);
    // }
    setOpenRent(true);
  };
  const handleClose = () => {
    setOpenRent(false);
  };
  useEffect(() => {
    if (hourHire > 0) {
      setTotalMoney(
        hourHire * parseInt(vehicle.Vehicle.price) +
          (minuteHire / 60) * parseInt(vehicle.Vehicle.price) +
          parseInt(vehicle.Vehicle.extraFee) +
          parseInt(vehicle.VehicleSpec.insurance)
      );
    }
  }, [minuteHire, hourHire]);
  const handleRent = () => {
    setOpenRent(false);
    var dateStart = new Date(daystart.$d);
    var dateEnd = new Date(dayend.$d);
    //vehicleID
    //from
    //to
    //totalTime
    //total
    //address
    //serviceType
    //clientRequire
    // Swal.fire({

    //   title: "Thành công!",
    //   text: "Yêu cầu thuê xe đã được gửi",
    //   icon: "success",
    //   confirmButtonColor: `${COLORS.main}`,
    //   confirmButtonText: "Đồng ý",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     navigate("/listcars");
    //     window.scrollTo(0, 0);
    //   }
    // });
  };
  const formatMoney = (amount) => {
    return amount / 1000;
  };
  const handleTotalCost = (num1, num2, num3) => {
    return num1 + num2 + num3;
  };

  return (
    <section className="carDetail-container">
      {vehicle === undefined ? (
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
          <section className="img-container">
            <section className="left">
              <div className="cover-img">
                <img src={vehicle.vehicle.Vehicle.image[0]} alt="" />
              </div>
            </section>
            <section className="right">
              <div className="cover1-img">
                <img src={vehicle.vehicle.Vehicle.image[1]} alt="" />
              </div>
              <div className="cover1-img">
                <img src={vehicle.vehicle.Vehicle.image[2]} alt="" />
              </div>
              <div className="cover1-img">
                <img src={vehicle.vehicle.Vehicle.image[3]} alt="" />
              </div>
            </section>
          </section>
          <section className="infor-container">
            <section className="left">
              <div className="header">
                <h3>
                  {vehicle.vehicle.Vehicle.make.toUpperCase()}{" "}
                  {vehicle.vehicle.Vehicle.model.toUpperCase()}{" "}
                  {vehicle.vehicle.Vehicle.year.toUpperCase()}
                </h3>
                <div className="group-tag">
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      fontSize: "16px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MdStar style={{ color: "yellow" }} />
                    <span style={{ color: "#767676", fontSize: "16px" }}>
                      {vehicle.vehicle.Vehicle.rate}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      fontSize: "16px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MdBackpack style={{ color: "green" }} />
                    <span style={{ color: "#767676", fontSize: "16px" }}>
                      8 chuyến
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "5px 7px",
                      backgroundColor: "#eef7ff",
                      borderRadius: "5px",
                    }}
                  >
                    {vehicle.vehicle.VehicleSpec.type === "auto"
                      ? "Số tự động"
                      : "Số sàn"}
                  </div>
                </div>
              </div>
              <div className="detail">
                <h3>Đặc điểm</h3>
                <div className="group-features">
                  <div className="item">
                    <FaChair className="icon" />
                    <div className="item-description">
                      <span className="title">Số ghế</span>
                      <span>7 chỗ</span>
                    </div>
                  </div>
                  <div className="item">
                    <FaCodeBranch className="icon" />
                    <div className="item-description">
                      <span className="title">Truyền động</span>
                      <span>
                        {vehicle.vehicle.VehicleSpec.type === "auto"
                          ? "Số tự động"
                          : "Số sàn"}
                      </span>
                    </div>
                  </div>
                  <div className="item">
                    <FaFillDrip className="icon" />
                    <div className="item-description">
                      <span className="title">Nhiên liệu</span>
                      <span>{vehicle.vehicle.VehicleSpec.fuelType}</span>
                    </div>
                  </div>
                  <div className="item">
                    <FaGasPump className="icon" />
                    <div className="item-description">
                      <span className="title">Tiêu hao</span>
                      <span>
                        {vehicle.vehicle.VehicleSpec.consumption} lít/100km
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="describe">
                <h3>Mô tả</h3>
                <div className="content">
                  {vehicle.vehicle.Vehicle.description}
                </div>
              </div>
              <div className="features">
                <h3>Các tiện nghi khác</h3>
                <div className="list">
                  <div
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[0].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[1].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[2].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[3].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[4].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[5].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[6].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[7].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[8].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[9].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[10].value
                        ? ""
                        : "none",
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
                    className="item"
                    style={{
                      display: vehicle.vehicle.Vehicle.feature[11].value
                        ? ""
                        : "none",
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
              <div className="required">
                <h3>Giấy tờ thuê xe</h3>
                <div className="card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <FaClipboardUser />
                    <span>GPLX & CCCD gắn chip</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <FaIdCardClip />
                    <span>GPLX (đối chiếu) & Passport (giữ lại)</span>
                  </div>
                </div>
                <h3
                  style={{
                    marginTop: "20px",
                    display: vehicle.vehicle.Vehicle.rent ? "" : "none",
                  }}
                >
                  Tài sản thuế chấp
                </h3>
                <div
                  className="asset"
                  style={{
                    display: vehicle.vehicle.Vehicle.rent ? "" : "none",
                  }}
                >
                  15 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) hoặc
                  Xe máy (kèm cà vẹt gốc) giá trị 15 triệu
                </div>
              </div>
              <div className="owner">
                <h3>Chủ xe</h3>
                <div className="infor">
                  <div className="left">
                    <div className="img">
                      <FaUser style={{ fontSize: "20px" }} />
                    </div>
                    <div className="content">
                      <h4>
                        {vehicle.owner.firstName} {vehicle.owner.lastName}
                      </h4>
                      <div className="content-body">
                        <div className="item">
                          <MdStar style={{ color: "yellow" }} />
                          <span style={{ color: "#767676", fontSize: "16px" }}>
                            {vehicle.owner.rate}
                          </span>
                        </div>
                        <div className="item">
                          <MdBackpack style={{ color: "green" }} />
                          <span style={{ color: "#767676", fontSize: "16px" }}>
                            33 chuyến
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="item">
                      <span style={{ fontSize: "20px" }}>Tỉ lệ phản hồi</span>
                      <span>100%</span>
                    </div>

                    <div className="item">
                      <span style={{ fontSize: "20px" }}>Tỉ lệ đồng ý</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rate-container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <h3>Đánh giá</h3>
                  <span
                    style={{
                      fontSize: "16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MdStar style={{ color: "yellow" }} />
                    5.0 ( 23 lượt đánh giá )
                  </span>
                </div>
                <div className="rate-body">
                  <div className="rate-item">
                    <div className="left">
                      <img
                        src="https://n1-cstg.mioto.vn/m/avatars/avatar-2.png"
                        alt="a"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      ></img>
                      <div className="infor">
                        <span>
                          {userCurrent.User.lastName}{" "}
                          {userCurrent.User.firstName}
                        </span>
                        <Rating
                          name="simple-controlled"
                          value={star}
                          onChange={(event, newValue) => {
                            setStar(newValue);
                          }}
                        />
                      </div>
                    </div>
                    <div className="right">
                      <button>Gửi</button>
                    </div>
                  </div>
                  <input
                    type="text"
                    style={{ width: "100%", display: "block" }}
                    placeholder="Nhập nội dung bình luận"
                  ></input>
                </div>
                <div className="rate-body">
                  <div className="rate-item">
                    <div className="left">
                      <img
                        src="https://n1-cstg.mioto.vn/m/avatars/avatar-2.png"
                        alt="a"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      ></img>
                      <div className="infor">
                        <span>Thinh Bui</span>
                        <Rating name="simple-controlled" value={2} />
                      </div>
                    </div>
                    <div className="right">
                      <span>6/7</span>
                    </div>
                  </div>
                  <p>
                    Trải nghiệm xe điện rất tốt, Chủ xe hướng dẫn đầy đủ những
                    lưu ý.
                  </p>
                </div>
                <div className="rate-body">
                  <div className="rate-item">
                    <div className="left">
                      <img
                        src="https://n1-cstg.mioto.vn/m/avatars/avatar-2.png"
                        alt="a"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      ></img>
                      <div className="infor">
                        <span>Thinh Bui</span>
                        <Rating name="simple-controlled" value={2} />
                      </div>
                    </div>
                    <div className="right">
                      <span>6/7</span>
                    </div>
                  </div>
                  <p>
                    Trải nghiệm xe điện rất tốt, Chủ xe hướng dẫn đầy đủ những
                    lưu ý.
                  </p>
                </div>
                <div className="rate-body">
                  <div className="rate-item">
                    <div className="left">
                      <img
                        src="https://n1-cstg.mioto.vn/m/avatars/avatar-2.png"
                        alt="a"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      ></img>
                      <div className="infor">
                        <span>Thinh Bui</span>
                        <Rating name="simple-controlled" value={2} />
                      </div>
                    </div>
                    <div className="right">
                      <span>6/7</span>
                    </div>
                  </div>
                  <p>
                    Trải nghiệm xe điện rất tốt, Chủ xe hướng dẫn đầy đủ những
                    lưu ý.
                  </p>
                </div>
              </div>
            </section>
            <section className="right">
              <section className="price-container">
                <h3>{formatMoney(vehicle.vehicle.Vehicle.price)}K/ngày</h3>
                <section className="address">
                  <h6>Địa điểm giao nhận xe</h6>
                  <p>
                    {vehicle.vehicle.Vehicle.address[1]},{" "}
                    {vehicle.vehicle.Vehicle.address[0]}
                  </p>
                </section>
                <section className="total-price">
                  <div className="item">
                    <span>Đơn giá thuê</span>
                    <span className="price">
                      {formatter.format(vehicle.vehicle.Vehicle.price)}/ ngày
                    </span>
                  </div>
                  <div className="item">
                    <span>Phí dịch vụ</span>
                    <span className="price">
                      {formatter.format(vehicle.vehicle.Vehicle.extraFee)}/ ngày
                    </span>
                  </div>
                  <div className="item item-last">
                    <span>Phí bảo hiệm</span>
                    <span className="price">
                      {formatter.format(vehicle.vehicle.VehicleSpec.insurance)}/
                      ngày
                    </span>
                  </div>
                  <div className="item">
                    <span style={{ fontWeight: "bold" }}>Tổng phí thuê xe</span>
                    <span className="price">
                      {formatter.format(
                        handleTotalCost(
                          parseInt(vehicle.vehicle.Vehicle.extraFee),
                          parseInt(vehicle.vehicle.VehicleSpec.insurance),
                          parseInt(vehicle.vehicle.Vehicle.price)
                        )
                      )}{" "}
                      x 1 ngày
                    </span>
                  </div>
                  <div className="btn-container">
                    <button className="btn" onClick={() => handleClickOpen()}>
                      Thuê xe
                    </button>
                  </div>
                </section>
              </section>
            </section>
          </section>
          <Dialog
            open={openRent}
            onClose={handleClose}
            className="dialog-container"
            sx={{
              "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                width: "500px", /// edit here
              },
            }}
          >
            <DialogTitle
              className="dialog-title"
              style={{
                color: "black",
                fontSize: "20px",
                fontWeight: "600",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                padding: "20px 10px 10px 10px",
                height: "60px",
              }}
            >
              Thuê xe
              <div
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px solid #c6c6c6",
                  borderRadius: "50%",
                }}
              >
                <FaXmark
                  style={{
                    height: "15px",
                    width: "15px",
                    color: "black",
                  }}
                />
              </div>
            </DialogTitle>
            <DialogContent
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                gap: "10px",
                padding: "0 40px 10px 40px",
              }}
              className="dialog-content"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Tên xe</span>
                <span style={{ fontWeight: "bold" }}>
                  {vehicle.vehicle.Vehicle.make} {vehicle.vehicle.Vehicle.model}{" "}
                  {vehicle.vehicle.Vehicle.year}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Biển số xe</span>
                <span style={{ fontWeight: "bold" }}>
                  {vehicle.vehicle.Vehicle.licensePlate}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Loại xe</span>
                <span style={{ fontWeight: "bold" }}>
                  {vehicle.vehicle.VehicleSpec.type === "auto"
                    ? "Số tự động"
                    : "Số sàn"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Chủ xe</span>
                <span style={{ fontWeight: "bold" }}>Minh Bảo</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Giá thuê xe</span>
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {formatter.format(vehicle.vehicle.Vehicle.price)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Nơi nhận xe</span>
                <span style={{ fontWeight: "bold" }}>
                  {vehicle.vehicle.Vehicle.address[1]},{" "}
                  {vehicle.vehicle.Vehicle.address[0]}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimeField
                      label="Ngày bắt đầu"
                      value={daystart}
                      minDateTime={dayjs()}
                      onChange={handleDayStartChange}
                    />
                  </LocalizationProvider>
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimeField
                      label="Ngày kết thúc"
                      value={dayend}
                      onChange={handleDayendChange}
                      minDateTime={
                        daystart ? dayjs(daystart).add(1, "hour") : dayjs()
                      }
                    />
                    {/* <DateTimePicker
                  id="dayend"
                  minDateTime={
                    daystart ? dayjs(daystart).add(1, "hour") : dayjs()
                  }
                  value={dayend}
                  onChange={handleDayendChange}
                /> */}
                  </LocalizationProvider>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Số giờ thuê</span>
                <span style={{ fontWeight: "bold" }}>
                  {hourHire > 0 ? (
                    <>
                      {hourHire}:
                      {minuteHire < 10 ? `0${minuteHire}` : minuteHire} giờ
                    </>
                  ) : (
                    <>0 giờ</>
                  )}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Phí dịch vụ</span>
                <span style={{ fontWeight: "bold" }}>
                  {formatter.format(vehicle.vehicle.Vehicle.extraFee)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Phí bảo hiểm</span>
                <span style={{ fontWeight: "bold" }}>
                  {formatter.format(vehicle.vehicle.VehicleSpec.insurance)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Tổng giá tiền</span>
                <span>{formatter.format(totalMoney)}</span>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: "10px 20px" }}>
              <button
                onClick={() => handleRent()}
                style={{
                  width: "100%",
                  backgroundColor: "#00a550",
                  color: "#fff",
                  padding: "20px",
                  border: "1px solid #00a550",
                  cursor: "pointer",
                  borderRadius: "5px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.color = "#00a550"; // Change color on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#00a550";
                  e.target.style.color = "#fff"; // Revert color when not hovered
                }}
              >
                Thuê xe
              </button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </section>
  );
}

export default CarDetail;
