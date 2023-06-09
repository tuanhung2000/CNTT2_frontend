import { Card, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Rating from "@mui/material/Rating";
import { COLORS } from "../../assets/color";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { useNavigate } from "react-router-dom";
function CarDetail() {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [sex, setSex] = useState("");
  const [year, setYear] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [years, setYears] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [province, setProvince] = useState("");
  const [hourHire, setHourHire] = useState(1);
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

  const [daystart, setDaystart] = useState(null);
  const [dayend, setDayend] = useState(null);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = Array.from({ length: 60 }, (v, i) => currentYear - i);
    setYears(yearList);
  }, []);
  useEffect(() => {
    const dayList = Array.from({ length: 31 }, (v, i) => i + 1);
    setDays(dayList);
  }, []);
  // useEffect(() => {
  //   const monthList = Array.from({ length: 12 }, (v, i) => i + 1);
  //   setMonths(monthList);
  // }, []);
  useEffect(() => {
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
    return hours * price;
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
      const duration = dayjs(dayend).diff(dayjs(daystart), "hour");
      setHourHire(duration);
      console.log("Ngày bắt đầu", formattedDateTime);
      console.log("Ngày kết thúc", formattedDateTime1);
    }
  }, [daystart, dayend]);
  console.log(daystart);
  const handleHire = () => {
    const dataUser = {
      daystart: daystart,
      dayend: dayend,
    };
    navigate(`/payment/${12}`, { state: dataUser });
  };
  return (
    <CarDetailComponent>
      <Card style={{ backgroundColor: "ButtonFace", padding: "20px" }}>
        <Grid container>
          <Grid item xs={9} md={9}>
            {" "}
            <Grid
              container
              style={{ paddingBottom: "10px", borderBottom: "1px solid white" }}
            >
              <Grid item xs={4} md={4}>
                <img
                  alt=""
                  height={200}
                  style={{ objectFit: "cover", width: "100%" }}
                  src="https://images.unsplash.com/photo-1541348263662-e068662d82af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXVkaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                />
              </Grid>
              <Grid item xs={8} md={8} style={{ padding: "10px 20px" }}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                    Audi{" "}
                    <span style={{ fontSize: "14px", color: "GrayText" }}>
                      DangDuy
                    </span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="person-outline"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>1 ghế</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="logo-windows"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>4 cửa</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="snow-outline"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>Có điều hòa</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              style={{ paddingBottom: "10px", borderBottom: "1px solid white" }}
            >
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="battery-half"
                    style={{ fontSize: "2em" }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Tình trạng xe</p>
                    <p>2 năm</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="compass"
                    style={{ fontSize: "2em" }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Khu vực</p>
                    <p>Hồ Chí Minh</p>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Hỗ trợ giao xe tận nơi</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Có thể thuê tài xế</p>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#e2ffd0",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: COLORS.main }}>Làm thủ tục trực tuyến</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#e2ffd0",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: COLORS.main, fontWeight: "bold" }}>
                      Hủy miễn phí
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "5px",
                    padding: "10px 0",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: COLORS.main,
                      fontWeight: "bold",
                      marginLeft: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    5/10
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Rất tốt</span>
                    <span style={{ fontSize: "14px" }}>100 đánh giá</span>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
            md={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
              backgroundColor: "white",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "24px" }}>$500</span>
            <span>Gia 7 ngay qua</span>
          </Grid>
        </Grid>
      </Card>
      {role === "owner" ? (
        <></>
      ) : (
        <>
          <Card style={{ backgroundColor: "ButtonFace", padding: "20px" }}>
            <Grid container>
              <Grid
                item
                xs={5}
                md={5}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "0 12px",
                }}
              >
                <h3>Bản tóm tắt</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      padding: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Số giờ muốn thuê</span>
                    <span style={{ fontWeight: "bold" }}>
                      {hourHire <= 0 ? 0 : hourHire}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      padding: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Chi phí thuê</span>
                    <span style={{ fontWeight: "bold" }}>
                      {handleCostCar(priceInitial, hourHire) <= 0
                        ? formatter.format(priceInitial)
                        : formatter.format(
                            handleCostCar(priceInitial, hourHire)
                          )}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "10px",
                      alignItems: "center",
                      borderBottom: "1px solid gray",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>+ Phí bảo hiểm</span>
                    <span style={{ fontWeight: "bold" }}>
                      {formatter.format(insCar)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "10px",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Tổng cộng</span>
                    <span style={{ fontWeight: "bold" }}>
                      {totalPrice(
                        insCar,
                        handleCostCar(priceInitial, hourHire)
                      ) <= 0 ? (
                        <span
                          style={{
                            color: "red",
                            fontWeight: "200",
                            fontSize: "12px",
                          }}
                        >
                          Thời gian không hợp lệ
                        </span>
                      ) : (
                        formatter.format(
                          totalPrice(
                            insCar,
                            handleCostCar(priceInitial, hourHire)
                          )
                        )
                      )}
                    </span>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={7}
                md={7}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "0 12px",
                }}
              >
                <h3>Nhập thông tin để thuê xe</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    gap: "10px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={2}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label htmlFor="sex" style={{ cursor: "pointer" }}>
                        Giới tính:
                      </label>
                      <Select
                        name="role"
                        labelId="demo-simple-select-label"
                        id="sex"
                        value={sex}
                        style={{ height: "40px" }}
                        onChange={(e) => setSex(e.target.value)}
                      >
                        <MenuItem value={"male"}>Nam</MenuItem>
                        <MenuItem value={"female"}>Nữ</MenuItem>
                      </Select>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label htmlFor="firstname" style={{ cursor: "pointer" }}>
                        Tên:
                      </label>
                      <input
                        id="firstname"
                        type="text"
                        style={{
                          display: "block",
                          height: "40px",
                          border: "none",
                          outline: "0.5px solid #f0f0f0",
                          padding: "0 5px",
                        }}
                      ></input>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label htmlFor="lastname" style={{ cursor: "pointer" }}>
                        Họ:
                      </label>
                      <input
                        id="lastname"
                        type="text"
                        style={{
                          display: "block",
                          height: "40px",
                          padding: "0 5px",
                          border: "none",
                          outline: "0.5px solid #f0f0f0",
                        }}
                      ></input>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label htmlFor="email" style={{ cursor: "pointer" }}>
                        Email:
                      </label>
                      <input
                        id="email"
                        type="text"
                        style={{
                          display: "block",
                          height: "40px",
                          padding: "0 5px",
                          border: "none",
                          outline: "0.5px solid #f0f0f0",
                        }}
                      ></input>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label htmlFor="phone" style={{ cursor: "pointer" }}>
                        Số điện thoại:
                      </label>
                      <input
                        id="phone"
                        type="text"
                        style={{
                          display: "block",
                          height: "40px",
                          padding: "0 5px",
                          border: "none",
                          outline: "0.5px solid #f0f0f0",
                        }}
                      ></input>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label htmlFor="day" style={{ cursor: "pointer" }}>
                        Ngày bắt đầu:
                      </label>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          id="daystart"
                          minDateTime={dayjs()}
                          value={daystart}
                          onChange={handleDayStartChange}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid
                      item
                      xs={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label htmlFor="day" style={{ cursor: "pointer" }}>
                        Ngày kết thúc:
                      </label>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          id="dayend"
                          minDateTime={
                            daystart ? dayjs(daystart).add(1, "hour") : dayjs()
                          }
                          value={dayend}
                          onChange={handleDayendChange}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={4}
                      md={4}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label htmlFor="city" style={{ cursor: "pointer" }}>
                        Chọn nơi đón
                      </label>
                      <Select
                        name="city"
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="city"
                        value={city}
                        style={{ height: "40px", width: "100%" }}
                        onChange={(e) => setCity(e.target.value)}
                        MenuProps={{
                          getcontentanchorel: null,
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                          },
                          PaperProps: {
                            style: {
                              maxHeight: 100,
                              width: "auto",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Tỉnh/Thành phố</MenuItem>
                        {listcity.map((item) => (
                          <MenuItem value={item.code} key={item.code}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      md={4}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label
                        htmlFor="lastname"
                        style={{ cursor: "pointer", opacity: "0" }}
                      >
                        Chọn nơi đón
                      </label>
                      <Select
                        name="district"
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="district"
                        value={district}
                        style={{ height: "40px", width: "100%" }}
                        onChange={(e) => setDistrict(e.target.value)}
                        MenuProps={{
                          getcontentanchorel: null,
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                          },
                          PaperProps: {
                            style: {
                              maxHeight: 100,
                              width: "auto",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Quận/Huyện</MenuItem>
                        {listdistrict.map((item) => (
                          <MenuItem value={item.code} key={item.code}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      md={4}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label
                        htmlFor="lastname"
                        style={{ cursor: "pointer", opacity: "0" }}
                      >
                        Chọn nơi đón
                      </label>
                      <Select
                        name="ward"
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="ward"
                        value={ward}
                        style={{ height: "40px", width: "100%" }}
                        onChange={(e) => setWard(e.target.value)}
                        MenuProps={{
                          getcontentanchorel: null,
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                          },
                          PaperProps: {
                            style: {
                              maxHeight: 100,
                              width: "auto",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Phường/Xã/Thị trấn</MenuItem>
                        {listward.map((item) => (
                          <MenuItem value={item.name} key={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {avaiable ? (
                      <>
                        <button
                          className="btn_hire"
                          onClick={() => {
                            handleHire();
                          }}
                        >
                          Thuê
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn_disabled" disabled={true}>
                          Đã được thuê
                        </button>
                      </>
                    )}
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Card>
        </>
      )}
      <Card style={{ backgroundColor: "ButtonFace", padding: "20px" }}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                padding: "0 12px",
              }}
            >
              <h3>Viết đánh giá</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <Rating name="size-small" defaultValue={2} size="small" />
                <textarea
                  style={{
                    width: "100%",
                    resize: "none",
                    outline: "none",
                    border: "none",
                    boxSizing: "border-box",
                    padding: "10px",
                    backgroundColor: "white",
                  }}
                ></textarea>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <button className="btn_cmt">Bình luận</button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Đánh giá :
                  </span>
                  <Rating
                    name="size-small"
                    defaultValue={2}
                    size="small"
                    disabled={true}
                  />
                  <span>(23/24)</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <p style={{ fontWeight: "500", fontSize: "14px" }}>
                    Đặng Đăng Duy
                  </p>
                  <p style={{ color: "GrayText" }}>
                    Lorem Để disable button trong React, bạn có thể sử dụng
                    thuộc tính disabled của thành phần button. Bạn có thể đặt
                    giá trị disabled thành true khi avaiable là false. Dưới đây
                    là một ví dụ cách thực hiện điều này:{" "}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <p style={{ fontWeight: "500", fontSize: "14px" }}>
                    Đặng Đăng Duy
                  </p>
                  <p style={{ color: "GrayText" }}>
                    Lorem Để disable button trong React, bạn có thể sử dụng
                    thuộc tính disabled của thành phần button. Bạn có thể đặt
                    giá trị disabled thành true khi avaiable là false. Dưới đây
                    là một ví dụ cách thực hiện điều này:{" "}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </CarDetailComponent>
  );
}
const CarDetailComponent = styled.section`
  min-height: calc(100vh - 160px);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .btn_hire {
    background-color: #00a550;
    border: 1px solid #00a550;
    outline: none;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn_cmt {
    background-color: #00a550;
    border: 1px solid #00a550;
    outline: none;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn_cmt:hover {
    background-color: white;
    color: #00a550;
  }
  .btn_disabled {
    background-color: #93bda3;
    border: 1px solid #93bda3;
    outline: none;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
  }
  .btn_hire:hover {
    background-color: white;
    color: #00a550;
  }
`;
export default CarDetail;
